import { Component, OnInit } from "@angular/core";
import { UdpProtocol } from 'nativescript-ip-protocol';

@Component({
    selector: "Home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        const variable: UdpProtocol = new UdpProtocol();
        variable.receive(55000).subscribe((data) => {
            console.log(JSON.parse(data));
        });
        const sendJson = { 
            teste1: 'oi',
            teste2: 'oi2',
            odakodkaokda: 'oioioioio'
        }
        setTimeout(() => {variable.sendUnicast('127.0.0.1', 55000, JSON.stringify(sendJson))
        .subscribe((ret) => {
            console.log('retorno');
            console.log(ret);
        })}, 10000);
    }
}
