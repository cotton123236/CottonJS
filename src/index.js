import { warn } from './utils/warn'
import { isMobile } from './utils/isMobile'
import { getRect } from './utils/getRect'
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
  
    if (this.params.airMode) {
      const airMode = this.params.airMode;
      const airDefaults = { resistance: 15, reverse: false }
      if (typeof airMode !== 'object' || Array.isArray(airMode)) this.params.airMode = airDefaults;
      else this.params.airMode = Object.assign(airDefaults, airMode);
      if (airMode.resistance < 1 || airMode.resistance > 100) airMode.resistance = 15;
    }

    if (!isMobile()) Cotton.init(this);
  }

  // private functions
  // callbacks when cotton element enter (leave) models
  static bindModelCallback(scope) {
    if (scope.models.length !== 0) bindCallback(scope);
  }

  // init
  static init(scope) {
    
    const scene = document.querySelector(scope.params.scene);
    
    if (!scene) return warn('Cannot define a scene which is not exist');
    
    scene.addEventListener('mouseenter', function() { scope.move() });
    scene.addEventListener('mouseleave', function() { scope.stop() });

    Cotton.bindModelCallback(scope);
  }

  // set mouse data
  static setData(scope, type) {
    const el = scope.element;
    const mouseData = scope.params.data;
    const airMode = scope.params.airMode;
    const listener = type ? 'addEventListener' : 'removeEventListener';

    function getMouseMove(e) {
      mouseData.mouseX = airMode ? e.pageX : e.clientX;
      mouseData.mouseY = airMode ? e.pageY : e.clientY;
    }

    window[listener]('mousemove', getMouseMove);
    
    if (airMode) {
      if (type) mouseData.rect = getRect(el);

      const maxX = window.innerWidth + getRect(el).width / 2;
      const maxY = window.innerHeight + getRect(el).height / 2;

      function getMouseDistance(e) {
        const distanceX = mouseData.mouseX - mouseData.rect.centerX;
        const distanceY = mouseData.mouseY - mouseData.rect.centerY;

        if (distanceX > maxX) mouseData.distanceX = maxX;
        else if (distanceX < -maxX)mouseData.distanceX = -maxX;
        else mouseData.distanceX = distanceX;

        if (distanceY > maxY) mouseData.distanceY = maxY;
        else if (distanceY < -maxY)mouseData.distanceY = -maxY;
        else mouseData.distanceY = distanceY;
      }

      window[listener]('mousemove', getMouseDistance);
    }
  }


  // public methods
  // anmate cotton element
  move() {
    const mouseData = this.params.data;
    const airMode = this.params.airMode;

    Cotton.setData(this, true);

    this.element.classList.add(this.params.cottonInitClass);

    if (!mouseData.animationFrame) airMode ? airModeAnimation(this) : cottonAnimation(this);
  }

  // stop animation
  stop() {
    const mouseData = this.params.data;

    Cotton.setData(this, false);

    this.element.classList.remove(this.params.cottonInitClass);

    cancelAnimationFrame(mouseData.animationFrame);
    mouseData.animationFrame = undefined;
  }

  // update models binding
  updateModel() {
    this.models = document.querySelectorAll(this.params.models);
    Cotton.bindModelCallback(this);
  }
}