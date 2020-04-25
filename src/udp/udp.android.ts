import { Observable, Subject } from 'rxjs';
import { UdpCommon, UdpWorkerActions, UdpParameters } from './udp.common';
declare const global, require;

export class UdpProtocol extends UdpCommon {
    public udpServerSocket: java.net.DatagramSocket;
    private worker: Worker;

    constructor() {
        super();
        this.worker = this.getWorker();
    }

    private getWorker(): Worker {
        if (global["TNS_WEBPACK"]) {
            const WorkerScript = require('nativescript-worker-loader!./workers/android.worker.js');
            return new WorkerScript();
        }
        return new Worker('./workers/android.worker.js');
    }

    public receiveOnce(port: number): Observable<string> {
        const subRet: Subject<string> = new Subject();
        let worker: Worker = this.getWorker();

        const data: UdpParameters = {action: UdpWorkerActions.RECEIVE_ONCE_MESSAGE, port};

        worker.postMessage(data);

        worker.onmessage = function (msg) {
            UdpProtocol.processReceivedMessage(msg.data, subRet);
        };

        worker.onerror = function (err) {
            subRet.error(err);
        };
        return subRet;
    }

    public receiveWithTimeout(port: number, timeout: number): Observable<string> {
        const subRet: Subject<string> = new Subject();
        let worker: Worker = this.getWorker();

        const data: UdpParameters = {
            action: UdpWorkerActions.RECEIVE_START_MESSAGE,
            port, timeout
        };

        worker.postMessage(data);
        worker.onmessage = function (msg) {
            UdpProtocol.processReceivedMessage(msg.data, subRet);
        };

        worker.onerror = function (err) {
            subRet.error(err);
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
            subRet.error(err);
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
            subRet.error(err);
        };
        return subRet;
    }

    static processReceivedMessage(msg: UdpAndroidWorkerAnswer,
                                  subRet: Subject<string>) {
        switch (msg.action) {
            case UdpWorkerActions.RETURN_DATA_MESSAGE:
                subRet.next(msg.data);
                break;
            case UdpWorkerActions.RETURN_SOCKET_MESSAGE:
                subRet.next(UdpWorkerActions.RETURN_SOCKET_MESSAGE);
                break;
            case UdpWorkerActions.RETURN_ERROR_MESSAGE:
                subRet.error(msg.error);
                break;
            case UdpWorkerActions.SOCKET_TIMEOUT_MESSAGE:
                subRet.next(UdpWorkerActions.SOCKET_TIMEOUT_MESSAGE);
                break;
            default:
                console.error(`Not recognized action: ${msg}`);
                break;
        }
        return;
    }
}

export type UdpAndroidWorkerAnswer = |
{
    action: UdpWorkerActions.RETURN_SOCKET_MESSAGE;
    socket: java.net.DatagramSocket;
} |
{
    action: UdpWorkerActions.RETURN_DATA_MESSAGE;
    data: any;
} |
{
    action: UdpWorkerActions.RETURN_ERROR_MESSAGE;
    error: any;
} |
{
    action: UdpWorkerActions.SOCKET_TIMEOUT_MESSAGE;
};