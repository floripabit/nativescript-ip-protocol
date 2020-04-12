import { Observable } from 'rxjs';
export declare class UDPProtocol {
    constructor();
    receive(): Observable<string>;
    sendUnicast(address: string, port: number, msg: string): Observable<string>;
    sendBroadcast(port: number, msg: string): Observable<string>;
}
