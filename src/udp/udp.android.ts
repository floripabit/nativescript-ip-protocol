import { Observable, Subject } from 'rxjs';
import { UdpCommon, UdpWorkerActions, UdpParameters } from './udp.common';
declare const global, require;

export class UdpProtocol extends UdpCommon {

    constructor() {
        super();
    }

    private getWorker(): Worker {
        if (global["TNS_WEBPACK"]) {
            const WorkerScript = require('nativescript-worker-loader!./workers/android.worker.js');
            return new WorkerScript();
        }
        return new Worker('./workers/android.worker.js');
    }

    public receive(port: number): Observable<string> {
        const subRet: Subject<string> = new Subject();
        let worker: Worker = this.getWorker();

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
        let worker: Worker = this.getWorker();

        const data: UdpParameters = {
            action: UdpWorkerActions.SEND_UNICAST_MESSAGE, message: msg,
            port, address,
        };

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
        let worker: Worker = this.getWorker();

        const data: UdpParameters = {
            action: UdpWorkerActions.SEND_BROADCAST_MESSAGE, message: msg, port
        };

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
