import { Observable, Subject } from 'rxjs';
import { UdpCommon, UdpWorkerActions } from './udp.common';
export declare class UdpProtocol extends UdpCommon {
    udpServerSocket: java.net.DatagramSocket;
    constructor();
    private getWorker;
    receiveOnce(port: number): Observable<string>;
    startReceive(port: number): Observable<string>;
    stopReceive(): void;
    sendUnicast(address: string, port: number, msg: string): Observable<string>;
    sendBroadcast(port: number, msg: string): Observable<string>;
    static processReceivedMessage(obj: UdpProtocol, msg: UdpAndroidWorkerAnswer, subRet: Subject<string>): void;
}
declare type UdpAndroidWorkerAnswer = {
    action: UdpWorkerActions.RETURN_SOCKET_MESSAGE;
    socket: java.net.DatagramSocket;
} | {
    action: UdpWorkerActions.RETURN_DATA_MESSAGE;
    data: any;
} | {
    action: UdpWorkerActions.RETURN_ERROR_MESSAGE;
    error: any;
};
export {};
