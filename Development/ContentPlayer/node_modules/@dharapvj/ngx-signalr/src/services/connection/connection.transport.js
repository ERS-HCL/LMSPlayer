/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ConnectionTransport = (function () {
    function ConnectionTransport(name) {
        if (name == null || name === "") {
            throw new Error("Failed to create ConnectionTransport. Argument 'name' can not be null or empty.");
        }
        this._name = name;
    }
    Object.defineProperty(ConnectionTransport.prototype, "name", {
        get: /**
         * @return {?}
         */
        function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ConnectionTransport.prototype.toString = /**
     * @return {?}
     */
    function () {
        return this._name;
    };
    /**
     * @param {?} other
     * @return {?}
     */
    ConnectionTransport.prototype.equals = /**
     * @param {?} other
     * @return {?}
     */
    function (other) {
        if (other == null) {
            return false;
        }
        return this._name === other.name;
    };
    return ConnectionTransport;
}());
export { ConnectionTransport };
function ConnectionTransport_tsickle_Closure_declarations() {
    /** @type {?} */
    ConnectionTransport.prototype._name;
}
//# sourceMappingURL=connection.transport.js.map