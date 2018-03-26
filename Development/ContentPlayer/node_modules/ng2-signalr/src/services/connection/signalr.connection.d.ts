import { ISignalRConnection } from './i.signalr.connection';
import { Observable } from 'rxjs/Observable';
import { BroadcastEventListener } from '../eventing/broadcast.event.listener';
import { ConnectionStatus } from './connection.status';
import { NgZone } from '@angular/core';
import { SignalRConfiguration } from '../signalr.configuration';
export declare class SignalRConnection implements ISignalRConnection {
    private _status;
    private _errors;
    private _jConnection;
    private _jProxy;
    private _zone;
    private _configuration;
    constructor(jConnection: any, jProxy: any, zone: NgZone, configuration: SignalRConfiguration);
    readonly errors: Observable<any>;
    readonly status: Observable<ConnectionStatus>;
    start(): Promise<ISignalRConnection>;
    stop(): void;
    readonly id: string;
    invoke(method: string, ...parameters: any[]): Promise<any>;
    listen<T>(listener: BroadcastEventListener<T>): void;
    listenFor<T>(event: string): BroadcastEventListener<T>;
    private convertTransports(transports);
    private wireUpErrorsAsObservable();
    private wireUpStatusEventsAsObservable();
    private onBroadcastEventReceived<T>(listener, ...args);
    private log(...args);
}
