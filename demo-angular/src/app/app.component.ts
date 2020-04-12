import { UDPProtocol } from 'nativescript-ip-protocol';
import { Component } from "@angular/core";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent {
    constructor() {
        const variable: UDPProtocol = new UDPProtocol();
        variable.receive().subscribe((data) => {
            console.log(JSON.parse(data));
        });
        const sendJson = { 
            teste1: 'oi',
            teste2: 'oi2',
            odakodkaokda: 'oioioioio'
        }
        setTimeout(() => {variable.sendBroadcast(55000, JSON.stringify(sendJson)).subscribe((ret) => {
            console.log('retorno');
            console.log(ret);
        })}, 10000);
    }
}
