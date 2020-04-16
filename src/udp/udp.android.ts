import { UdpCommon, UdpParameters, UdpWorkerActions } from './udp.common';
import { Observable, Subject } from 'rxjs';
declare const require;

export class UdpProtocol extends UdpCommon {

    constructor() {
        super();
    }

    public receive(port: number): Observable<string> {
        const subRet: Subject<string> = new Subject();
        let worker: Worker;
        if (this.usingWebpack) {
            const WorkerScript = require('nativescript-worker-loader!./workers/udp.android.worker');
            worker = new WorkerScript();
        } else {
            worker = new Worker("./workers/udp.android.worker");
        }
        const data: UdpParameters = {action: UdpWorkerActions.RECEIVE_MESSAGE, port: port};
        worker.postMessage(data);
        worker.onmessage = function (msg) {
            subRet.next(msg.data.toString());
        };
        worker.onerror = function (err) {
            subRet.error(err.error.toString());
        };
        return subRet;
    }

    public sendUnicast(address: string, port: number, msg: string): Observable<string> {
        const subRet: Subject<string> = new Subject();
        let worker: Worker;
        if (this.usingWebpack) {
            const WorkerScript = require('nativescript-worker-loader!./workers/udp.android.worker');
            worker = new WorkerScript();
        } else {
            worker = new Worker("./workers/udp.android.worker");
        }
        const data: UdpParameters = {
            action: UdpWorkerActions.SEND_UNICAST_MESSAGE, message: msg,
            port, address,
        };
        // const data = {action: 'sendUnicast', address: address, port: port, message: msg};
        worker.postMessage(data);
        worker.onmessage = function (msg) {
            subRet.next(msg.data.toString());
        };
        worker.onerror = function (err) {
            subRet.error(err.error.toString());
        };
        return subRet;
    }

    public sendBroadcast(port: number, msg: string): Observable<string> {
        const subRet: Subject<string> = new Subject();
        let worker: Worker;
        if (this.usingWebpack) {
            const WorkerScript = require('nativescript-worker-loader!./workers/udp.android.worker');
            worker = new WorkerScript();
        } else {
            worker = new Worker("./workers/udp.android.worker");
        }
        const data: UdpParameters = {
            action: UdpWorkerActions.SEND_BROADCAST_MESSAGE, message: msg, port
        };
        // const data = {action: 'sendBroadcast', port: port, message: msg};
        worker.postMessage(data);
        worker.onmessage = function (msg) {
            subRet.next(msg.data.toString());
        };
        worker.onerror = function (err) {
            subRet.error(err.error.toString());
        };
        return subRet;
    }
}
