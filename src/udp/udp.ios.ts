import { Observable, Subject } from 'rxjs';
const successfullMessage = 'Action completed successfully';

const defaultTimeout = 1000;

export class UdpProtocol extends NSObject implements GCDAsyncUdpSocketDelegate {
    public static ObjCProtocols = [GCDAsyncUdpSocketDelegate];
    private udpServerSubject: Subject<string>;
    private udpClientSubject: Subject<string>;
    private tag: number;
    private udpServerSocket: GCDAsyncUdpSocket;
    private timerId: number;
    private timeout: number;

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
        if (sock) {
            sock.close();
        }
    }
    udpSocketDidNotSendDataWithTagDueToError(sock: GCDAsyncUdpSocket, tag: number, error: NSError): void {
        this.udpClientSubject.error('Error Sending data');
        if (sock) {
            sock.close();
        }
    }
    udpSocketDidReceiveDataFromAddressWithFilterContext(sock: GCDAsyncUdpSocket, data: NSData, address: NSData, filterContext: any): void {
        NSString.alloc().initWithDataEncoding(data, NSUTF8StringEncoding);
        const retString: any = NSString.alloc()
            .initWithDataEncoding(data, NSUTF8StringEncoding);
        this.udpServerSubject.next(<string>retString);
        if (this.timeout < 0) {
            this.timeoutKillSocket(defaultTimeout);
            return;
        }
        this.timeoutKillSocket(this.timeout);
        return;
    }

    udpSocketDidSendDataWithTag(sock: GCDAsyncUdpSocket, tag: number): void {
        this.udpClientSubject.next(successfullMessage);
        if (sock) {
            sock.close();
        }
    }

    receiveOnce(port: number): Observable<string> {
        const subServer = new Subject<string>();
        this.udpServerSubject = subServer;
        try {
            const dispatchQueue = dispatch_queue_create("receive_queue", null);
            this.udpServerSocket = GCDAsyncUdpSocket.alloc()
                .initWithDelegateDelegateQueue(this, dispatchQueue);
            const err: interop.Reference<NSError> = new interop.Reference<NSError>();
            let ret = this.udpServerSocket.bindToPortError(port, err);
            ret = this.udpServerSocket.receiveOnce();
            return this.udpServerSubject;
        }
        catch (err) {
            console.error(`caught error ${err}`);
            this.udpServerSubject.error(`caught error ${err}`);
            return this.udpServerSubject;
        }
    }

    public receiveWithTimeout(port: number, timeout: number): Observable<string> {
        const subServer = new Subject<string>();
        this.udpServerSubject = subServer;
        try {
            const dispatchQueue = dispatch_queue_create("receive_queue", null);
            this.udpServerSocket = GCDAsyncUdpSocket.alloc()
                .initWithDelegateDelegateQueue(this, dispatchQueue);
            const err: interop.Reference<NSError> = new interop.Reference<NSError>();
            const err2: interop.Reference<NSError> = new interop.Reference<NSError>();
            let ret = this.udpServerSocket.bindToPortError(port, err);
            this.udpServerSocket.beginReceiving(err2);
            this.timeoutKillSocket(timeout);
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
        try {
            const dispatchQueue = dispatch_queue_create("sendBroadcast_queue", null);
            const sock = GCDAsyncUdpSocket.alloc()
                .initWithDelegateDelegateQueue(this, dispatchQueue);
            const sendString: NSString = NSString.stringWithString(msg);
            const sendData: NSData = sendString.dataUsingEncoding(NSUTF8StringEncoding);
            sock.enableBroadcastError(true);
            sock.sendDataToHostPortWithTimeoutTag(sendData, '255.255.255.255', port, -1, this.tag);
            sock.closeAfterSending();
            return this.udpClientSubject;
        }
        catch (err) {
            console.error(`caught error ${err}`);
            this.udpClientSubject.error(`caught error ${err}`);
            return this.udpClientSubject;
        }
    }

    private timeoutKillSocket(timeout) {
        NSOperationQueue.mainQueue.addOperationWithBlock(() => {
            clearTimeout(this.timerId);
            this.timeout = timeout;
            this.timerId = setTimeout(() => {
                this.timeout = -1;
                if (this.udpServerSocket) {
                    this.udpServerSocket.close();
                }
            }, timeout);
        });
    }
}
