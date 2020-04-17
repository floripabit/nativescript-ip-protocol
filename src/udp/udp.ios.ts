import { Observable, Subject } from 'rxjs';
import { UdpCommon } from './udp.common';

export class UdpProtocol extends UdpCommon {
    constructor() {
        super();
    }

    public receive(port: number): Observable<string> {
        const subRet: Subject<string> = new Subject();
        subRet.error('receive method not implemented for iOS');
        return subRet;
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
