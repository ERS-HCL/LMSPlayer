import { ConnectionStatus } from './connection.status';
export declare class ConnectionStatuses {
    private static statuses;
    static readonly connecting: ConnectionStatus;
    static readonly connected: ConnectionStatus;
    static readonly reconnecting: ConnectionStatus;
    static readonly disconnected: ConnectionStatus;
}
