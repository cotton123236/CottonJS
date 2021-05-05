import { mobileDetecter } from './utils/mobileDetecter'
import { getRectWidth, getRectHeight } from './utils/rectGetter'
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
      speed: 0.125,
      cottonActiveClass: 'cotton-active',
      models: '.cotton-model',
      modelsActiveClass: 'model-active',
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

    if (!Cotton.isMobile()) this.init();
  }

  // private functions
  // detect is mobile or not
  static isMobile() {
    return mobileDetecter();
  }

  // get target width
  static getElementWidth(target) {
    return getRectWidth(target);
  }

  // get target height
  static getElementHeight(target) {
    return getRectHeight(target);
  }

  // callbacks when cotton element enter (leave) models
  static bindModelCallback(scope) {
    if (scope.models.length !== 0) return bindCallback(scope);
  }

  // public methods
  // init
  init() {
    this.move();
    Cotton.bindModelCallback(this);
  }

  // anmate cotton element
  move() {
    const el = this.element;
    const params = this.params;
    const mouseData = params.data;
    
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
      
      el.style.top = `${mouseData.y}px`;
      el.style.left = `${mouseData.x}px`;
      el.style.position = 'absolute';
      el.style.marginLeft = `${ - (Cotton.getElementWidth(el) / 2) }px`;
      el.style.marginTop = `${ - (Cotton.getElementHeight(el) / 2) }px`;
    }
    
    if (!mouseData.animationFrame) animateMouse();
  }

  // stop animation
  stop() {
    const mouseData = this.params.data;
    cancelAnimationFrame(mouseData.animationFrame);
    mouseData.animationFrame = undefined;
  }

  // update models binding
  updateModel() {
    this.models = document.querySelectorAll(this.params.models);
    Cotton.bindModelCallback(this);
  }
}