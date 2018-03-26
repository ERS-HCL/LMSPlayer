/**
 * Created by Targus on 05.05.2016.
 * @author Bogdan Shapoval (targus) <it.targus@gmail.com>
 */
import { ElementRef, ViewContainerRef } from '@angular/core';
export interface IConfigItem {
    path?: string;
    block?: Array<string> | string;
}
export interface IStyledConfig {
    [index: string]: IConfigItem;
}
export interface ISkinable {
    getStyledConfig(): IStyledConfig;
}
export declare class Ng2StyledDirective {
    private el;
    private _view;
    stylePath: string;
    styleBlock: Array<string> | string;
    skin: string;
    private _config;
    constructor(el: ElementRef, _view: ViewContainerRef);
    ngAfterViewInit(): void;
    setStyleBlock(style: any): void;
    getIdentityAttribute(): any;
    setArrayStylesForElement(styles: Array<string>): void;
    setStyleForElement(styles: string | Array<string>): void;
    setStylePath(stylePath: string): void;
}
