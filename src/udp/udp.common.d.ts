export declare class UdpCommon {
    constructor();
}
export interface UdpParameters {
    action: UdpWorkerActions;
    port: number;
    address?: string;
    message?: string;
}
export declare enum UdpWorkerActions {
    SEND_BROADCAST_MESSAGE = "sendBroadcast",
    SEND_UNICAST_MESSAGE = "sendUnicast",
    RECEIVE_MESSAGE = "receive"
}
