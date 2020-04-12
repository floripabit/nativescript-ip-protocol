import { Observable, Subject } from 'rxjs';
declare const global, require;

export class UDPProtocol {

    constructor() {
    }

    public receive(): Observable<string> {
        const subRet: Subject<string> = new Subject();
        let worker: Worker;
        if (global["TNS_WEBPACK"]) {
            const WorkerScript = require('nativescript-worker-loader!./udp.worker');
            worker = new WorkerScript();
        } else {
            worker = new Worker("./udp.worker");
        }
        const data = {action: 'receive'};
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
        if (global["TNS_WEBPACK"]) {
            const WorkerScript = require('nativescript-worker-loader!./udp.worker');
            worker = new WorkerScript();
        } else {
            worker = new Worker("./udp.worker");
        }
        const data = {action: 'sendUnicast', address: address, port: port, message: msg};
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
        if (global["TNS_WEBPACK"]) {
            const WorkerScript = require('nativescript-worker-loader!./udp.worker');
            worker = new WorkerScript();
        } else {
            worker = new Worker("./udp.worker");
        }
        const data = {action: 'sendBroadcast', port: port, message: msg};
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
