import "globals";
import { UdpWorkerActions } from '../udp.common';
import { UdpAndroidWorkerAnswer } from '../udp.android';
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
        case UdpWorkerActions.RECEIVE_ONCE_MESSAGE:
            if (!message.data.port) {
                throw new Error(`Error: no port defined to receive message`);
            }
            worker.postMessage(receiveOnceMessage(message.data.port));
            break;
        case UdpWorkerActions.RECEIVE_START_MESSAGE:
            if (!message.data.port) {
                throw new Error(`Error: no port defined to receive message`);
            }
            startReceiveWithTimeout(message.data.port, message.data.timeout);
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
        let socket: java.net.DatagramSocket = new java.net.DatagramSocket();
        let inetAddress: java.net.InetAddress;
        let buffer = Array.create('byte', message.length);
        for (let i = 0; i < message.length; i++) {
            buffer[i] = message.charCodeAt(i);
        }

        inetAddress = java.net.InetAddress.getByName(address);
        const packet: java.net.DatagramPacket =
            new java.net.DatagramPacket(buffer, 0, message.length, inetAddress, Number(port));

        try {
            socket.send(packet);
            socket.close();
            return 0;
        }
        catch (e) {
            if (socket) {
                socket.close();
            }
            console.error(e.message);
            return -1;
        }
}

function sendBroadcastMessage(port: number, message: string): number {
        let socket: java.net.DatagramSocket = new java.net.DatagramSocket();
        let inetAddress: java.net.InetAddress;
        let buffer = Array.create('byte', message.length);
        for (let i = 0; i < message.length; i++) {
            buffer[i] = message.charCodeAt(i);
        }

        socket.setBroadcast(true);
        inetAddress = java.net.InetAddress.getByName("255.255.255.255");
        const packet: java.net.DatagramPacket =
            new java.net.DatagramPacket(buffer, 0, message.length, inetAddress, Number(port));

        try {
            socket.send(packet);
            socket.close();
            return 0;
        }
        catch (e) {
            if (socket) {
                socket.close();
            }
            console.error(e.message);
            return -1;
        }
}

function receiveOnceMessage(port: number): UdpAndroidWorkerAnswer {
    let serverUDPSocket: java.net.DatagramSocket;
    let retMsg: UdpAndroidWorkerAnswer;
    let buffer = Array.create('byte', bufferLength);
    let packet: java.net.DatagramPacket = new java.net.DatagramPacket(buffer, bufferLength);
    try {
        serverUDPSocket = new java.net.DatagramSocket(Number(port));
        serverUDPSocket.receive(packet);
        let retStr: Array<number> = new Array();
        for (let i = 0; i < packet.getLength(); i++) {
            retStr.push(packet.getData()[i]);
        }
        serverUDPSocket.close();
        retMsg = {
            action: UdpWorkerActions.RETURN_DATA_MESSAGE,
            data: <any>String.fromCharCode(...retStr)
        };
        return retMsg;
    }
    catch (e) {
        console.error(e.message);
        if (serverUDPSocket) {
            serverUDPSocket.close();
        }
        retMsg = {
            action: UdpWorkerActions.RETURN_ERROR_MESSAGE,
            error: e.message
        };
        return retMsg;
    }
}

function startReceiveWithTimeout(port: number, timeout: number): void {
    let udpServer: java.net.DatagramSocket;
    let retMsg: UdpAndroidWorkerAnswer;
    try {
        udpServer = new java.net.DatagramSocket(Number(port));
        udpServer.setSoTimeout(Number(timeout));
    }
    catch (e) {
        console.error(e.message);
        retMsg = {
            action: UdpWorkerActions.RETURN_ERROR_MESSAGE,
            error: e.message
        };
        worker.postMessage(retMsg);
        return;
    }
    let buffer = Array.create('byte', bufferLength);
    let packet: java.net.DatagramPacket = new java.net.DatagramPacket(buffer, bufferLength);
    try {
        while (1) {
            if (!udpServer) {
                return;
            }
            udpServer.receive(packet);
            let retStr: Array<number> = new Array();
            for (let i = 0; i < packet.getLength(); i++) {
                retStr.push(packet.getData()[i]);
            }
            retMsg = {
                action: UdpWorkerActions.RETURN_DATA_MESSAGE,
                data: String.fromCharCode(...retStr)
            };
            worker.postMessage(retMsg);
        }
        return;
    }
    catch (e) {
        const message: string = e.message;
        if (message.localeCompare('java.net.SocketTimeoutException') > 0) {
            retMsg = { action: UdpWorkerActions.SOCKET_TIMEOUT_MESSAGE };
            udpServer.close();
            worker.postMessage(retMsg);
            return;
        }

        if (udpServer) {
            udpServer.close();
        }

        console.error(e.message);
        retMsg = {
            action: UdpWorkerActions.RETURN_ERROR_MESSAGE,
            error: e.message
        };
        worker.postMessage(retMsg);
        return;
    }
}
