import { warn } from './utils/warn'
import { isMobile } from './utils/isMobile'
import { getRectWidth, getRectHeight, getRectTop, getRectLeft } from './utils/getRect'
import { cottonAnimation, airModeAnimation } from './core/animationFrame'
import { bindCallback } from './core/bindCallback'

export default class Cotton {

  constructor(element, options) {
    const defaults = {
      data: {
        mouseX: null,
        mouseY: null,
        distanceX: null,
        distanceY: null,
        x: null,
        y: null,
        dx: null,
        dy: null,
        animationFrame: undefined
      },
      scene: 'body',
      cottonInitClass: 'cotton-init',
      cottonActiveClass: 'cotton-active',
      models: '.cotton-model',
      modelsActiveClass: 'model-active',
      speed: 0.125,
      airMode: false,
      on: {
        modelEnter: null,
        modelLeave: null
      }
    }
    
    this.element = document.querySelector(element);
    this.params = Object.assign({}, defaults, options);
    this.models = document.querySelectorAll(this.params.models);
    
    if (!this.element) return warn('Cannot define a cotton element which is not exist');
    if (this.params.speed > 1 || this.params.speed <= 0) this.params.speed = 0.125;

    if (!isMobile()) Cotton.init(this);
  }

  // private functions
  // callbacks when cotton element enter (leave) models
  static bindModelCallback(scope) {
    if (scope.models.length !== 0) bindCallback(scope);
  }


  // public methods
  // init
  static init(scope) {
    const scene = document.querySelector(scope.params.scene);

    if (!scene) return warn('Cannot define a scene which is not exist');

    scene.addEventListener('mouseenter', function() { scope.move() });
    scene.addEventListener('mouseleave', function() { scope.stop() });

    Cotton.bindModelCallback(scope);
  }

  // anmate cotton element
  move() {
    const el = this.element;
    const params = this.params;
    const mouseData = params.data;
    const airMode = params.airMode;

    el.classList.add(params.cottonInitClass);
    
    document.addEventListener('mousemove', function(e) {
      mouseData.mouseX = e.clientX;
      mouseData.mouseY = e.clientY;
      if (airMode) {
        mouseData.distanceY = Math.floor(mouseData.mouseY - (getRectTop(el) + getRectHeight(el) / 2));
        mouseData.distanceX = Math.floor(mouseData.mouseX - (getRectLeft(el) + getRectWidth(el) / 2));
      }
    });
    
    if (!mouseData.animationFrame) airMode ? airModeAnimation(this) : cottonAnimation(this);
  }

  // stop animation
  stop() {
    const mouseData = this.params.data;
    cancelAnimationFrame(mouseData.animationFrame);
    mouseData.animationFrame = undefined;
    this.element.classList.remove(this.params.cottonInitClass);
  }

  // update models binding
  updateModel() {
    this.models = document.querySelectorAll(this.params.models);
    Cotton.bindModelCallback(this);
  }
}