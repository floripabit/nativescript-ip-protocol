import { Component, OnInit } from "@angular/core";
import { UdpProtocol } from 'nativescript-ip-protocol';

@Component({
    selector: "Home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    private messageCount = 0;
    public port = 55000;
    public ip = "127.0.0.1";
    public message = "This is a {N} test";
    public receivedMessage;
    public status;

    constructor() {
        // Use the component constructor to inject providers.
        this.message = "This is a {N} test n." + this.messageCount;
        this.status = "None";
    }

    public ngOnInit(): void {

    }

    public startReceiving() {
    }

    public receiveOnce() {
        const udpSocket: UdpProtocol = new UdpProtocol();
        this.status = "Opening to receive once...";
        udpSocket.receive(this.port)
        .subscribe((msg) => {
            this.status = "Received message";
            this.cleanStatus();
            this.receivedMessage = msg;
        });
    }

    public sendBroadcast() {
        const udpSocket: UdpProtocol = new UdpProtocol();
        this.status = "Sending Broadcast...";
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
