import { ConnectionStatus } from './connection.status';
export var ConnectionStatuses = (function () {
    function ConnectionStatuses() {
    }
    Object.defineProperty(ConnectionStatuses, "connecting", {
        /**
         * @return {?}
         */
        get: function () {
            return ConnectionStatuses.statuses[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectionStatuses, "connected", {
        /**
         * @return {?}
         */
        get: function () {
            return ConnectionStatuses.statuses[1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectionStatuses, "reconnecting", {
        /**
         * @return {?}
         */
        get: function () {
            return ConnectionStatuses.statuses[2];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectionStatuses, "disconnected", {
        /**
         * @return {?}
         */
        get: function () {
            return ConnectionStatuses.statuses[3];
        },
        enumerable: true,
        configurable: true
    });
    ConnectionStatuses.statuses = [
        new ConnectionStatus(0),
        new ConnectionStatus(1),
        new ConnectionStatus(2),
        new ConnectionStatus(4)
    ];
    return ConnectionStatuses;
}());
function ConnectionStatuses_tsickle_Closure_declarations() {
    /** @type {?} */
    ConnectionStatuses.statuses;
}
//# sourceMappingURL=connection.statuses.js.map