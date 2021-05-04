(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Cotton = factory());
}(this, (function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var Cotton = /*#__PURE__*/function () {
    function Cotton(element, options) {
      _classCallCheck(this, Cotton);

      var defaults = {
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
      };
      this.element = document.querySelector(element);
      this.params = Object.assign({}, defaults, options);
      this.models = document.querySelectorAll(this.params.models);
      this.init();
    } // private functions
    // get target width


    _createClass(Cotton, [{
      key: "init",
      value: // public methods
      // init
      function init() {
        if (!this.element) return console.error("This element is not defined");
        if (this.params.speed > 1 || this.params.speed <= 0) return console.error("The speed property must be > 0 or <= 1");
        this.move();
        Cotton.bindModelCallback(this);
      } // anmate cotton element

    }, {
      key: "move",
      value: function move() {
        var el = this.element;
        var params = this.params;
        var mouseData = params.data;
        document.addEventListener('mousemove', function (e) {
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
          el.style.top = "".concat(mouseData.y, "px");
          el.style.left = "".concat(mouseData.x, "px");
          el.style.position = 'absolute';
          el.style.marginLeft = "".concat(-(Cotton.getElementWidth(el) / 2), "px");
          el.style.marginTop = "".concat(-(Cotton.getElementHeight(el) / 2), "px");
        }

        if (!mouseData.animationFrame) animateMouse();
      } // stop animation

    }, {
      key: "stop",
      value: function stop() {
        var mouseData = this.params.data;
        cancelAnimationFrame(mouseData.animationFrame);
        mouseData.animationFrame = undefined;
      } // update models binding

    }, {
      key: "updateModel",
      value: function updateModel() {
        this.models = document.querySelectorAll(this.params.models);
        Cotton.bindModelCallback(this);
      }
    }], [{
      key: "getElementWidth",
      value: function getElementWidth(target) {
        return target.getBoundingClientRect().width;
      } // get target height

    }, {
      key: "getElementHeight",
      value: function getElementHeight(target) {
        return target.getBoundingClientRect().height;
      } // callbacks when cotton element enter (leave) models

    }, {
      key: "bindModelCallback",
      value: function bindModelCallback(scope) {
        var element = scope.element;
        var models = scope.models;
        var params = scope.params;
        models.forEach(function (item) {
          if (item.isBound) return;
          item.isBound = true;
          item.addEventListener('mouseenter', function () {
            if (params.on.modelEnter && typeof params.on.modelEnter === 'function') params.on.modelEnter.call(scope, element, this);
            element.classList.add(params.cottonActiveClass.replace('.', ''));
            this.classList.add(params.modelsActiveClass.replace('.', ''));
          });
          item.addEventListener('mouseleave', function () {
            if (params.on.modelLeave && typeof params.on.modelLeave === 'function') params.on.modelLeave.call(scope, element, this);
            element.classList.remove(params.cottonActiveClass.replace('.', ''));
            this.classList.remove(params.modelsActiveClass.replace('.', ''));
          });
        });
      }
    }]);

    return Cotton;
  }();

  return Cotton;

})));
