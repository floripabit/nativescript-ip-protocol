import { Observable, Subject } from 'rxjs';
import { UdpCommon } from './udp.common';

export class UdpProtocol extends UdpCommon {
    constructor() {
        super();
    }

    public receiveOnce(port: number): Observable<string> {
        const subRet: Subject<string> = new Subject();
        subRet.error('receiveOnce method not implemented for iOS');
        return subRet;
    }

    public startReceive(port: number): Observable<string> {
        const subRet: Subject<string> = new Subject();
        subRet.error('startReceive method not implemented for iOS');
        return subRet;
    }

    stopReceive(): void {
        return;
    }

    public sendUnicast(address: string, port: number, msg: string): Observable<string> {
        const subRet: Subject<string> = new Subject();
        subRet.error('Send Unicast method not implemented for iOS');
        return subRet;
    }

    public sendBroadcast(port: number, msg: string): Observable<string> {
        const subRet: Subject<string> = new Subject();
        subRet.error('Send Broadcast method not implemented for iOS');
        return subRet;
    }
}
