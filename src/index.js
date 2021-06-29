import { warn } from './utils/warn'
import { isMobile } from './utils/isMobile'
import { getRect } from './utils/getRect'
import { cottonAnimation, airModeAnimation } from './core/animationFrame'
import { bindModelCallbacks } from './core/bindCallbacks'

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
      centerMouse: true,
      speed: 0.125,
      airMode: false,
      on: {
        enterModel: null,
        leaveModel: null,
        enterScene: null,
        leaveScene: null,
        cottonMove: null
      }
    }

    this.element = element instanceof Element ? element : document.querySelector(element);
    this.params = Object.assign({}, defaults, options);
    this.scene = this.params.scene instanceof Element ? this.params.scene : document.querySelector(this.params.scene);
    this.models = NodeList.prototype.isPrototypeOf(this.params.models) ? this.params.models : document.querySelectorAll(this.params.models);
    this.enterModelHandler = this.enterModelHandler.bind(this);
    this.leaveModelHandler = this.leaveModelHandler.bind(this);
    
    if (!this.element) return warn('Cannot define a cotton element which is not exist');
    if (!this.scene) return warn('Cannot define a scene which is not exist');
    
    if (this.params.speed > 1 || this.params.speed <= 0) this.params.speed = 0.125;
    if (this.params.airMode) {
      const airMode = this.params.airMode;
      const airDefaults = { resistance: 15, reverse: false, alive: false }
      if (typeof airMode !== 'object' || Array.isArray(airMode)) this.params.airMode = airDefaults;
      else this.params.airMode = Object.assign(airDefaults, airMode);
      if (airMode.resistance < 1 || airMode.resistance > 100) airMode.resistance = 15;
    }

    if (!isMobile()) Cotton.init(this);
  }


  // private functions
  // get mouse data
  static getMouseData(scope) {
    const el = scope.element;
    const scene = scope.scene;
    const params = scope.params
    const mouseData = params.data;
    const airMode = params.airMode;

    scene.addEventListener('mousemove', function(e) {
      mouseData.mouseX = airMode ? e.pageX : e.clientX;
      mouseData.mouseY = airMode ? e.pageY : e.clientY;

      if ([...el.classList].indexOf(params.conttonInitClass) > -1) el.classList.add(params.cottonMovingClass);
      if (params.on.cottonMove && typeof params.on.cottonMove === 'function') params.on.cottonMove.call(scope, el, e);
    });

    if (airMode) {
      if (!airMode.alive) {
        mouseData.rect = getRect(el);
        window.addEventListener('resize', function () { mouseData.rect = getRect(el) });
      }

      scene.addEventListener('mousemove', function() {
        if (airMode.alive) mouseData.rect = getRect(el);
        const maxX = window.innerWidth + mouseData.rect.width / 2;
        const maxY = window.innerHeight + mouseData.rect.height / 2;
        const distanceX = mouseData.mouseX - mouseData.rect.centerX;
        const distanceY = mouseData.mouseY - mouseData.rect.centerY;

        mouseData.distanceX = Math.min(Math.max(parseInt(distanceX), -maxX), maxX);
        mouseData.distanceY = Math.min(Math.max(parseInt(distanceY), -maxY), maxY);
      });
    }
  }
  
  // init
  static init(scope) {
    const el = scope.element;
    const params = scope.params;
    const scene = scope.scene;

    scene.addEventListener('mouseenter', function(e) {
      if (params.on.enterScene && typeof params.on.enterScene === 'function') params.on.enterScene.call(scope, el, scene, e);
    });
    scene.addEventListener('mouseleave', function(e) {
      el.classList.remove(params.cottonMovingClass);
      if (params.on.leaveScene && typeof params.on.leaveScene === 'function') params.on.leaveScene.call(scope, el, scene, e);
    });

    Cotton.getMouseData(scope, true)

    scope.move();

    bindModelCallbacks(scope, true);
  }


  // self functions
  // function for enterModel
  enterModelHandler(e) {
    const el = this.element;
    const params = this.params;
  
    if (params.on.enterModel && typeof params.on.enterModel === 'function') params.on.enterModel.call(this, el, e.target, e);
    el.classList.add(params.cottonActiveClass);
    e.target.classList.add(params.modelsActiveClass);
  }

  // function for leaveModel
  leaveModelHandler(e) {
    const el = this.element;
    const params = this.params;
  
    if (params.on.leaveModel && typeof params.on.leaveModel === 'function') params.on.leaveModel.call(this, el, e.target, e);
    el.classList.remove(params.cottonActiveClass);
    e.target.classList.remove(params.modelsActiveClass);
  }


  // public methods
  // start animation
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
    bindModelCallbacks(this, false);
  }
}