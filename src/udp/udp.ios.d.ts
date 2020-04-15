import { Observable } from 'rxjs';
export declare class UDPProtocol {
    private udpServerSubject;
    private udpClientSubject;
    private tag;
    constructor();
    receive(port: number): Observable<string>;
    sendUnicast(address: string, port: number, msg: string): Observable<string>;
    sendBroadcast(port: number, msg: string): Observable<string>;
}
