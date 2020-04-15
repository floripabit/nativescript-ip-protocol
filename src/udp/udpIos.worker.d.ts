import "globals";
export declare class IosWorkerUdpSocket extends NSObject implements GCDAsyncUdpSocketDelegate {
    static ObjCProtocols: {
        prototype: GCDAsyncUdpSocketDelegate;
    }[];
    private tag;
    worker: Worker;
    udpServer: GCDAsyncUdpSocket;
    udpClient: GCDAsyncUdpSocket;
    constructor();
    udpSocketDidCloseWithError(sock: GCDAsyncUdpSocket, error: NSError): void;
    udpSocketDidConnectToAddress(sock: GCDAsyncUdpSocket, address: NSData): void;
    udpSocketDidNotConnect(sock: GCDAsyncUdpSocket, error: NSError): void;
    udpSocketDidNotSendDataWithTagDueToError(sock: GCDAsyncUdpSocket, tag: number, error: NSError): void;
    udpSocketDidReceiveDataFromAddressWithFilterContext(sock: GCDAsyncUdpSocket, data: NSData, address: NSData, filterContext: any): void;
    udpSocketDidSendDataWithTag(sock: GCDAsyncUdpSocket, tag: number): void;
    receive(port: number): void;
    sendUnicast(address: string, port: number, msg: string): void;
    sendBroadcast(port: number, msg: string): void;
    private static invokeOnRunLoop;
}
