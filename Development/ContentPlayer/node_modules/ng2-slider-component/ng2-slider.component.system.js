/**
 * Created by Targus on 21.03.2016.
 * @author Bogdan Shapoval (targus) <it.targus@gmail.com>
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// declare var __moduleName: string, module:any;
var core_1 = require('@angular/core');
var slideable_directive_1 = require('ng2-slideable-directive/slideable.directive');
var ng2_styled_directive_1 = require('ng2-styled-directive/ng2-styled.directive');
var ng2_slider_skins_1 = require('./ng2-slider.skins');
(function (RangeHandle) {
    RangeHandle[RangeHandle["Start"] = 0] = "Start";
    RangeHandle[RangeHandle["End"] = 1] = "End";
    RangeHandle[RangeHandle["Both"] = 2] = "Both";
})(exports.RangeHandle || (exports.RangeHandle = {}));
var RangeHandle = exports.RangeHandle;
var Ng2SliderComponent = (function () {
    function Ng2SliderComponent(CDR, _elementRef, _view, renderer) {
        this.CDR = CDR;
        this._elementRef = _elementRef;
        this._view = _view;
        this.renderer = renderer;
        // @Input() stylePath: string;
        this.rangeChangedEvent = new core_1.EventEmitter();
        this.isRange = true;
        this._skins = ng2_slider_skins_1.skins;
        this.handlers = {
            Start: null,
            End: null
        };
        this.initialStartValue = null;
        this.initialEndValue = null;
        /*private initNormalHandlerStyle = {
            width: '18px',
            height: '18px',
            border: 'solid 1px red',
            position: 'absolute',
            'background-color': 'yellow',
        };*/
        this.initNormalHandlerStyle = {};
        this.initSlidingHandlerStyle = {};
        /*private initRangeRibbonStyle = {
            left: '0%',
            width: '100%',
            height: '10px',
            border: 'solid 1px',
            position: 'absolute',
            top: '4px'
        };*/
        this.initRangeRibbonStyle = {};
        this.resultNormalHandlerStyle = {};
        this.resultSlidingHandlerStyle = {};
        this.resultRangeRibbonStyle = {};
        this.resultHandleStyle = [];
        // Create self instance as property for comfortable providing it to SlideAble directive
        this.instance = this;
    }
    Object.defineProperty(Ng2SliderComponent.prototype, "value", {
        set: function (value) {
            this.startValue = parseFloat(value);
        },
        enumerable: true,
        configurable: true
    });
    Ng2SliderComponent.prototype.ngOnInit = function () {
        if (this.startValue != null && this.endValue == null)
            this.isRange = false;
        Object.assign(this.initSlidingHandlerStyle, this.initNormalHandlerStyle);
        Object.assign(this.resultNormalHandlerStyle, this.initNormalHandlerStyle, this.normalHandlerStyle);
        Object.assign(this.resultSlidingHandlerStyle, this.initSlidingHandlerStyle, this.slidingHandlerStyle);
        Object.assign(this.resultRangeRibbonStyle, this.initRangeRibbonStyle, this.rangeRibbonStyle);
        // Compile range ribbon style line from object
        /*        var rangeRangeRibbonStyle = '';
                for (let idx in this.resultRangeRibbonStyle) {
                    rangeRangeRibbonStyle += idx + ':' + this.resultRangeRibbonStyle[idx] + ';';
                }
                this.resultRangeRibbonStyle = rangeRangeRibbonStyle;*/
        this.resultRangeRibbonStyle = this.convertStyles(this.resultRangeRibbonStyle);
        if (!this.styleBlock) {
            var normal = this.convertStyles(this.resultNormalHandlerStyle);
            if (normal)
                this.resultHandleStyle.push(".slider-handle  " + normal);
            var sliding = this.convertStyles(this.resultSlidingHandlerStyle);
            if (sliding)
                this.resultHandleStyle.push(".slider-handle.sliding " + sliding);
        }
        /*        this.range = new Range({
                    element: this.ribbon.nativeElement,
                    min: this.min,
                    max: this.max
                });*/
    };
    Ng2SliderComponent.prototype.refreshInputBox = function (boundingRect, handle) {
        var value = this.range.calculateValueFromX(boundingRect.left + Math.round(boundingRect.width / 2));
        switch (handle) {
            case RangeHandle.Start:
                this.startValue = value.toString();
                break;
            case RangeHandle.End:
                this.endValue = value.toString();
                break;
            default:
                break;
        }
        this.CDR.detectChanges();
        this.CDR.markForCheck();
        return value;
    };
    Ng2SliderComponent.prototype.refreshInputBoxByPercent = function (percent, handle) {
        var precision = this.calculatePrecision(this.stepValue);
        var value = (+this.min + (this.max - this.min) * percent / 100).toFixed(precision);
        switch (handle) {
            case RangeHandle.Start:
                this.startValue = value.toString();
                break;
            case RangeHandle.End:
                this.endValue = value.toString();
                break;
            default:
                break;
        }
        this.CDR.detectChanges();
        this.CDR.markForCheck();
        return value;
    };
    Ng2SliderComponent.prototype.calculatePrecision = function (x) {
        // @ToDo: make precision calculation method
        return 0;
    };
    /**
     * Set new handle position when value was changed in input-box
     * @param handle
     */
    Ng2SliderComponent.prototype.valueChanged = function (el, handle) {
        if (handle === void 0) { handle = RangeHandle.Both; }
        if (handle == RangeHandle.Both || handle == RangeHandle.Start) {
            // Affixing start value to the step grid
            this.startValue = this.initialStartValue + Math.round((this.startValue - this.initialStartValue) / this.stepValue) * this.stepValue;
            // Check for case when the start value is over the end value
            if (parseFloat(this.startValue) > parseFloat(this.endValue)) {
                this.startValue = this.initialStartValue + Math.floor((this.endValue - this.initialStartValue) / this.stepValue) * this.stepValue;
            }
            // Check for case when the start value is under the minimal value
            if (parseFloat(this.startValue) < parseFloat(this.min)) {
                this.startValue = this.initialStartValue + Math.ceil((this.min - this.initialStartValue) / this.stepValue) * this.stepValue;
            }
            // Force start handle to redrawing
            if (this.range) {
                this.handlers.Start.redraw(this.range.calculateXFromValue(this.startValue), 0);
            }
        }
        if (handle == RangeHandle.Both || handle == RangeHandle.End) {
            // Affixing end value to the step grid
            this.endValue = this.initialEndValue + Math.round((this.endValue - this.initialEndValue) / this.stepValue) * this.stepValue;
            // Check for case when the end value is under the start value
            if (parseFloat(this.startValue) > parseFloat(this.endValue)) {
                this.endValue = this.initialEndValue + Math.ceil((this.endValue - this.initialEndValue) / this.stepValue) * this.stepValue;
            }
            // Check for case when the end value is over the maximum value
            if (parseFloat(this.endValue) > parseFloat(this.max)) {
                this.endValue = this.initialEndValue + Math.floor((this.max - this.initialEndValue) / this.stepValue) * this.stepValue;
            }
            // Force end handle to redrawing
            if (this.range) {
                this.handlers.End.redraw(this.range.calculateXFromValue(this.endValue), 0);
            }
        }
        this.CDR.markForCheck();
        this.CDR.detectChanges();
    };
    Ng2SliderComponent.prototype.ngAfterViewInit = function () {
        /**
         *   In case of ng2-slider is root component, @inputs would not work, so we check inputs - if they are not defined,
         *   get them as attributes
         */
        if (!this.min)
            this.min = this._elementRef.nativeElement.attributes.getNamedItem('min').value;
        if (!this.max)
            this.max = this._elementRef.nativeElement.attributes.getNamedItem('max').value;
        if (!this.startValue && this._elementRef.nativeElement.attributes.getNamedItem('value')) {
            this.startValue = this._elementRef.nativeElement.attributes.getNamedItem('value').value;
            if (this.startValue != null && this.endValue == null)
                this.isRange = false;
        }
        if (!this.startValue && this._elementRef.nativeElement.attributes.getNamedItem('startValue'))
            this.startValue = this._elementRef.nativeElement.attributes.getNamedItem('startValue').value;
        if (!this.startValue)
            this.startValue = this.min;
        if (!this.endValue && this.isRange && this._elementRef.nativeElement.attributes.getNamedItem('endValue'))
            this.endValue = this._elementRef.nativeElement.attributes.getNamedItem('endValue').value;
        if (!this.endValue && this.isRange)
            this.endValue = this.max;
        if (!this.stepValue && this._elementRef.nativeElement.attributes.getNamedItem('stepValue'))
            this.stepValue = this._elementRef.nativeElement.attributes.getNamedItem('stepValue').value;
        if (!this.stepValue)
            this.stepValue = 1;
        this.initialStartValue = parseFloat(this.startValue);
        this.initialEndValue = parseFloat(this.endValue);
        // If "id" was not set, create it randomly (8 signs)
        if (!this._elementRef.nativeElement.id) {
            this.id = Math.random().toString(36).slice(2, 10);
            this._elementRef.nativeElement.id = this.id;
        }
        else {
            this.id = this._elementRef.nativeElement.id;
        }
        //
        var needToRefresh = false;
        var styledInstance;
        if (!this._styledDirectives.length) {
            styledInstance = new ng2_styled_directive_1.Ng2StyledDirective(this._elementRef, this._view);
            // this.renderer.setElementAttribute(this._elementRef, 'skin', 'default');
            styledInstance.skin = this.skin || 'default';
            needToRefresh = true;
        }
        else {
            styledInstance = this._styledDirectives.first;
        }
        if (this.resultHandleStyle.length || this.resultRangeRibbonStyle) {
            if (typeof (styledInstance.styleBlock) == 'string') {
                styledInstance.styleBlock = [styledInstance.styleBlock];
            }
            else if (styledInstance.styleBlock == null) {
                styledInstance.styleBlock = [];
            }
            if (this.resultHandleStyle.length) {
                styledInstance.styleBlock = this.resultHandleStyle.concat(styledInstance.styleBlock);
            }
            if (this.resultRangeRibbonStyle) {
                styledInstance.styleBlock.push(".range-ribbon " + this.resultRangeRibbonStyle);
            }
            // styledInstance.styleBlock = this.resultHandleStyle;
            // styledInstance.skin = 'none';
            needToRefresh = true;
        }
        if (needToRefresh)
            styledInstance.ngAfterViewInit();
        this.range = new Range({
            element: this.ribbon.nativeElement,
            min: this.min,
            max: this.max
        });
        if (this.handlers.Start)
            this.valueChanged({}, RangeHandle.Start);
        if (this.handlers.End)
            this.valueChanged({}, RangeHandle.End);
        this.stepX = this.range.calculateStepX(this.stepValue);
    };
    Ng2SliderComponent.prototype.rangeChangedTrigger = function () {
        //this.rangeChangedEvent.emit({start: this.startValue, end: this.endValue});
        this.rangeChangedEvent.emit(this);
    };
    Ng2SliderComponent.prototype.setStartValue = function (v) {
        this.startValue = v;
        this.valueChanged(RangeHandle.Start);
        this.CDR.detectChanges();
        this.CDR.markForCheck();
    };
    Ng2SliderComponent.prototype.setEndValue = function (v) {
        this.endValue = v;
        this.valueChanged(RangeHandle.End);
        this.CDR.detectChanges();
        this.CDR.markForCheck();
    };
    Ng2SliderComponent.prototype.onStopSliding = function (event) {
        this.rangeChangedTrigger();
    };
    // Handling 'onsliding' event from SlideAbleDirective
    Ng2SliderComponent.prototype.onSliding = function (event) {
        var handle = RangeHandle.Both;
        if (event.elementId == this.id + '-left-handle')
            handle = RangeHandle.Start;
        if (event.elementId == this.id + '-right-handle')
            handle = RangeHandle.End;
        // this.refreshInputBox(event.boundingRect, handle);
        this.refreshInputBoxByPercent(event.relativePercentHorisontal, handle);
    };
    Ng2SliderComponent.prototype.initHandlers = function (name, event) {
        // Example of using callback function before redraw
        event.instance.checkXBeforeRedraw = function (x, y) {
            return true;
        };
        this.handlers[name] = event.instance;
        // if (name == 'Start') this.valueChanged({}, RangeHandle.Start);
        // if (name == 'End') this.valueChanged({}, RangeHandle.End);
    };
    Ng2SliderComponent.prototype.convertStyles = function (styleArray) {
        var style = '';
        for (var idx in styleArray) {
            style += idx + ':' + styleArray[idx] + ';';
        }
        if (style != '')
            style = "{" + style + "}";
        return style;
    };
    // create configuration for using skins by "styled" directive
    // Implementation of ISkinable interface
    Ng2SliderComponent.prototype.getStyledConfig = function () {
        var config = {};
        // if (!this.skin) return config;
        /*        this._skinNames.forEach((value) => {
                    config[value] = {
                        'path': `${this._skinDirectory}/${value}.css`
                    }
                });
                for (let idx in this._skins[this.skin]) {
        
                }
        
                if (this._skins[this.skin].band) {
                    config[this.skin][`${this.skin}-band`]
                }*/
        config = this._skins;
        return config;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Ng2SliderComponent.prototype, "min", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Ng2SliderComponent.prototype, "max", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Ng2SliderComponent.prototype, "startValue", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Ng2SliderComponent.prototype, "endValue", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Ng2SliderComponent.prototype, "stepValue", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], Ng2SliderComponent.prototype, "value", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Ng2SliderComponent.prototype, "normalHandlerStyle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Ng2SliderComponent.prototype, "slidingHandlerStyle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Ng2SliderComponent.prototype, "rangeRibbonStyle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Ng2SliderComponent.prototype, "skin", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Ng2SliderComponent.prototype, "styleBlock", void 0);
    __decorate([
        core_1.Output('onRangeChanged'), 
        __metadata('design:type', Object)
    ], Ng2SliderComponent.prototype, "rangeChangedEvent", void 0);
    __decorate([
        core_1.ViewChild('ribbon'), 
        __metadata('design:type', core_1.ElementRef)
    ], Ng2SliderComponent.prototype, "ribbon", void 0);
    __decorate([
        core_1.ViewChild('start'), 
        __metadata('design:type', core_1.ElementRef)
    ], Ng2SliderComponent.prototype, "startRef", void 0);
    __decorate([
        core_1.ViewChild('end'), 
        __metadata('design:type', core_1.ElementRef)
    ], Ng2SliderComponent.prototype, "endRef", void 0);
    __decorate([
        core_1.ViewChild('startInput'), 
        __metadata('design:type', core_1.ElementRef)
    ], Ng2SliderComponent.prototype, "startInputRef", void 0);
    __decorate([
        core_1.ViewChild('endInput'), 
        __metadata('design:type', core_1.ElementRef)
    ], Ng2SliderComponent.prototype, "endInputRef", void 0);
    __decorate([
        core_1.ContentChildren(ng2_styled_directive_1.Ng2StyledDirective), 
        __metadata('design:type', core_1.QueryList)
    ], Ng2SliderComponent.prototype, "_styledDirectives", void 0);
    Ng2SliderComponent = __decorate([
        core_1.Component({
            selector: 'ng2-slider',
            moduleId: module.id,
            templateUrl: './ng2-slider.component.html',
            // template: require('./ng2-slider.component.html'), // For webpack-compatible compiling
            directives: [slideable_directive_1.SlideAbleDirective, ng2_styled_directive_1.Ng2StyledDirective],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [core_1.ChangeDetectorRef, core_1.ElementRef, core_1.ViewContainerRef, core_1.Renderer])
    ], Ng2SliderComponent);
    return Ng2SliderComponent;
}());
exports.Ng2SliderComponent = Ng2SliderComponent;
var Range = (function () {
    function Range(config) {
        this.config = config;
        if (typeof (this.config.min == 'string'))
            this.config.min = parseFloat(this.config.min);
        if (typeof (this.config.max == 'string'))
            this.config.max = parseFloat(this.config.max);
        this.boundingRect = config.element.getBoundingClientRect();
    }
    // Calculate relative handle position (percent) from value
    /**
     * Calculate relative handle position (percent) from value
     *
     * @param value
     * @returns {float}
     */
    Range.prototype.calculatePercentFromValue = function (value) {
        return Math.round(100 * (value - this.config.min) / (this.config.max - this.config.min));
    };
    Range.prototype.calculateXFromValue = function (value) {
        return this.boundingRect.left + Math.round((this.boundingRect.right - this.boundingRect.left) * (value - this.config.min) / (this.config.max - this.config.min));
    };
    // Calculate relative handle position (percent) from his position coordinate
    Range.prototype.calculatePercentFromX = function (x) {
        return Math.round(100 * (x - this.boundingRect.left) / (this.boundingRect.right - this.boundingRect.left));
    };
    // Calculate value from handle position coordinate
    Range.prototype.calculateValueFromX = function (x) {
        return this.config.min + Math.round((this.config.max - this.config.min) * (x - this.boundingRect.left) / (this.boundingRect.right - this.boundingRect.left));
    };
    Range.prototype.calculateStepX = function (step) {
        return step * (this.boundingRect.right - this.boundingRect.left) / (this.config.max - this.config.min);
    };
    Range.prototype.getLeftX = function () {
        return this.boundingRect.left;
    };
    Range.prototype.getRightX = function () {
        return this.boundingRect.right;
    };
    return Range;
}());
exports.Range = Range;
//# sourceMappingURL=ng2-slider.component.js.map