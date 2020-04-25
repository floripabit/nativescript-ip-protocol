import { UdpCommon } from './udp.common';
import { Observable } from 'rxjs';

export declare class UdpProtocol extends UdpCommon {
    constructor();
    /**
     * Opens a listener UDP socket on an specific port that will keept opened
     * until reach the timeout. Each new received message refreshes
     * the timeout
     * @param port port number
     * @param timeout timout in ms
     * @returns Observable for the received messages
     */
    receiveWithTimeout(port: number, timeout: number): Observable<string>;
    /**
     * Opens a listener UDP socket on an specific port that will keept opened
     * until receive one packet. 
     * @param port port number
     * @returns Observable for the received message
     */
    receiveOnce(port: number): Observable<string>;
     /**
      * Send UDP unicast message
      * @param address IP with format 'xxx.xxx.xxx.xxx'
      * @param port port number
      * @param msg Message to be sent. objects should be stringfied
      * @returns Observable confirming when the message was sent
      */
    sendUnicast(address: string, port: number, msg: string): Observable<string>;
    /**
      * Send UDP broadcast message
      * @param port port number
      * @param msg Message to be sent. objects should be stringfied
      * @returns Observable confirming when the message was sent
      */
    sendBroadcast(port: number, msg: string): Observable<string>;
}
