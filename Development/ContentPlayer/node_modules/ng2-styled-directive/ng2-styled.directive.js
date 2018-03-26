/**
 * Created by Targus on 05.05.2016.
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
var core_1 = require('@angular/core');
var Ng2StyledDirective = (function () {
    function Ng2StyledDirective(el, _view) {
        this.el = el;
        this._view = _view;
        this.stylePath = null;
        this.styleBlock = null;
        this._config = {};
    }
    Ng2StyledDirective.prototype.ngAfterViewInit = function () {
        // get component instance in case directive was applied to component
        var component = this._view._element.component;
        // check for skin settings method in parent component
        if (typeof (component) == 'object' && typeof (component.getStyledConfig) == 'function' && this.skin != 'none') {
            this._config = component.getStyledConfig();
        }
        if (this.skin != 'none') {
            if (!this.skin || !this._config[this.skin])
                this.skin = 'default';
            if (this._config[this.skin] && typeof (this._config[this.skin].path) != 'undefined' && this._config[this.skin].path) {
                this.setStylePath(this._config[this.skin].path);
            }
        }
        if (this.stylePath) {
            this.setStylePath(this.stylePath);
        }
        var block = [];
        if (this.skin != 'none') {
            if (!this.skin || !this._config[this.skin])
                this.skin = 'default';
            if (this._config[this.skin] && typeof (this._config[this.skin].block) != 'undefined' && this._config[this.skin].block) {
                var style = this._config[this.skin].block;
                if (typeof (style) == 'object' && style instanceof Array) {
                    block = style;
                }
                else if (typeof (style) == 'string') {
                    block.push(style);
                }
            }
        }
        if (this.styleBlock) {
            var style = this.styleBlock;
            if (typeof (style) == 'object' && style instanceof Array) {
                block = block.concat(style);
            }
            else if (typeof (style) == 'string') {
                block.push(style);
            }
        }
        if (block.length) {
            this.setStyleBlock(block);
        }
    };
    Ng2StyledDirective.prototype.setStyleBlock = function (style) {
        if (typeof (style) == 'string') {
            this.setStyleForElement(style);
        }
        if (typeof (style) == 'object' && style instanceof Array) {
            this.setStyleForElement(style);
        }
    };
    Ng2StyledDirective.prototype.getIdentityAttribute = function () {
        for (var _i = 0, _a = this.el.nativeElement.attributes; _i < _a.length; _i++) {
            var attr = _a[_i];
            if (/^_nghost/.test(attr.name) || /^_ngcontent/.test(attr.name) || /^_styled/.test(attr.name)) {
                return attr.name;
            }
        }
        return false;
    };
    Ng2StyledDirective.prototype.setArrayStylesForElement = function (styles) {
        for (var _i = 0, styles_1 = styles; _i < styles_1.length; _i++) {
            var style = styles_1[_i];
            this.setStyleForElement(style);
        }
    };
    Ng2StyledDirective.prototype.setStyleForElement = function (styles) {
        // get styling encapsulation attribute
        var idAttr = this.getIdentityAttribute();
        // create own encapsulation attribute, if not exist
        if (!idAttr) {
            idAttr = '_styled-' + Math.random().toString(36).slice(2, 6);
            this.el.nativeElement.setAttribute(idAttr, '');
        }
        // get or create <style id="styled-directive-block"> element
        var styleElList = document.querySelectorAll('style#styled-directive-block');
        var styleEl;
        if (!styleElList.length) {
            styleEl = document.createElement('style');
            styleEl.type = 'text/css';
            styleEl.id = 'styled-directive-block';
        }
        else {
            styleEl = styleElList[0];
        }
        // ctreating css style block for current element
        var stylesArray = (typeof (styles) == 'string') ? [styles] : styles;
        var styleString = '';
        for (var _i = 0, stylesArray_1 = stylesArray; _i < stylesArray_1.length; _i++) {
            var style = stylesArray_1[_i];
            if (!style)
                continue;
            if (styleString != '')
                styleString += "  \n";
            if (style[0] == '<') {
                style = style.slice(1);
            }
            else {
                style = ' ' + style;
            }
            styleString += "[" + idAttr + "]" + style;
        }
        // add style to <style> element
        if (styleString)
            styleEl.innerHTML += "  \n" + styleString;
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(styleEl);
    };
    Ng2StyledDirective.prototype.setStylePath = function (stylePath) {
        // checking stylePath for existing
        for (var i = 0; i < document.styleSheets.length; i++) {
            if (document.styleSheets[i].href == stylePath) {
                return;
            }
        }
        // fix
        if (document.querySelectorAll("head link[href=\"" + stylePath + "\"]").length)
            return;
        var link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = "" + stylePath;
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(link);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Ng2StyledDirective.prototype, "stylePath", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Ng2StyledDirective.prototype, "styleBlock", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Ng2StyledDirective.prototype, "skin", void 0);
    Ng2StyledDirective = __decorate([
        core_1.Directive({
            selector: '[styled]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.ViewContainerRef])
    ], Ng2StyledDirective);
    return Ng2StyledDirective;
}());
exports.Ng2StyledDirective = Ng2StyledDirective;
//# sourceMappingURL=ng2-styled.directive.js.map