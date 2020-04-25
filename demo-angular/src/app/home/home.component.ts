import { Component, OnInit, NgZone } from "@angular/core";
import { UdpProtocol } from 'nativescript-ip-protocol';

const msgDefault = "This is a {N} test n.";

@Component({
    selector: "Home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    public messageCount = 0;
    public port = 55000;
    public ip = "127.0.0.1";
    public message = "This is a {N} test";
    public receivedMessage;
    public status;

    constructor(private ngZone: NgZone) {
        // Use the component constructor to inject providers.
        this.message = "This is a {N} test n." + this.messageCount;
        this.status = "None";
    }

    public ngOnInit(): void {

    }

    public startReceiving() {
        const udpSocket: UdpProtocol = new UdpProtocol();
        this.status = "Opening to receive many...";
        udpSocket.receiveWithTimeout(this.port, 5000)
        .subscribe((msg) => {
            this.status = "Received message";
            this.cleanStatus();
            this.ngZone.run(() => {
                this.receivedMessage = msg;
            })
        }, (error) => {
            console.error('Error at receiveOnce');
            console.error(error);
        });
    }

    public receiveOnce() {
        const udpSocket: UdpProtocol = new UdpProtocol();
        this.status = "Opening to receive once...";
        udpSocket.receiveOnce(Number(this.port))
        .subscribe((msg) => {
            this.status = "Received message";
            this.cleanStatus();
            this.ngZone.run(() => {
                this.receivedMessage = msg;
            })
        }, (error) => {
            console.error('Error at receiveOnce');
            console.error(error);
        });
    }

    public sendBroadcast() {
        const udpSocket: UdpProtocol = new UdpProtocol();
        this.status = "Sending Broadcast...";
        this.message = msgDefault + this.messageCount;
        udpSocket.sendBroadcast(this.port, this.message)
        .subscribe(() => {
            this.status = "Broadcast message sent";
            this.messageCount++;
            this.cleanStatus(); 
        });
    }

    public sendUnicast() {
        const udpSocket: UdpProtocol = new UdpProtocol();
        this.status = "Sending Unicast...";
        this.message = msgDefault + this.messageCount;
        udpSocket.sendUnicast(this.ip, this.port, this.message)
        .subscribe(() => {
            this.status = "Unicast message sent";
            this.messageCount++;
            this.cleanStatus();
        });
    }

    private cleanStatus() {
        setTimeout(() => {
            this.status = "None";
        },1500);
    }
}
