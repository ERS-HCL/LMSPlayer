/**
 * Created by Targus on 21.03.2016.
 * @author Bogdan Shapoval (targus) <it.targus@gmail.com>
 */
import { ElementRef, ChangeDetectorRef, EventEmitter, QueryList, ViewContainerRef, Renderer } from '@angular/core';
import { IEventSlideAble } from 'ng2-slideable-directive/slideable.directive';
import { Ng2StyledDirective, IStyledConfig, ISkinable } from 'ng2-styled-directive/ng2-styled.directive';
export declare enum RangeHandle {
    Start = 0,
    End = 1,
    Both = 2,
}
export declare class Ng2SliderComponent implements ISkinable {
    private CDR;
    private _elementRef;
    private _view;
    private renderer;
    min: any;
    max: any;
    startValue: any;
    endValue: any;
    stepValue: any;
    value: string;
    normalHandlerStyle: Object;
    slidingHandlerStyle: Object;
    rangeRibbonStyle: Object | string;
    skin: string;
    styleBlock: string;
    rangeChangedEvent: EventEmitter<{}>;
    ribbon: ElementRef;
    startRef: ElementRef;
    endRef: ElementRef;
    startInputRef: ElementRef;
    endInputRef: ElementRef;
    _styledDirectives: QueryList<Ng2StyledDirective>;
    private range;
    private id;
    private isRange;
    private _skins;
    private handlers;
    private initialStartValue;
    private initialEndValue;
    private initNormalHandlerStyle;
    private initSlidingHandlerStyle;
    private initRangeRibbonStyle;
    private resultNormalHandlerStyle;
    private resultSlidingHandlerStyle;
    private resultRangeRibbonStyle;
    private resultHandleStyle;
    instance: Ng2SliderComponent;
    private stepX;
    constructor(CDR: ChangeDetectorRef, _elementRef: ElementRef, _view: ViewContainerRef, renderer: Renderer);
    ngOnInit(): void;
    refreshInputBox(boundingRect: any, handle: RangeHandle): any;
    refreshInputBoxByPercent(percent: any, handle: RangeHandle): string;
    calculatePrecision(x: any): number;
    /**
     * Set new handle position when value was changed in input-box
     * @param handle
     */
    valueChanged(el: any, handle?: RangeHandle): void;
    ngAfterViewInit(): void;
    rangeChangedTrigger(): void;
    setStartValue(v: any): void;
    setEndValue(v: any): void;
    onStopSliding(event: IEventSlideAble): void;
    onSliding(event: IEventSlideAble): void;
    initHandlers(name: string, event: IEventSlideAble): void;
    convertStyles(styleArray: Object): string;
    getStyledConfig(): IStyledConfig;
}
export declare class Range {
    private config;
    private boundingRect;
    constructor(config: {
        element: any;
        min: any;
        max: any;
    });
    /**
     * Calculate relative handle position (percent) from value
     *
     * @param value
     * @returns {float}
     */
    calculatePercentFromValue(value: number): number;
    calculateXFromValue(value: number): number;
    calculatePercentFromX(x: number): number;
    calculateValueFromX(x: number): any;
    calculateStepX(step: any): number;
    getLeftX(): number;
    getRightX(): number;
}
