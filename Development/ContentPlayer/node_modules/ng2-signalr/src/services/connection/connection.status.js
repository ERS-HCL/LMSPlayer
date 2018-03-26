export var ConnectionStatus = (function () {
    /**
     * @param {?} value
     */
    function ConnectionStatus(value) {
        if (value == null || value < 0) {
            throw new Error("Failed to create ConnectionStatus. Argument 'name' can not be null or empty.");
        }
        this._value = value;
    }
    Object.defineProperty(ConnectionStatus.prototype, "value", {
        /**
         * @return {?}
         */
        get: function () {
            return this._value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectionStatus.prototype, "name", {
        /**
         * @return {?}
         */
        get: function () {
            return ConnectionStatus.names[Number.parseInt(this._value.toString())];
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ConnectionStatus.prototype.toString = function () {
        return this.name;
    };
    /**
     * @param {?} other
     * @return {?}
     */
    ConnectionStatus.prototype.equals = function (other) {
        if (other == null) {
            return false;
        }
        return this._value === other.value;
    };
    ConnectionStatus.names = ['connecting', 'connected', 'reconnecting', '', 'disconnected'];
    return ConnectionStatus;
}());
function ConnectionStatus_tsickle_Closure_declarations() {
    /** @type {?} */
    ConnectionStatus.names;
    /** @type {?} */
    ConnectionStatus.prototype._value;
}
//# sourceMappingURL=connection.status.js.map