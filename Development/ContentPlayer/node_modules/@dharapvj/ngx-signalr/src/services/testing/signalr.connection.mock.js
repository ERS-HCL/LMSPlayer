/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { BroadcastEventListener } from "../eventing/broadcast.event.listener";
/**
 * @record
 */
export function IListenerCollection() { }
function IListenerCollection_tsickle_Closure_declarations() {
    /* TODO: handle strange member:
    [name: string]: BroadcastEventListener<any>;
    */
}
var SignalRConnectionMock = (function () {
    function SignalRConnectionMock(_mockErrors$, _mockStatus$, _listeners) {
        this._mockErrors$ = _mockErrors$;
        this._mockStatus$ = _mockStatus$;
        this._listeners = _listeners;
    }
    Object.defineProperty(SignalRConnectionMock.prototype, "errors", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mockErrors$;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignalRConnectionMock.prototype, "status", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mockStatus$.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignalRConnectionMock.prototype, "id", {
        get: /**
         * @return {?}
         */
        function () {
            return 'xxxxxxxx-xxxx-xxxx-xxxxxxxxx';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SignalRConnectionMock.prototype.stop = /**
     * @return {?}
     */
    function () {
        //
    };
    /**
     * @return {?}
     */
    SignalRConnectionMock.prototype.start = /**
     * @return {?}
     */
    function () {
        return Promise.resolve(null); // TODO: implement
    };
    /**
     * @param {?} method
     * @param {...?} parameters
     * @return {?}
     */
    SignalRConnectionMock.prototype.invoke = /**
     * @param {?} method
     * @param {...?} parameters
     * @return {?}
     */
    function (method) {
        var parameters = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            parameters[_i - 1] = arguments[_i];
        }
        return Promise.resolve(null);
    };
    /**
     * @template T
     * @param {?} listener
     * @return {?}
     */
    SignalRConnectionMock.prototype.listen = /**
     * @template T
     * @param {?} listener
     * @return {?}
     */
    function (listener) {
        this._listeners[listener.event] = listener;
    };
    /**
     * @template T
     * @param {?} event
     * @return {?}
     */
    SignalRConnectionMock.prototype.listenFor = /**
     * @template T
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var /** @type {?} */ listener = new BroadcastEventListener(event);
        this.listen(listener);
        return listener;
    };
    return SignalRConnectionMock;
}());
export { SignalRConnectionMock };
function SignalRConnectionMock_tsickle_Closure_declarations() {
    /** @type {?} */
    SignalRConnectionMock.prototype._mockErrors$;
    /** @type {?} */
    SignalRConnectionMock.prototype._mockStatus$;
    /** @type {?} */
    SignalRConnectionMock.prototype._listeners;
}
//# sourceMappingURL=signalr.connection.mock.js.map