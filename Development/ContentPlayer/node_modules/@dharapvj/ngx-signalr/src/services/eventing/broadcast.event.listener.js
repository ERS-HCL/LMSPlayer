var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Subject } from "rxjs/Subject";
var BroadcastEventListener = (function (_super) {
    __extends(BroadcastEventListener, _super);
    function BroadcastEventListener(event) {
        var _this = _super.call(this) || this;
        _this.event = event;
        if (event == null || event === '') {
            throw new Error('Failed to create BroadcastEventListener. Argument \'event\' can not be empty');
        }
        return _this;
    }
    return BroadcastEventListener;
}(Subject));
export { BroadcastEventListener };
function BroadcastEventListener_tsickle_Closure_declarations() {
    /** @type {?} */
    BroadcastEventListener.prototype.event;
}
//# sourceMappingURL=broadcast.event.listener.js.map