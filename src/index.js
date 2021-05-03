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

    this.init();
  }

  // private functions
  // get target width
  static getElementWidth(target) {
    return target.getBoundingClientRect().width;
  }

  // get target height
  static getElementHeight(target) {
    return target.getBoundingClientRect().height;
  }

  // callbacks when cotton element enter (leave) models
  static bindModelCallback(scope) {
    const element = scope.element;
    const models = scope.models;
    const params = scope.params;

    models.forEach((item) => {
      if (item.isBound) return;
      item.isBound = true;
      item.addEventListener('mouseenter', function() {
        if (params.on.modelEnter && typeof params.on.modelEnter === 'function') params.on.modelEnter.call(scope, element, this);
        element.classList.add(params.cottonActiveClass.replace('.', ''));
        this.classList.add(params.modelsActiveClass.replace('.', ''));
      });
      item.addEventListener('mouseleave', function() {
        if (params.on.modelLeave && typeof params.on.modelLeave === 'function') params.on.modelLeave.call(scope, element, this);
        element.classList.remove(params.cottonActiveClass.replace('.', ''));
        this.classList.remove(params.modelsActiveClass.replace('.', ''));
      });
    })
  }

  // public methods
  // init
  init() {
    if (!this.element) return console.error(`This element is not defined`);
    if (this.params.speed > 1 || this.params.speed <= 0) return console.error(`The speed property must be > 0 or <= 1`);

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