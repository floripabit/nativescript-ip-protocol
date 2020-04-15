import { Component, OnInit } from "@angular/core";
import { UDPProtocol } from 'nativescript-ip-protocol';

const serverListeningPort = 55000;

@Component({
    selector: "Home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        const variable: UDPProtocol = new UDPProtocol();
        console.log('teste2222');
        /*variable.receive(serverListeningPort).subscribe((data) => {
            console.log('teste');
        });*/
        console.log('teste normal fora');
        const sendJson = { 
            teste1: 'oi',
            teste2: 'oi2',
            odakodkaokda: 'oioioioio'
        }
        setTimeout(() => {variable.sendUnicast('127.0.0.1', serverListeningPort,
            JSON.stringify(sendJson)).subscribe((ret) => {
            console.log(ret);
        })}, 1000);
    }
}
