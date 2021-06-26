<p align="center">
<a href="https://cotton123236.github.io/CottonJS/dist/index.html">
  <img src="https://i.imgur.com/Fzqwbo7.png" />
</a>
</p>
<p align="center">Cotton.JS is a JavaScript library that allows you to make a mouse interaction animation easily.</p>
<br>
<p align="center">
<a href="https://cotton123236.github.io/CottonJS/dist/index.html#demos">
  <img src="https://i.imgur.com/7mwrasy.png" width="140" />
</a>
<a href="https://cotton123236.github.io/CottonJS/dist/index.html#documentation">
  <img src="https://i.imgur.com/IJw175G.png" width="140" />
</a>
</p>

<br>

## Getting Started

### Download

```
npm install cottonjs
```
#### Manual download
[Download ZIP](https://github.com/cotton123236/CottonJS/archive/refs/heads/main.zip)

<br>

### Installation

#### ES modules
import Cotton.JS in your own project :
```js
import Cotton from 'cottonjs'
```
#### Script tag include
Simply download and include with a script tag :
```html
<script src="cotton.min.js"></script>
```
or using CDN :
```html
<script src="https://cdn.jsdelivr.net/gh/cotton123236/cottonjs@latest/lib/cotton.min.js"></script>
```

<br>

### Basic Usage

#### HTML
Create an element that you would like to animate.
```html
<div id="cotton-cursor"></div>
```
#### CSS
Style your element.
>There is some [rules](https://cotton123236.github.io/CottonJS/dist/index.html#usage) that you need to notice.
```css
#cotton-cursor {
  position: fixed;
  top: 0;
  left: 0;
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
```js
const cottonCursor = new Cotton('#cotton-cursor')
```
>See some [demos](https://cotton123236.github.io/CottonJS/dist/index.html#demos).

<br>

## Documentation

### Parameters
>Knowing more [details](https://cotton123236.github.io/CottonJS/dist/index.html#parameters) about these parameters.

All available parameters :
```js
const cottonCursor = new Cotton('#cotton-cursor', {
    scene: 'body',  // element
    models: '.cotton-model',  //elements
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
>Knowing more [details](https://cotton123236.github.io/CottonJS/dist/index.html#methods) about these methods.

All available methods :
```js
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
>Knowing more [details](https://cotton123236.github.io/CottonJS/dist/index.html#callbacks) about these callbacks.

All available callbacks :
```js
const cotton = new Cotton('#cotton-cursor', {
    on: {
        // callbacks defined on here.
        enterModel(cotton, model, event) {},
        leaveModel(cotton, model, event) {},
        enterScene(cotton, scene, event) {},
        leaveScene(cotton, scene, event) {},
        cottonMove(cotton, event) {}
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