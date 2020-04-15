import "globals";
const worker1: Worker = self as any;

const bufferLength = 65526;
const successfullMessage = 'Action completed successfully';

worker1.onmessage = ((message) => {
    if (!message ||
        !message.data ||
        !message.data.action) {
        throw new Error('Error: no action sent to worker');
    }

    console.log('cheguei no worker');
    console.log(message);

    switch (message.data.action) {
        case "receive":
            if (!message.data.port) {
                throw new Error(`Error: no port defined to receive message`);
            }
            worker1.postMessage(receiveMessage(message.data.port));
            break;
        case "sendBroadcast":
            if (!message.data.message) {
                throw new Error(`Error: no message to send`);
            }
            if (!message.data.port) {
                throw new Error(`Error: no port to broadcast message`);
            }
            if (sendBroadcastMessage(message.data.port, message.data.message) < 0) {
                throw new Error(`Error: Error sending broadcast message`);
            }
            worker1.postMessage(successfullMessage);
            break;
        case "sendUnicast":
            if (!message.data.message) {
                throw new Error(`Error: no message to send`);
            }
            if (!message.data.port || !message.data.address) {
                throw new Error(`Error: no port or address to send message`);
            }
            if (sendUnicastMessage(message.data.address, message.data.port, message.data.message) < 0) {
                throw new Error(`Error: Error sending unicast message`);
            }
            // worker1.postMessage(successfullMessage);
            break;
        default:
            throw new Error(`Error: ${message.data.action} is not a valid action`);
    }
});

function sendUnicastMessage(address: string, port: number, message: string): number {
    let mainClass: IosWorkerUdpSocket = new IosWorkerUdpSocket();
    mainClass.sendUnicast(address, port, message);
    return 0;
}

function sendBroadcastMessage(port: number, message: string): number {
    return 0;
}

function receiveMessage(port: number): any {
    return 0;
}


export class IosWorkerUdpSocket extends NSObject implements GCDAsyncUdpSocketDelegate {
    public static ObjCProtocols = [GCDAsyncUdpSocketDelegate];
    private tag: number;
    public worker: Worker;

    public udpServer: GCDAsyncUdpSocket;
    public udpClient: GCDAsyncUdpSocket;

    constructor() {
        super();
        this.tag = 0;
        this.worker = worker1;
    }

    udpSocketDidCloseWithError(sock: GCDAsyncUdpSocket, error: NSError): void {
        console.log("entrei na udpSocketDidCloseWithError");
        console.log(error);
        worker1.postMessage("entrei na udpSocketDidCloseWithError");
    }
    udpSocketDidConnectToAddress(sock: GCDAsyncUdpSocket, address: NSData): void {
        console.log("entrei na udpSocketDidConnectToAddress");
        console.log(address);
        worker1.postMessage("entrei na udpSocketDidConnectToAddress");
    }
    udpSocketDidNotConnect(sock: GCDAsyncUdpSocket, error: NSError): void {
        console.log("entrei na udpSocketDidNotConnect");
        console.log(error);
        worker1.postMessage("entrei na udpSocketDidNotConnect");
    }
    udpSocketDidNotSendDataWithTagDueToError(sock: GCDAsyncUdpSocket, tag: number, error: NSError): void {
        console.log("entrei na udpSocketDidNotSendDataWithTagDueToError");
        console.log(error);
        console.log(tag);
        worker1.postMessage("entrei na udpSocketDidNotSendDataWithTagDueToError");
    }
    udpSocketDidReceiveDataFromAddressWithFilterContext(sock: GCDAsyncUdpSocket, data: NSData, address: NSData, filterContext: any): void {
        console.log("entrei na udpSocketDidReceiveDataFromAddressWithFilterContext");
        console.log(address);
        console.log(data);
        console.log(filterContext);
        worker1.postMessage("entrei na udpSocketDidReceiveDataFromAddressWithFilterContext");
    }
    udpSocketDidSendDataWithTag(sock: GCDAsyncUdpSocket, tag: number): void {
        // IosWorkerUdpSocket.invokeOnRunLoop(() => {
            console.log("entrei na udpSocketDidSendDataWithTag");
            console.log(tag);
            worker1.postMessage("entrei na udpSocketDidSendDataWithTag");
        // });
    }

    receive(port: number): void {
        return;
        /*try {
        const serverSubscriber: Subject<string> = new Subject();
        console.log("receive 1");
        let dispatchQueue = dispatch_queue_create("receive_queue", null);
        const bg = qos_class_t.QOS_CLASS_BACKGROUND;
        const dispatchQueue2 = dispatch_get_global_queue(bg, 0);
        this.udpServer = GCDAsyncUdpSocket.alloc()
            .initWithDelegateDelegateQueue(this, dispatchQueue);
            console.log("receive 3");
        let errorRef1 = new interop.Reference<NSError>();
        let errorRef2 = new interop.Reference<NSError>();
        console.log("receive 3.1");
        console.log("receive 3.2");
        if (!this.udpServer.bindToPortError(port, errorRef1)) {
            console.log(`errorrrr ${errorRef1.value}`);
            console.log(`teste de error de port  port ${port}`);
            serverSubscriber.error(`Unable to bind UDP receive to port ${port}`);
        }
        console.log("receive 4");
        if (!this.udpServer.beginReceiving(errorRef2)) {
            console.log("cai no true");
            console.log(`errorrrr22 ${errorRef2.value}`);
            console.log(this.udpServer.localPort());
            console.log("receive 4.1");
            console.log(this.udpServer.localPort_IPv4());
            console.log("receive 4.2");
            console.log(this.udpServer.localHost());
            console.log("receive 4.3");
            // this.udpServerSubject.next(socket.userData());
            console.log("receive 5");
        } else {
            console.log("cai no false");
            console.log("receive 5 no false");
        }
        console.log("receive 6");
        // setTimeout(() => { this.udpServerSubject.next('oi :D passei no receive'); }, 100);
        this.udpServerSubject = serverSubscriber;
        return serverSubscriber;
        }
        catch (err) {
            console.log(`caught error in receive ${err}`);
            return null;
        }*/
    }

    sendUnicast(address: string, port: number, msg: string): void {
        try {
        console.log("send 3");
        let dispatchQueue = dispatch_queue_create("test_queue", null);
        console.log("send 3.111");
        const bg = qos_class_t.QOS_CLASS_BACKGROUND;
        console.log("send 3.11");
        const dispatchQueue2 = dispatch_get_global_queue(bg, 0);
        console.log("send 3.1");
        this.udpClient = GCDAsyncUdpSocket.alloc()
            .initWithDelegateDelegateQueue(this, dispatchQueue);
        console.log("send 4");
        console.log(msg);
        let sendData: any = NSString.alloc().initWithCString(msg);
        console.log("send 4.1");
        console.log(sendData);
        this.udpClient.sendDataToHostPortWithTimeoutTag(sendData, address, port, -1, this.tag);
        console.log("send 5");
        this.tag++;
        console.log("send 6");
        return;
        }
        catch (err) {
            console.log(`caught error ${err}`);
            worker1.postMessage(`caught error ${err}`);
            return;
        }
    }

    sendBroadcast(port: number, msg: string): void {
        worker1.postMessage('Resolvi o broadcast');
        return;
    }
    private static invokeOnRunLoop = function() {
        let runLoop = CFRunLoopGetMain();
        return function (func) {
            CFRunLoopPerformBlock(runLoop, kCFRunLoopDefaultMode, func);
            CFRunLoopWakeUp(runLoop);
        };
    }();
}