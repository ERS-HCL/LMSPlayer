import { ConnectionTransport } from './connection.transport';
export declare class ConnectionTransports {
    private static transports;
    static readonly foreverFrame: ConnectionTransport;
    static readonly longPolling: ConnectionTransport;
    static readonly serverSentEvents: ConnectionTransport;
    static readonly webSockets: ConnectionTransport;
    static readonly auto: ConnectionTransport;
}
