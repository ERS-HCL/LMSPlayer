import { ModuleWithProviders, NgZone, InjectionToken } from '@angular/core';
import { SignalR } from './signalr';
import { SignalRConfiguration } from './signalr.configuration';
export declare const SIGNALR_JCONNECTION_TOKEN: InjectionToken<any>;
export declare function createSignalr(configuration: SignalRConfiguration, zone: NgZone): SignalR;
export declare function getJConnectionFn(): any;
export declare class SignalRModule {
    static forRoot(getSignalRConfiguration: Function): ModuleWithProviders;
    static forChild(): ModuleWithProviders;
}
