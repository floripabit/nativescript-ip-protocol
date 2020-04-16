import "globals";
const worker: Worker = self as any;

const serverListeningPort = 55000;
const bufferLength = 65526;
const successfullMessage = 'Action completed successfully';

worker.onmessage = ((message) => {
    if (!message ||
        !message.data ||
        !message.data.action) {
        throw new Error('Error: no action sent to worker');
    }

    switch (message.data.action) {
        case "receive":
            worker.postMessage(receiveMessage());
            break;
        case "sendBroadcast":
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
        case "sendUnicast":
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
            new java.net.DatagramPacket(buffer, 0, message.length, inetAddress, port);

        try {
            socket.send(packet);
            socket.close();
            return 0;
        }
        catch (e) {
            socket.close();
            console.error(e);
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
            new java.net.DatagramPacket(buffer, 0, message.length, inetAddress, port);

        try {
            socket.send(packet);
            socket.close();
            return 0;
        }
        catch (e) {
            socket.close();
            console.error(e);
            return -1;
        }
}

function receiveMessage(): any {
    let serverUDPSocket = new java.net.DatagramSocket(serverListeningPort);
    let buffer = Array.create('byte', bufferLength);

    let packet: java.net.DatagramPacket = new java.net.DatagramPacket(buffer, bufferLength);
    try {
        serverUDPSocket.receive(packet);
        let retStr: Array<number> = new Array();
        for (let i = 0; i < packet.getLength(); i++) {
            retStr.push(packet.getData()[i]);
        }
        return String.fromCharCode(...retStr);
    }
    catch (e) {
        console.error(e);
        return e;
    }
}