import { Observable, Subject } from 'rxjs';
import { isAndroid } from '@nativescript/core/platform';
import { UdpWorkerActions, UdpParameters} from './udpUtils';
declare const global, require;

export class UdpCommon {
    private usingWebpack: boolean;

    constructor() {
        this.usingWebpack = global["TNS_WEBPACK"];
    }

    private getWorker(): Worker {
        if (this.usingWebpack) {
            if (isAndroid) {
                const WorkerScript = require('nativescript-worker-loader!./workers/android.worker.js');
                return new WorkerScript();
            }
            const WorkerScript = require('nativescript-worker-loader!./workers/ios.worker.js');
            return new WorkerScript();
        }
        if (isAndroid) {
            return new Worker('./workers/android.worker.js');
        }
        return new Worker('./workers/ios.worker.js');
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