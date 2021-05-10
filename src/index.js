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
      conttonInitClass: 'cotton-init',
      cottonMovingClass: 'cotton-moving',
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
    this.scene = document.querySelector(this.params.scene);
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

  // set mouse data
  static setData(scope, type) {
    const el = scope.element;
    const scene = scope.scene;
    const mouseData = scope.params.data;
    const airMode = scope.params.airMode;
    const listener = type ? 'addEventListener' : 'removeEventListener';
    const classHandler = type ? 'add' : 'remove';

    function getMouseMove(e) {
      mouseData.mouseX = airMode ? e.pageX : e.clientX;
      mouseData.mouseY = airMode ? e.pageY : e.clientY;
    }

    scene[listener]('mousemove', getMouseMove);
    
    if (airMode) {
      if (type) mouseData.rect = getRect(el);

      const maxX = window.innerWidth + getRect(el).width / 2;
      const maxY = window.innerHeight + getRect(el).height / 2;

      function getMouseDistance(e) {
        const distanceX = mouseData.mouseX - mouseData.rect.centerX;
        const distanceY = mouseData.mouseY - mouseData.rect.centerY;

        mouseData.distanceX = Math.min(Math.max(parseInt(distanceX), -maxX), maxX);
        mouseData.distanceY = Math.min(Math.max(parseInt(distanceY), -maxY), maxY);
      }

      scene[listener]('mousemove', getMouseDistance);
    }

    if ([...el.classList].indexOf(scope.params.conttonInitClass) > -1) el.classList[classHandler](scope.params.cottonMovingClass);
  }

  // init
  static init(scope) {
    const scene = scope.scene;
    
    if (!scene) return warn('Cannot define a scene which is not exist');
    
    scene.addEventListener('mouseenter', function() { Cotton.setData(scope, true) });
    scene.addEventListener('mouseleave', function() { Cotton.setData(scope, false) });

    scope.move();

    Cotton.bindModelCallback(scope);
  }


  // public methods
  // anmate cotton element
  move() {
    const mouseData = this.params.data;
    const airMode = this.params.airMode;

    this.element.classList.add(this.params.conttonInitClass);

    if (!mouseData.animationFrame) airMode ? airModeAnimation(this) : cottonAnimation(this);
  }

  // stop animation
  stop() {
    const mouseData = this.params.data;

    this.element.classList.remove(this.params.conttonInitClass);
    this.element.classList.remove(this.params.cottonMovingClass);

    cancelAnimationFrame(mouseData.animationFrame);
    mouseData.animationFrame = undefined;
  }

  // update models binding
  updateModels() {
    this.models = document.querySelectorAll(this.params.models);
    Cotton.bindModelCallback(this);
  }
}