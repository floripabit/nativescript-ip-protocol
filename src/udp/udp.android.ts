import { Observable, Subject } from 'rxjs';
import { UdpCommon, UdpWorkerActions, UdpParameters } from './udp.common';
declare const global, require;

export class UdpProtocol extends UdpCommon {
    public udpServerSocket: java.net.DatagramSocket;

    constructor() {
        super();
    }

    private getWorker(): Worker {
        if (global["TNS_WEBPACK"]) {
            const WorkerScript = require('nativescript-worker-loader!./android.worker.js');
            return new WorkerScript();
        }
        return new Worker('./android.worker.js');
    }

    public receiveOnce(port: number): Observable<string> {
        const subRet: Subject<string> = new Subject();
        let worker: Worker = this.getWorker();

        const data: UdpParameters = {action: UdpWorkerActions.RECEIVE_ONCE_MESSAGE, port: port};
        const obj: UdpProtocol = this;

        worker.postMessage(data);

        worker.onmessage = function (msg) {
            console.log(obj);
            console.log(msg);
            console.log(subRet);
            UdpProtocol.processReceivedMessage(obj, msg.data, subRet);
        };

        worker.onerror = function (err) {
            subRet.error(err.error.toString());
        };
        return subRet;
    }

    public startReceive(port: number): Observable<string> {
        const subRet: Subject<string> = new Subject();
        let worker: Worker = this.getWorker();

        const data: UdpParameters = {action: UdpWorkerActions.RECEIVE_START_MESSAGE, port: port};
        const obj: UdpProtocol = this;

        worker.postMessage(data);

        worker.onmessage = function (msg) {
            UdpProtocol.processReceivedMessage(obj, msg.data, subRet);
        };

        worker.onerror = function (err) {
            subRet.error(err.error.toString());
        };
        return subRet;
    }

    public stopReceive(): void {
        let worker: Worker = this.getWorker();
        const data: UdpParameters = {action: UdpWorkerActions.RECEIVE_STOP_MESSAGE};
        worker.postMessage(data);
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

    static processReceivedMessage(obj: UdpProtocol,
                                  msg: UdpAndroidWorkerAnswer,
                                  subRet: Subject<string>) {
        console.log(obj);
        console.log(msg);
        console.log(subRet);
        switch (msg.action) {
            case UdpWorkerActions.RETURN_DATA_MESSAGE:
                subRet.next(msg.data);
                break;
            case UdpWorkerActions.RETURN_SOCKET_MESSAGE:
                obj.udpServerSocket = msg.socket;
                break;
            default:
                console.error(`Not recognized action: ${msg.action}`);
                break;
        }
        return;
    }
}

type UdpAndroidWorkerAnswer = |
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
};