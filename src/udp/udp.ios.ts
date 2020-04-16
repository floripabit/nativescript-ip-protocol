import { UdpCommon } from './udp.common';
import { Observable, Subject } from 'rxjs';
declare const require;

export class UdpProtocol extends UdpCommon {
    constructor() {
        super();
    }
    receive(port: number): Observable<string> {
        const sub: Subject<string> = new Subject();
        return sub;
    }
    sendUnicast(address: string, port: number, msg: string): Observable<string> {
        const sub: Subject<string> = new Subject();
        return sub;
    }
    sendBroadcast(port: number, msg: string): Observable<string> {
        const sub: Subject<string> = new Subject();
        return sub;
    }
}
