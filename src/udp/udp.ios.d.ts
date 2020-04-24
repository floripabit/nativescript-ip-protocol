import { Observable } from 'rxjs';
import { UdpCommon } from './udp.common';
export declare class UdpProtocol extends UdpCommon {
    constructor();
    receiveOnce(port: number): Observable<string>;
    startReceive(port: number): Observable<string>;
    stopReceive(): void;
    sendUnicast(address: string, port: number, msg: string): Observable<string>;
    sendBroadcast(port: number, msg: string): Observable<string>;
}
