import { Observable } from 'rxjs';
<<<<<<< Updated upstream
import { UdpCommon } from './udp.common';
export declare class UdpProtocol extends UdpCommon {
=======
export declare class UdpProtocol extends NSObject implements GCDAsyncUdpSocketDelegate {
    static ObjCProtocols: any;
    private udpServerSubject;
    private udpClientSubject;
    private tag;
>>>>>>> Stashed changes
    constructor();
    receive(port: number): Observable<string>;
    sendUnicast(address: string, port: number, msg: string): Observable<string>;
    sendBroadcast(port: number, msg: string): Observable<string>;
<<<<<<< Updated upstream
=======
    udpSocketDidCloseWithError(sock: GCDAsyncUdpSocket, error: NSError): void;
    udpSocketDidConnectToAddress(sock: GCDAsyncUdpSocket, address: NSData): void;
    udpSocketDidNotConnect(sock: GCDAsyncUdpSocket, error: NSError): void;
    udpSocketDidNotSendDataWithTagDueToError(sock: GCDAsyncUdpSocket, tag: number, error: NSError): void;
    udpSocketDidReceiveDataFromAddressWithFilterContext(sock: GCDAsyncUdpSocket, data: NSData, address: NSData, filterContext: any): void;
    udpSocketDidSendDataWithTag(sock: GCDAsyncUdpSocket, tag: number): void;
>>>>>>> Stashed changes
}
