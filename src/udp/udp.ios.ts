import { Observable, Subject } from 'rxjs';
const successfullMessage = 'Action completed successfully';

export class UdpProtocol extends NSObject implements GCDAsyncUdpSocketDelegate {
    public static ObjCProtocols = [GCDAsyncUdpSocketDelegate];
    private udpServerSubject: Subject<string>;
    private udpClientSubject: Subject<string>;
    private tag: number;

    constructor() {
        super();
    }

    udpSocketDidCloseWithError(sock: GCDAsyncUdpSocket, error: NSError): void {
        if (error) {
            this.udpClientSubject.error(error.localizedDescription);
        }
    }
    udpSocketDidConnectToAddress(sock: GCDAsyncUdpSocket, address: NSData): void {
        this.udpServerSubject.next(successfullMessage);
    }
    udpSocketDidNotConnect(sock: GCDAsyncUdpSocket, error: NSError): void {
        this.udpClientSubject.error('Error Socket did not connect');
    }
    udpSocketDidNotSendDataWithTagDueToError(sock: GCDAsyncUdpSocket, tag: number, error: NSError): void {
        this.udpClientSubject.error('Error Sending data');
    }
    udpSocketDidReceiveDataFromAddressWithFilterContext(sock: GCDAsyncUdpSocket, data: NSData, address: NSData, filterContext: any): void {
        NSString.alloc().initWithDataEncoding(data, NSUTF8StringEncoding);
        const retString: any = NSString.alloc()
            .initWithDataEncoding(data, NSUTF8StringEncoding);
        console.log(<string>retString);
        this.udpServerSubject.next(<string>retString);
        sock.close();
    }
    udpSocketDidSendDataWithTag(sock: GCDAsyncUdpSocket, tag: number): void {
        this.udpClientSubject.next(successfullMessage);
    }

    receive(port: number): Observable<string> {
        const subServer = new Subject<string>();
        this.udpServerSubject = subServer;
        try {
            const dispatchQueue = dispatch_queue_create("receive_queue", null);
            const sock = GCDAsyncUdpSocket.alloc()
                .initWithDelegateDelegateQueue(this, dispatchQueue);
            const err: interop.Reference<NSError> = new interop.Reference<NSError>();
            let ret = sock.bindToPortError(port, err);
            ret = sock.receiveOnce();
            return this.udpServerSubject;
        }
        catch (err) {
            console.error(`caught error ${err}`);
            this.udpServerSubject.error(`caught error ${err}`);
            return this.udpServerSubject;
        }
    }

    sendUnicast(address: string, port: number, msg: string): Observable<string> {
        const subClient = new Subject<string>();
        this.udpClientSubject = subClient;
        try {
            const dispatchQueue = dispatch_queue_create("sendUnicast_queue", null);
            const sock = GCDAsyncUdpSocket.alloc()
                .initWithDelegateDelegateQueue(this, dispatchQueue);
            const sendString: NSString = NSString.stringWithString(msg);
            const sendData: NSData = sendString.dataUsingEncoding(NSUTF8StringEncoding);
            sock.sendDataToHostPortWithTimeoutTag(sendData, address, port, -1, this.tag);
            sock.closeAfterSending();
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

