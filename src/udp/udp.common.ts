import { Observable, Subject } from 'rxjs';
declare const global;

export class UdpCommon {
    public usingWebpack: boolean;

    constructor() {
        this.usingWebpack = global["TNS_WEBPACK"];
    }
}

export interface UdpParameters {
    action: UdpWorkerActions;
    port: number;
    address?: string;
    message?: string;
}

export enum UdpWorkerActions {
    SEND_BROADCAST_MESSAGE = 'sendBroadcast',
    SEND_UNICAST_MESSAGE = 'sendUnicast',
    RECEIVE_MESSAGE = 'receive'
}