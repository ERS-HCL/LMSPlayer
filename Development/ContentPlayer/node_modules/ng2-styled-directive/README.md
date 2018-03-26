# ng2-styled-directive


Status:
[![GitHub license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)]()


Angular 2 "styled" directive

Demo: [http://bogdan1975.github.io/styled/](http://bogdan1975.github.io/styled/)

* [Dependencies](#dependencies)
* [Install](#install)
* [Usage](#usage)
    - [Attributes](#attributes)
        - [styleBlock](#styleblock---string--string)
        - [stylePath](#stylepath---string)
        - [skin](#skin---string)
    - [Interfaces](#interfaces)
        - [ISkinable](#iskinable)
        - [IStyledConfig](#istyledconfig)
        - [IConfigItem](#iconfigitem)
        
        
# Dependencies

- [Angular 2](https://github.com/angular/angular)   `npm install angular2`
   

# Install 

You can get it on npm.

```shell
npm install ng2-styled-directive
```


# Usage

```html
<div styled styleBlock="{width:50px;height:50px;background:red}">
</div>
```
```html
<div styled stylePath="css/stylesheet.css">
</div>
```
```html
<ng2-component styled skin="modern">
</ng2-component>
```


## Attributes

### `styleBlock` - string | string[]

The value of this attribute will be applied to "styled" DOM-element.
Directive adds unique attribute to element and incapsulates style by this attribute.

### `stylePath` - string
 
### `skin` - string

If 'styled' directive is applied to component that implements `'ISkinable'` interface, you can use skins that setted by `getStyledConfig()` method of this copmonent.
`getStyledConfig()` method must return `IStyledConfig` interface object.

Example:
```typescript
import {Ng2StyledDirective, IStyledConfig, ISkinable} from 'ng2-styled-directive/ng2-styled.directive';

getStyledConfig():IStyledConfig {
    return {
        'default': {
            block: [
                "{width:90%; height: 50px}",
                ".range-ribbon {position: absolute; width: 100%; height: 10px; border: 1px solid #ddd; -webkit-border-radius: 4px; -moz-border-radius: 4px; border-radius: 4px; background: #eee 50% top repeat-x; color: #333; top: 4px;}",
                ".slider-handle {position: absolute; border: 1px solid #ccc; -webkit-border-radius: 4px; -moz-border-radius: 4px; border-radius: 4px; background: #f6f6f6 50% 50% repeat-x; width: 18px; height: 18px; box-sizing: border-box;}",
                ".slider-handle.sliding {border: 1px solid #fbcb09; background: #fdf5ce 50% 50% repeat-x;}"
            ]
        },
        'elegance': {
            block: [
                "{width:90%; height: 50px}",
                ".range-ribbon {position: absolute; width: 100%; height: 3px; background: #ccc; top: 14px;}",
                ".slider-handle {position: absolute; width: 8px; height: 8px; border: 12px solid #a6d8ef; cursor: ew-resize;; background-color: #5082e0; opacity: .7; -webkit-border-radius: 18px; -moz-border-radius: 18px; border-radius: 18px;}",
                ".slider-handle:hover {opacity: 1}",
                ".slider-handle.sliding {opacity: 1}"
            ]
        },
        'black-skin': {
            path: "/assets/css/element/black-skin.min.css"
        }
    }
}
```

If skin named as `'default'` provided by getStyledConfig() method of styled component, it will applied automatically. If you don't want any skin, set `'none'` as skin name.


## Interfaces

### `ISkinable`

```typescript
interface ISkinable {
    getStyledConfig(): IStyledConfig;
}
```




### `IStyledConfig`

```typescript
interface IStyledConfig {
    [index:string]: IConfigItem
}
```




### `IConfigItem`

```typescript
interface IConfigItem {
    path?: string;
    block?: Array<string>|string;
}
```
