/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */
export function IConnectionOptions() { }
function IConnectionOptions_tsickle_Closure_declarations() {
    /**
     * connection url to the SignalR service.
     * @type {?|undefined}
     */
    IConnectionOptions.prototype.url;
    /**
     * Allows you to specify query string parameters object when the client connects.
     * @type {?|undefined}
     */
    IConnectionOptions.prototype.qs;
    /**
     * name of the SignalR service hub to connect to.
     * @type {?|undefined}
     */
    IConnectionOptions.prototype.hubName;
    /**
     * Allows jsonp
     * @type {?|undefined}
     */
    IConnectionOptions.prototype.jsonp;
    /**
     * Allows withCredentials
     * @type {?|undefined}
     */
    IConnectionOptions.prototype.withCredentials;
    /**
     * Allows pingInterval
     * @type {?|undefined}
     */
    IConnectionOptions.prototype.pingInterval;
    /**
     * Allows you to specify transport. You can specify a fallback order if you wan't to try specific transports in order. By default selects best avaliable transport.
     * @type {?|undefined}
     */
    IConnectionOptions.prototype.transport;
    /**
     * Allows you to run the event callback outside ngZone
     * @type {?|undefined}
     */
    IConnectionOptions.prototype.executeEventsInZone;
    /**
     * Allows you to run the errors callback outside ngZone
     * @type {?|undefined}
     */
    IConnectionOptions.prototype.executeErrorsInZone;
    /**
     * Allows you to run the status change in callback outside ngZone
     * @type {?|undefined}
     */
    IConnectionOptions.prototype.executeStatusChangeInZone;
}
//# sourceMappingURL=connection.options.js.map