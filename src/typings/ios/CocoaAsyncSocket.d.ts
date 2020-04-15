
declare var CocoaAsyncSocketVersionNumber: number;
declare var CocoaAsyncSocketVersionString: interop.Reference<number>;

declare var DISPATCH_QUEUE_CONCURRENT;

declare class GCDAsyncSocket extends NSObject {
	static CRData(): NSData;
	static CRLFData(): NSData;
	static LFData(): NSData;
	static ZeroData(): NSData;
	static alloc(): GCDAsyncSocket; // inherited from NSObject
	static getHostPortFamilyFromAddress(hostPtr: interop.Pointer | interop.Reference<string>, portPtr: interop.Pointer | interop.Reference<number>, afPtr: string | interop.Pointer | interop.Reference<any>, address: NSData): boolean;
	static getHostPortFromAddress(hostPtr: interop.Pointer | interop.Reference<string>, portPtr: interop.Pointer | interop.Reference<number>, address: NSData): boolean;
	static hostFromAddress(address: NSData): string;
	static isIPv4Address(address: NSData): boolean;
	static isIPv6Address(address: NSData): boolean;
	static lookupHostPortError(host: string, port: number): NSMutableArray<any>;
	static new(): GCDAsyncSocket; // inherited from NSObject
	static portFromAddress(address: NSData): number;
	static socketFromConnectedSocketFDDelegateDelegateQueueError(socketFD: number, aDelegate: GCDAsyncSocketDelegate, dq: NSObject): GCDAsyncSocket;
	static socketFromConnectedSocketFDDelegateDelegateQueueSocketQueueError(socketFD: number, aDelegate: GCDAsyncSocketDelegate, dq: NSObject, sq: NSObject): GCDAsyncSocket;
	static socketFromConnectedSocketFDSocketQueueError(socketFD: number, sq: NSObject): GCDAsyncSocket;
	IPv4Enabled: boolean;
	IPv4PreferredOverIPv6: boolean;
	IPv6Enabled: boolean;
	alternateAddressDelay: number;
	autoDisconnectOnClosedReadStream: boolean;
	readonly connectedAddress: NSData;
	readonly connectedHost: string;
	readonly connectedPort: number;
	readonly connectedUrl: NSURL;
	delegate: GCDAsyncSocketDelegate;
	delegateQueue: NSObject;
	readonly isConnected: boolean;
	readonly isDisconnected: boolean;
	readonly isIPv4: boolean;
	readonly isIPv6: boolean;
	readonly isSecure: boolean;
	readonly localAddress: NSData;
	readonly localHost: string;
	readonly localPort: number;
	userData: any;
	constructor(o: { delegate: GCDAsyncSocketDelegate; delegateQueue: NSObject; });
	constructor(o: { delegate: GCDAsyncSocketDelegate; delegateQueue: NSObject; socketQueue: NSObject; });
	constructor(o: { socketQueue: NSObject; });
	acceptOnInterfacePortError(interface: string, port: number): boolean;
	acceptOnPortError(port: number): boolean;
	acceptOnUrlError(url: NSURL): boolean;
	connectToAddressError(remoteAddr: NSData): boolean;
	connectToAddressViaInterfaceWithTimeoutError(remoteAddr: NSData, interface: string, timeout: number): boolean;
	connectToAddressWithTimeoutError(remoteAddr: NSData, timeout: number): boolean;
	connectToHostOnPortError(host: string, port: number): boolean;
	connectToHostOnPortViaInterfaceWithTimeoutError(host: string, port: number, interface: string, timeout: number): boolean;
	connectToHostOnPortWithTimeoutError(host: string, port: number, timeout: number): boolean;
	connectToNetServiceError(netService: NSNetService): boolean;
	connectToUrlWithTimeoutError(url: NSURL, timeout: number): boolean;
	disconnect(): void;
	disconnectAfterReading(): void;
	disconnectAfterReadingAndWriting(): void;
	disconnectAfterWriting(): void;
	enableBackgroundingOnSocket(): boolean;
	getDelegateDelegateQueue(delegatePtr: interop.Pointer | interop.Reference<GCDAsyncSocketDelegate>, delegateQueuePtr: interop.Pointer | interop.Reference<NSObject>): void;
	initWithDelegateDelegateQueue(aDelegate: GCDAsyncSocketDelegate, dq: NSObject): this;
	initWithDelegateDelegateQueueSocketQueue(aDelegate: GCDAsyncSocketDelegate, dq: NSObject, sq: NSObject): this;
	initWithSocketQueue(sq: NSObject): this;
	markSocketQueueTargetQueue(socketQueuesPreConfiguredTargetQueue: NSObject): void;
	performBlock(block: () => void): void;
	progressOfReadReturningTagBytesDoneTotal(tagPtr: interop.Pointer | interop.Reference<number>, donePtr: interop.Pointer | interop.Reference<number>, totalPtr: interop.Pointer | interop.Reference<number>): number;
	progressOfWriteReturningTagBytesDoneTotal(tagPtr: interop.Pointer | interop.Reference<number>, donePtr: interop.Pointer | interop.Reference<number>, totalPtr: interop.Pointer | interop.Reference<number>): number;
	readDataToDataWithTimeoutBufferBufferOffsetMaxLengthTag(data: NSData, timeout: number, buffer: NSMutableData, offset: number, length: number, tag: number): void;
	readDataToDataWithTimeoutBufferBufferOffsetTag(data: NSData, timeout: number, buffer: NSMutableData, offset: number, tag: number): void;
	readDataToDataWithTimeoutMaxLengthTag(data: NSData, timeout: number, length: number, tag: number): void;
	readDataToDataWithTimeoutTag(data: NSData, timeout: number, tag: number): void;
	readDataToLengthWithTimeoutBufferBufferOffsetTag(length: number, timeout: number, buffer: NSMutableData, offset: number, tag: number): void;
	readDataToLengthWithTimeoutTag(length: number, timeout: number, tag: number): void;
	readDataWithTimeoutBufferBufferOffsetMaxLengthTag(timeout: number, buffer: NSMutableData, offset: number, length: number, tag: number): void;
	readDataWithTimeoutBufferBufferOffsetTag(timeout: number, buffer: NSMutableData, offset: number, tag: number): void;
	readDataWithTimeoutTag(timeout: number, tag: number): void;
	readStream(): NSInputStream;
	setDelegateDelegateQueue(delegate: GCDAsyncSocketDelegate, delegateQueue: NSObject): void;
	socket4FD(): number;
	socket6FD(): number;
	socketFD(): number;
	sslContext(): any;
	startTLS(tlsSettings: NSDictionary<string, NSObject>): void;
	synchronouslySetDelegate(delegate: GCDAsyncSocketDelegate): void;
	synchronouslySetDelegateDelegateQueue(delegate: GCDAsyncSocketDelegate, delegateQueue: NSObject): void;
	synchronouslySetDelegateQueue(delegateQueue: NSObject): void;
	unmarkSocketQueueTargetQueue(socketQueuesPreviouslyConfiguredTargetQueue: NSObject): void;
	writeDataWithTimeoutTag(data: NSData, timeout: number, tag: number): void;
	writeStream(): NSOutputStream;
}

interface GCDAsyncSocketDelegate extends NSObjectProtocol {
	newSocketQueueForConnectionFromAddressOnSocket?(address: NSData, sock: GCDAsyncSocket): NSObject;
	socketDidAcceptNewSocket?(sock: GCDAsyncSocket, newSocket: GCDAsyncSocket): void;
	socketDidCloseReadStream?(sock: GCDAsyncSocket): void;
	socketDidConnectToHostPort?(sock: GCDAsyncSocket, host: string, port: number): void;
	socketDidConnectToUrl?(sock: GCDAsyncSocket, url: NSURL): void;
	socketDidDisconnectWithError?(sock: GCDAsyncSocket, err: NSError): void;
	socketDidReadDataWithTag?(sock: GCDAsyncSocket, data: NSData, tag: number): void;
	socketDidReadPartialDataOfLengthTag?(sock: GCDAsyncSocket, partialLength: number, tag: number): void;
	socketDidReceiveTrustCompletionHandler?(sock: GCDAsyncSocket, trust: any, completionHandler: (p1: boolean) => void): void;
	socketDidSecure?(sock: GCDAsyncSocket): void;
	socketDidWriteDataWithTag?(sock: GCDAsyncSocket, tag: number): void;
	socketDidWritePartialDataOfLengthTag?(sock: GCDAsyncSocket, partialLength: number, tag: number): void;
	socketShouldTimeoutReadWithTagElapsedBytesDone?(sock: GCDAsyncSocket, tag: number, elapsed: number, length: number): number;
	socketShouldTimeoutWriteWithTagElapsedBytesDone?(sock: GCDAsyncSocket, tag: number, elapsed: number, length: number): number;
}

declare var GCDAsyncSocketDelegate: {
	prototype: GCDAsyncSocketDelegate;
};

declare const enum GCDAsyncSocketError {
	NoError = 0,
	BadConfigError = 1,
	BadParamError = 2,
	ConnectTimeoutError = 3,
	ReadTimeoutError = 4,
	WriteTimeoutError = 5,
	ReadMaxedOutError = 6,
	ClosedError = 7,
	OtherError = 8
}

declare var GCDAsyncSocketErrorDomain: string;
declare var GCDAsyncSocketException: string;
declare var GCDAsyncSocketManuallyEvaluateTrust: string;
declare var GCDAsyncSocketQueueName: string;
declare var GCDAsyncSocketSSLCipherSuites: string;
declare var GCDAsyncSocketSSLPeerID: string;
declare var GCDAsyncSocketSSLProtocolVersionMax: string;
declare var GCDAsyncSocketSSLProtocolVersionMin: string;
declare var GCDAsyncSocketSSLSessionOptionFalseStart: string;
declare var GCDAsyncSocketSSLSessionOptionSendOneByteRecord: string;
declare var GCDAsyncSocketThreadName: string;
declare var GCDAsyncSocketUseCFStreamForTLS: string;

declare class GCDAsyncUdpSocket extends NSObject {
	static alloc(): GCDAsyncUdpSocket; // inherited from NSObject
	static familyFromAddress(address: NSData): number;
	static getHostPortFamilyFromAddress(hostPtr: interop.Pointer | interop.Reference<string>, portPtr: interop.Pointer | interop.Reference<number>, afPtr: interop.Pointer | interop.Reference<number>, address: NSData): boolean;
	static getHostPortFromAddress(hostPtr: interop.Pointer | interop.Reference<string>, portPtr: interop.Pointer | interop.Reference<number>, address: NSData): boolean;
	static hostFromAddress(address: NSData): string;
	static isIPv4Address(address: NSData): boolean;
	static isIPv6Address(address: NSData): boolean;
	static new(): GCDAsyncUdpSocket; // inherited from NSObject
	static portFromAddress(address: NSData): number;
	constructor(o: { delegate: GCDAsyncUdpSocketDelegate; delegateQueue: NSObject; });
	constructor(o: { delegate: GCDAsyncUdpSocketDelegate; delegateQueue: NSObject; socketQueue: NSObject; });
	constructor(o: { socketQueue: NSObject; });
	beginReceiving(errPtr: interop.Reference<NSError>): boolean;
	bindToAddressError(localAddr: NSData): boolean;
	bindToPortError(port: number, errPtr: interop.Reference<NSError>): boolean;
	bindToPortInterfaceError(port: number, interface: string): boolean;
	close(): void;
	closeAfterSending(): void;
	connectToAddressError(remoteAddr: NSData): boolean;
	connectToHostOnPortError(host: string, port: number): boolean;
	connectedAddress(): NSData;
	connectedHost(): string;
	connectedPort(): number;
	delegate(): GCDAsyncUdpSocketDelegate;
	delegateQueue(): NSObject;
	enableBroadcastError(flag: boolean): boolean;
	enableReusePortError(flag: boolean): boolean;
	getDelegateDelegateQueue(delegatePtr: interop.Pointer | interop.Reference<GCDAsyncUdpSocketDelegate>, delegateQueuePtr: interop.Pointer | interop.Reference<NSObject>): void;
	initWithDelegateDelegateQueue(aDelegate: GCDAsyncUdpSocketDelegate, dq: NSObject): this;
	initWithDelegateDelegateQueueSocketQueue(aDelegate: GCDAsyncUdpSocketDelegate, dq: NSObject, sq: NSObject): this;
	initWithSocketQueue(sq: NSObject): this;
	isClosed(): boolean;
	isConnected(): boolean;
	isIPVersionNeutral(): boolean;
	isIPv4(): boolean;
	isIPv4Enabled(): boolean;
	isIPv4Preferred(): boolean;
	isIPv6(): boolean;
	isIPv6Enabled(): boolean;
	isIPv6Preferred(): boolean;
	joinMulticastGroupError(group: string): boolean;
	joinMulticastGroupOnInterfaceError(group: string, interface: string): boolean;
	leaveMulticastGroupError(group: string): boolean;
	leaveMulticastGroupOnInterfaceError(group: string, interface: string): boolean;
	localAddress(): NSData;
	localAddress_IPv4(): NSData;
	localAddress_IPv6(): NSData;
	localHost(): string;
	localHost_IPv4(): string;
	localHost_IPv6(): string;
	localPort(): number;
	localPort_IPv4(): number;
	localPort_IPv6(): number;
	markSocketQueueTargetQueue(socketQueuesPreConfiguredTargetQueue: NSObject): void;
	maxReceiveIPv4BufferSize(): number;
	maxReceiveIPv6BufferSize(): number;
	maxSendBufferSize(): number;
	pauseReceiving(): void;
	performBlock(block: () => void): void;
	readStream(): NSInputStream;
	receiveOnce(): boolean;
	sendDataToAddressWithTimeoutTag(data: NSData, remoteAddr: NSData, timeout: number, tag: number): void;
	sendDataToHostPortWithTimeoutTag(data: NSData, host: string, port: number, timeout: number, tag: number): void;
	sendDataWithTimeoutTag(data: NSData, timeout: number, tag: number): void;
	setDelegate(delegate: GCDAsyncUdpSocketDelegate): void;
	setDelegateDelegateQueue(delegate: GCDAsyncUdpSocketDelegate, delegateQueue: NSObject): void;
	setDelegateQueue(delegateQueue: NSObject): void;
	setIPVersionNeutral(): void;
	setIPv4Enabled(flag: boolean): void;
	setIPv6Enabled(flag: boolean): void;
	setMaxReceiveIPv4BufferSize(max: number): void;
	setMaxReceiveIPv6BufferSize(max: number): void;
	setMaxSendBufferSize(max: number): void;
	setPreferIPv4(): void;
	setPreferIPv6(): void;
	setReceiveFilterWithQueue(filterBlock: (p1: NSData, p2: NSData, p3: interop.Pointer | interop.Reference<any>) => boolean, filterQueue: NSObject): void;
	setReceiveFilterWithQueueIsAsynchronous(filterBlock: (p1: NSData, p2: NSData, p3: interop.Pointer | interop.Reference<any>) => boolean, filterQueue: NSObject, isAsynchronous: boolean): void;
	setSendFilterWithQueue(filterBlock: (p1: NSData, p2: NSData, p3: number) => boolean, filterQueue: NSObject): void;
	setSendFilterWithQueueIsAsynchronous(filterBlock: (p1: NSData, p2: NSData, p3: number) => boolean, filterQueue: NSObject, isAsynchronous: boolean): void;
	setUserData(arbitraryUserData: any): void;
	socket4FD(): number;
	socket6FD(): number;
	socketFD(): number;
	synchronouslySetDelegate(delegate: GCDAsyncUdpSocketDelegate): void;
	synchronouslySetDelegateDelegateQueue(delegate: GCDAsyncUdpSocketDelegate, delegateQueue: NSObject): void;
	synchronouslySetDelegateQueue(delegateQueue: NSObject): void;
	unmarkSocketQueueTargetQueue(socketQueuesPreviouslyConfiguredTargetQueue: NSObject): void;
	userData(): any;
	writeStream(): NSOutputStream;
}

interface GCDAsyncUdpSocketDelegate extends NSObjectProtocol {
	udpSocketDidCloseWithError?(sock: GCDAsyncUdpSocket, error: NSError): void;
	udpSocketDidConnectToAddress?(sock: GCDAsyncUdpSocket, address: NSData): void;
	udpSocketDidNotConnect?(sock: GCDAsyncUdpSocket, error: NSError): void;
	udpSocketDidNotSendDataWithTagDueToError?(sock: GCDAsyncUdpSocket, tag: number, error: NSError): void;
	udpSocketDidReceiveDataFromAddressWithFilterContext?(sock: GCDAsyncUdpSocket, data: NSData, address: NSData, filterContext: any): void;
	udpSocketDidSendDataWithTag?(sock: GCDAsyncUdpSocket, tag: number): void;
}

declare var GCDAsyncUdpSocketDelegate: {
	prototype: GCDAsyncUdpSocketDelegate;
};

declare const enum GCDAsyncUdpSocketError {
	NoError = 0,
	BadConfigError = 1,
	BadParamError = 2,
	SendTimeoutError = 3,
	ClosedError = 4,
	OtherError = 5
}

declare var GCDAsyncUdpSocketErrorDomain: string;
declare var GCDAsyncUdpSocketException: string;
declare var GCDAsyncUdpSocketQueueName: string;
declare var GCDAsyncUdpSocketThreadName: string;