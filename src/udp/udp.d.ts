import { UdpCommon } from './udp.common';
import { Observable } from 'rxjs';

export declare class UdpProtocol extends UdpCommon {
    constructor();
    stopReceive(): void;
    startReceive(port: number): Observable<string>;
    receiveOnce(port: number): Observable<string>;
    sendUnicast(address: string, port: number, msg: string): Observable<string>;
    sendBroadcast(port: number, msg: string): Observable<string>;
}
