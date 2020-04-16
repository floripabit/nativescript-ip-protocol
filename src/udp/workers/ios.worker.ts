import "globals";
import { UdpWorkerActions } from '../udpUtils';
const worker: Worker = self as any;

const bufferLength = 65526;
const successfullMessage = 'Action completed successfully';

worker.onmessage = ((message) => {
    if (!message ||
        !message.data ||
        !message.data.action) {
        throw new Error('Error: no action sent to worker');
    }

    switch (message.data.action) {
        case UdpWorkerActions.RECEIVE_MESSAGE:
            if (!message.data.port) {
                throw new Error(`Error: no port defined to receive message`);
            }
            worker.postMessage(receiveMessage(message.data.port));
            break;
        case UdpWorkerActions.SEND_BROADCAST_MESSAGE:
            if (!message.data.message) {
                throw new Error(`Error: no message to send`);
            }
            if (!message.data.port) {
                throw new Error(`Error: no port to broadcast message`);
            }
            if (sendBroadcastMessage(message.data.port, message.data.message) < 0) {
                throw new Error(`Error: Error sending broadcast message`);
            }
            worker.postMessage(successfullMessage);
            break;
        case UdpWorkerActions.SEND_UNICAST_MESSAGE:
            if (!message.data.message) {
                throw new Error(`Error: no message to send`);
            }
            if (!message.data.port || !message.data.address) {
                throw new Error(`Error: no port or address to send message`);
            }
            if (sendUnicastMessage(message.data.address, message.data.port, message.data.message) < 0) {
                throw new Error(`Error: Error sending unicast message`);
            }
            worker.postMessage(successfullMessage);
            break;
        default:
            throw new Error(`Error: ${message.data.action} is not a valid action`);
    }
});

function sendUnicastMessage(address: string, port: number, message: string): number {
    
    //CFSocketCreate()
    return 0;
}

function sendBroadcastMessage(port: number, message: string): number {
        return 0;
}

function receiveMessage(port: number): any {
    return 0;
}