import { Observable } from 'rxjs';
export declare class UdpProtocol extends NSObject implements GCDAsyncUdpSocketDelegate {
    static ObjCProtocols: {
        prototype: GCDAsyncUdpSocketDelegate;
    }[];
    private udpServerSubject;
    private udpClientSubject;
    private tag;
    private udpServerSocket;
    private timerId;
    private timeout;
    constructor();
    udpSocketDidCloseWithError(sock: GCDAsyncUdpSocket, error: NSError): void;
    udpSocketDidConnectToAddress(sock: GCDAsyncUdpSocket, address: NSData): void;
    udpSocketDidNotConnect(sock: GCDAsyncUdpSocket, error: NSError): void;
    udpSocketDidNotSendDataWithTagDueToError(sock: GCDAsyncUdpSocket, tag: number, error: NSError): void;
    udpSocketDidReceiveDataFromAddressWithFilterContext(sock: GCDAsyncUdpSocket, data: NSData, address: NSData, filterContext: any): void;
    udpSocketDidSendDataWithTag(sock: GCDAsyncUdpSocket, tag: number): void;
    receiveOnce(port: number): Observable<string>;
    receiveWithTimeout(port: number, timeout: number): Observable<string>;
    sendUnicast(address: string, port: number, msg: string): Observable<string>;
    sendBroadcast(port: number, msg: string): Observable<string>;
    private timeoutKillSocket;
}
