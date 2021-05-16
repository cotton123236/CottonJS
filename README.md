![](https://i.imgur.com/THPfqAc.png)
<br>
<center style="color: #ff9c85">Cotton.JS is a JavaScript library that allows you to make a mouse interaction animation easily.</center>
<br>
<center>
<a style="display: inline-block; border: 1px solid #ff9c85; text-align: center; color: #ff9c85; width: 140px; padding: 13px 20px; border-radius: 25px; margin-right: 10px" href="https://cotton123236.github.io/CottonJS/dist/index.html#demos">Demos</a>
<a style="display: inline-block; background-color: #ff9c85; text-align: center; color: #fff; width: 140px; padding: 13px 20px; border-radius: 25px" href="https://cotton123236.github.io/CottonJS/dist/index.html#documentation">Document</a>
</center>
<br>

## Getting Started

### Download

```
import Cotton from 'cotton'
```
#### Manual download
[Download ZIP](https://github.com/cotton123236/CottonJS/archive/refs/heads/main.zip)

<br>

### Installation

#### ES modules
import Cotton.JS in your own project :
```
import Cotton from 'cotton'
```
#### Script tag include
Simply download and include with a script tag :
```
<script src="cotton.min.js"></script>
```
or using CDN :
```
<script src="https://cdn.jsdelivr.net/gh/"></script>
```

<br>

### Basic Usage

#### HTML
Create an element that you would like to animate.
```
<div id="cotton-cursor"></div>
```
#### CSS
Style your element.
>[color=#ff9c85]There is some [rules](https://cotton123236.github.io/CottonJS/dist/index.html#usage) that you need to notice.
```
#cotton-cursor {
  position: fixed;
  z-index: 9;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  pointer-events: none;
  background-color: #f9cabc;
  transform: translate(-20px, -20px);
}
```
#### JavaScript
Initialize Cotton in JavaScript.
```
const cottonCursor = new Cotton('#cotton-cursor')
```
>[color=#ff9c85]See some [demos](https://cotton123236.github.io/CottonJS/dist/index.html#demos).

<br>

## Documentation

### Parameters
>[color=#ff9c85]Kwoning more [details](https://cotton123236.github.io/CottonJS/dist/index.html#parameters) about these parameters.

All available parameters :
```
const cottonCursor = new Cotton('#cotton-cursor', {
    scene: 'body',
    models: '.cotton-model',
    cottonInitClass: 'cotton-init',
    cottonMovingClass: 'cotton-moving',
    cottonActiveClass: 'cotton-active',
    modelsActiveClass: 'model-active',
    speed: 0.125,
    centerMouse: true,
    airMode: {
        resistance: 15,
        reverse: false
    }
})
```

<br>

### Methods
>[color=#ff9c85]Kwoning more [details](https://cotton123236.github.io/CottonJS/dist/index.html#methods) about these methods.

All available methods :
```
const cotton = new Cotton('#cotton-cursor')

// call the method after initialization.
cotton.stop()
cotton.move()
cotton.updateModels()

// call the method in callbacks
const cotton = new Cotton('#cotton-cursor', {
    on: {
        enterModel() {
            this.stop()
            this.move()
            this.updateModels()
        }
    }
})
```

<br>

### Callbacks
>[color=#ff9c85]Kwoning more [details](https://cotton123236.github.io/CottonJS/dist/index.html#callbacks) about these callbacks.

All available callbacks :
```
const cotton = new Cotton('#cotton-cursor', {
    on: {
        enterModel(cotton, model) {},
        leaveModel(cotton, model) {},
        enterScene(cotton, scene) {},
        leaveScene(cotton, scene) {},
    }
})
```

<br>

### Mobile Device
Because there is no mouse on mobile devices, Cotton.JS will automatically detect user device and won't initialize when using mobile.

<br>

## Others

* Visit the [website](https://cotton123236.github.io/CottonJS/dist/index.html)
* Released under the [MIT License](https://github.com/cotton123236/CottonJS/blob/main/LICENSE).
* ©2021 [cotton123236](https://github.com/cotton123236)