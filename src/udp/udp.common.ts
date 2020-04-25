export class UdpCommon {

    constructor() {
    }

}

export type UdpParameters = |
{
    action: UdpWorkerActions.RECEIVE_ONCE_MESSAGE;
    port: number;
} |
{
    action: UdpWorkerActions.RECEIVE_START_MESSAGE;
    port: number;
    timeout: number;
} |
{
    action: UdpWorkerActions.RECEIVE_STOP_MESSAGE;
} |
{
    action: UdpWorkerActions.SEND_BROADCAST_MESSAGE;
    port: number;
    message: string;
} |
{
    action: UdpWorkerActions.SEND_UNICAST_MESSAGE;
    port: number;
    address: string;
    message: string;
};

export enum UdpWorkerActions {
    SEND_BROADCAST_MESSAGE = "sendBroadcast",
    SEND_UNICAST_MESSAGE = "sendUnicast",
    RECEIVE_ONCE_MESSAGE = "receive_once",
    RECEIVE_START_MESSAGE = "receive_start",
    RECEIVE_STOP_MESSAGE = "receive_stop",
    RETURN_SOCKET_MESSAGE = "return_socket",
    SOCKET_TIMEOUT_MESSAGE = "socket_timeout",
    RETURN_ERROR_MESSAGE = "return_error",
    RETURN_DATA_MESSAGE = "return_data"
}
