import { Observable, Subject } from 'rxjs';
declare const global, require;

export class UDPProtocol {
    private udpServerSubject: Subject<string>;
    private udpClientSubject: Subject<string>;
    private tag: number;

    constructor() {
        this.tag = 0;
    }

    receive(port: number): Observable<string> {
        const serverSubscriber: Subject<string> = new Subject();
        this.udpServerSubject = serverSubscriber;
        return serverSubscriber;
    }

    sendUnicast(address: string, port: number, msg: string): Observable<string> {
        const subRet: Subject<string> = new Subject();
        let worker5: Worker;
        console.log('before worker');
        if (global["TNS_WEBPACK"]) {
            console.log('entrei com webpack');
            const WorkerScript = require('nativescript-worker-loader!./udpIos.worker');
            worker5 = new WorkerScript();
        } else {
            console.log('entrei sem webpack');
            worker5 = new Worker("./udpIos.worker");
        }
        console.log('after create worker');
        const data = {action: 'sendUnicast', address: address, port: port, message: msg};
        worker5.postMessage(data);
        console.log('after post data');
        worker5.onmessage = function (msg) {
            console.log('inside 1');
            subRet.next(msg.data.toString());
        };
        worker5.onerror = function (err) {
            console.log('inside error');
            subRet.error(err.error.toString());
        };
        return subRet;
    }

    sendBroadcast(port: number, msg: string): Observable<string> {
        setTimeout(() => { this.udpClientSubject.next('oi :D passei no sendBroadcast'); }, 100);
        return this.udpClientSubject;
    }
}