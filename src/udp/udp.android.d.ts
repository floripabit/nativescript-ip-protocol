import { Observable } from 'rxjs';
import { UdpCommon } from './udp.common';
export declare class UdpProtocol extends UdpCommon {
    constructor();
    private getWorker;
    receive(port: number): Observable<string>;
    sendUnicast(address: string, port: number, msg: string): Observable<string>;
    sendBroadcast(port: number, msg: string): Observable<string>;
}
