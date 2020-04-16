import { Observable } from 'rxjs';
export declare class UdpCommon {
    private usingWebpack;
    constructor();
    private getWorker;
    receive(port: number): Observable<string>;
    sendUnicast(address: string, port: number, msg: string): Observable<string>;
    sendBroadcast(port: number, msg: string): Observable<string>;
}
