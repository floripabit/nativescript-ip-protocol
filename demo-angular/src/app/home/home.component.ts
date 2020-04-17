import { Component, OnInit } from "@angular/core";
import { UdpProtocol } from 'nativescript-ip-protocol';

const defaultPort = 55000;

@Component({
    selector: "Home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        const udpSocket: UdpProtocol = new UdpProtocol();
        udpSocket.receive(defaultPort).subscribe((data) => {
            console.log(JSON.parse(data));
        });
        const sendJson = { 
            Obj1: 'test1',
            Obj2: 'test2',
            Obj3: 'test3'
        }
        setTimeout(() => {udpSocket.sendUnicast('127.0.0.1', defaultPort, JSON.stringify(sendJson))
        .subscribe((ret) => {
            console.log(ret);
        })}, 10000);
    }
}
