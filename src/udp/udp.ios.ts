import { Observable, Subject } from 'rxjs';
const successfullMessage = 'Action completed successfully';

export class UdpProtocol extends NSObject implements GCDAsyncUdpSocketDelegate {
    private udpServerSubject: Subject<string>;
    private udpClientSubject: Subject<string>;
    private tag: number;

    constructor() {
        super();
    }

    udpSocketDidCloseWithError(sock: GCDAsyncUdpSocket, error: NSError): void {
        console.log('udpSocketDidCloseWithError callback');
        this.udpClientSubject.error('Error closing Socket');
    }
    udpSocketDidConnectToAddress(sock: GCDAsyncUdpSocket, address: NSData): void {
        console.log('udpSocketDidConnectToAddress callback');
        this.udpServerSubject.next(successfullMessage);
    }
    udpSocketDidNotConnect(sock: GCDAsyncUdpSocket, error: NSError): void {
        console.log('udpSocketDidNotConnect callback');
        this.udpClientSubject.error('Error Socket did not connect');
    }
    udpSocketDidNotSendDataWithTagDueToError(sock: GCDAsyncUdpSocket, tag: number, error: NSError): void {
        console.log('udpSocketDidNotSendDataWithTagDueToError callback');
        this.udpClientSubject.error('Error Sending data');
    }
    udpSocketDidReceiveDataFromAddressWithFilterContext(sock: GCDAsyncUdpSocket, data: NSData, address: NSData, filterContext: any): void {
        console.log('udpSocketDidReceiveDataFromAddressWithFilterContext callback');
        const retString: any = NSString.alloc().initWithDataEncoding(data, NSUTF8StringEncoding);
        this.udpServerSubject.next(<string>retString);
    }
    udpSocketDidSendDataWithTag(sock: GCDAsyncUdpSocket, tag: number): void {
        console.log('udpSocketDidSendDataWithTag callback');
        this.udpClientSubject.next(successfullMessage);
    }

    receive(port: number): Observable<string> {
        const subServer = new Subject<string>();
        this.udpServerSubject = subServer;
        this.udpServerSubject.error('Method not implemented');
        return this.udpServerSubject;
    }

    sendUnicast(address: string, port: number, msg: string): Observable<string> {
        const subClient = new Subject<string>();
        this.udpClientSubject = subClient;
        try {
            let dispatchQueue = dispatch_queue_create("sendUnicast_queue", null);
            let sock = GCDAsyncUdpSocket.alloc()
                .initWithDelegateDelegateQueue(this, dispatchQueue);
            let sendData: any = NSString.alloc().initWithCString(msg);
            sock.sendDataToHostPortWithTimeoutTag(sendData, address, port, -1, this.tag);
            return this.udpClientSubject;
        }
        catch (err) {
            console.error(`caught error ${err}`);
            this.udpClientSubject.error(`caught error ${err}`);
            return this.udpClientSubject;
        }
    }

    sendBroadcast(port: number, msg: string): Observable<string> {
        const subClient = new Subject<string>();
        this.udpClientSubject = subClient;
        this.udpClientSubject.error('Method not implemented');
        return this.udpClientSubject;
    }
}

