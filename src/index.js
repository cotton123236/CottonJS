import { isMobile } from './utils/isMobile'
import { getRectWidth, getRectHeight, getRectTop, getRectLeft } from './utils/getRect'
import { warn } from './utils/warn'
import { bindCallback } from './utils/bindCallback'

export default class Cotton {

  constructor(element, options) {
    const defaults = {
      data: {
        mouseX: null,
        mouseY: null,
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
    
    if (!this.element) return warn('Cannot define a element which is not exist');
    if (this.params.speed > 1 || this.params.speed <= 0) return warn('The speed property must be > 0 or <= 1');
    if (this.params.airMode.resistance && this.params.airMode.resistance < 5) return warn('The resistance property must be >= 5');

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

    el.classList.add(params.cottonInitClass);
    
    document.addEventListener('mousemove', function(e) {
      mouseData.mouseX = e.clientX || e.pageX;
      mouseData.mouseY = e.clientY || e.pageY;
    });
    
    function animateMouse() {
      
      if (!mouseData.x || !mouseData.y) {
        mouseData.x = mouseData.mouseX;
        mouseData.y = mouseData.mouseY;
      } else {
        mouseData.dx = (mouseData.mouseX - mouseData.x) * params.speed;
        mouseData.dy = (mouseData.mouseY - mouseData.y) * params.speed;
        if (Math.abs(mouseData.dx) + Math.abs(mouseData.dy) < 0.1) {
          mouseData.x = mouseData.mouseX;
          mouseData.y = mouseData.mouseY;
        } else {
          mouseData.x += mouseData.dx;
          mouseData.y += mouseData.dy;
        }
      }
      
      mouseData.animationFrame = requestAnimationFrame(animateMouse);

      if (params.airMode) {
        const airMode = params.airMode;

        if (typeof airMode !== 'object' || Array.isArray(airMode)) airMode = { resistance: 15, reverse: false }

        const distanceX = airMode.reverse ? - (mouseData.x - (getRectLeft(el) + getRectWidth(el) / 2)) : (mouseData.x - (getRectLeft(el) + getRectWidth(el) / 2));
        const distanceY = airMode.reverse ? - (mouseData.y - (getRectTop(el) + getRectHeight(el) / 2)) : (mouseData.y - (getRectTop(el) + getRectHeight(el) / 2));

        el.style.transform = `translate(${distanceX / airMode.resistance}px, ${distanceY / airMode.resistance}px)`
      }

      else el.style.transform = `translate(calc(-50% + ${mouseData.x}px), calc(-50% + ${mouseData.y}px))`
    }
    
    if (!mouseData.animationFrame) animateMouse();
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