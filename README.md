# nativescript-ip-protocol

This plugin was created to use simple IP protocols over native platforms (iOS and Android).

Currently it is supported only UDP messages.

## Installation

```javascript
tns plugin add nativescript-ip-protocol
```

## Usage 

You can see demo-angular in the repository, but basic usage can be seen below
	
```ts
    import { UdpProtocol } from 'nativescript-ip-protocol';

    public startReceiving() {
        const udpSocket: UdpProtocol = new UdpProtocol();
        udpSocket.receiveWithTimeout(this.port, this.timeout)
        .subscribe((msg) => {
            this.receivedMessage = msg;
        }, (error) => {
            console.error(error);
        });
    }

    public receiveOnce() {
        const udpSocket: UdpProtocol = new UdpProtocol();
        udpSocket.receiveOnce(Number(this.port))
        .subscribe((msg) => {
            this.receivedMessage = msg;
        }, (error) => {
            console.error(error);
        });
    }

    public sendBroadcast() {
        const udpSocket: UdpProtocol = new UdpProtocol();
        this.message = msgDefault + this.messageCount;
        udpSocket.sendBroadcast(this.port, this.message)
        .subscribe(() => {
            this.status = "Broadcast message sent";
            this.messageCount++;
        });
    }

    public sendUnicast() {
        const udpSocket: UdpProtocol = new UdpProtocol();
        this.message = msgDefault + this.messageCount;
        udpSocket.sendUnicast(this.ip, this.port, this.message)
        .subscribe(() => {
            this.status = "Unicast message sent";
            this.messageCount++;
        });
    }
```

## License

MIT

## Thanks to 

Special thanks to  [NathanaelA](https://github.com/NathanaelA) who helped to solve outstanding issues
