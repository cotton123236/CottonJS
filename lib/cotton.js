(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Cotton = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

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

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function warn(msg) {
    console.error("[Cotton warn]: ".concat(msg));
  }

  function isMobile() {
    var isMobile = false;
    var userAgent = navigator.userAgent;
    isMobile = userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1;
    isMobile = userAgent.indexOf('Mac') > -1 && 'ontouchend' in document;
    return isMobile;
  }

  function getRect(element) {
    var rect = element.getBoundingClientRect();
    var body = document.body.getBoundingClientRect();
    return {
      width: rect.width,
      height: rect.height,
      centerX: rect.left - body.left + rect.width / 2 - getTransformX(element),
      centerY: rect.top - body.top + rect.height / 2 - getTransformY(element)
    };
  }
  function getTransformX(obj) {
    var style = getComputedStyle(obj),
        transform = style.transform;
    var mat = transform.match(/^matrix3d\((.+)\)$/);
    if (mat) return parseFloat(mat[1].split(', ')[12]);
    mat = transform.match(/^matrix\((.+)\)$/);
    return mat ? parseFloat(mat[1].split(', ')[4]) : 0;
  }
  function getTransformY(obj) {
    var style = getComputedStyle(obj),
        transform = style.transform;
    var mat = transform.match(/^matrix3d\((.+)\)$/);
    if (mat) return parseFloat(mat[1].split(', ')[13]);
    mat = transform.match(/^matrix\((.+)\)$/);
    return mat ? parseFloat(mat[1].split(', ')[5]) : 0;
  }

  function cottonAnimation(scope) {
    var el = scope.element;
    var params = scope.params;
    var mouseData = params.data;

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

    mouseData.animationFrame = requestAnimationFrame(function () {
      cottonAnimation(scope);
    });
    params.centerMouse ? el.style.transform = "translate(calc(-50% + ".concat(mouseData.x, "px), calc(-50% + ").concat(mouseData.y, "px))") : el.style.transform = "translate(".concat(mouseData.x, "px, ").concat(mouseData.y, "px)");
  }
  function airModeAnimation(scope) {
    var el = scope.element;
    var params = scope.params;
    var mouseData = params.data;
    var airMode = params.airMode;

    if (!mouseData.distanceX || !mouseData.distanceY) {
      mouseData.x = mouseData.distanceX;
      mouseData.y = mouseData.distanceY;
    } else {
      mouseData.dx = (mouseData.distanceX - mouseData.x) * params.speed;
      mouseData.dy = (mouseData.distanceY - mouseData.y) * params.speed;

      if (Math.abs(mouseData.dx) + Math.abs(mouseData.dy) < 0.1) {
        mouseData.x = mouseData.distanceX;
        mouseData.y = mouseData.distanceY;
      } else {
        mouseData.x += mouseData.dx;
        mouseData.y += mouseData.dy;
      }
    }

    mouseData.animationFrame = requestAnimationFrame(function () {
      airModeAnimation(scope);
    });
    var airX = airMode.reverse ? -mouseData.x : mouseData.x;
    var airY = airMode.reverse ? -mouseData.y : mouseData.y;
    var originX = typeof mouseData.transformX === 'number' ? mouseData.transformX + 'px' : mouseData.transformX;
    var originY = typeof mouseData.transformY === 'number' ? mouseData.transformY + 'px' : mouseData.transformY;
    var transformX = mouseData.transformX ? "calc(".concat(originX, " + ").concat(roundToTwo(airX / airMode.resistance), "px)") : "".concat(roundToTwo(airX / airMode.resistance), "px");
    var transformY = mouseData.transformY ? "calc(".concat(originY, " + ").concat(roundToTwo(airY / airMode.resistance), "px)") : "".concat(roundToTwo(airY / airMode.resistance), "px");
    el.style.transform = "translate(".concat(transformX, ", ").concat(transformY, ")");
  }

  var roundToTwo = function roundToTwo(num) {
    return Math.round((num + Number.EPSILON) * 100) / 100;
  };

  function bindModelCallbacks(scope, init) {
    if (scope.models.length === 0) return;
    var models = scope.models;

    if (init) {
      models.forEach(function (item) {
        item.addEventListener('mouseenter', scope.enterModelHandler);
        item.addEventListener('mouseleave', scope.leaveModelHandler);
      });
    } else {
      models.forEach(function (item) {
        item.removeEventListener('mouseenter', scope.enterModelHandler);
        item.removeEventListener('mouseleave', scope.leaveModelHandler);
      });
      var newModels = document.querySelectorAll(scope.params.models);
      newModels.forEach(function (item) {
        item.addEventListener('mouseenter', scope.enterModelHandler);
        item.addEventListener('mouseleave', scope.leaveModelHandler);
      });
      scope.models = newModels;
    }
  }

  var Cotton = /*#__PURE__*/function () {
    function Cotton(element, options) {
      _classCallCheck(this, Cotton);

      var defaults = {
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
      };
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
        var airMode = this.params.airMode;
        var airDefaults = {
          resistance: 15,
          reverse: false,
          alive: false
        };
        if (_typeof(airMode) !== 'object' || Array.isArray(airMode)) this.params.airMode = airDefaults;else this.params.airMode = Object.assign(airDefaults, airMode);
        if (airMode.resistance < 1 || airMode.resistance > 100) airMode.resistance = 15;
      }

      if (!isMobile()) Cotton.init(this);
    } // private functions
    // get mouse data


    _createClass(Cotton, [{
      key: "enterModelHandler",
      value: // self functions
      // function for enterModel
      function enterModelHandler(e) {
        var el = this.element;
        var params = this.params;
        if (params.on.enterModel && typeof params.on.enterModel === 'function') params.on.enterModel.call(this, el, e.target, e);
        el.classList.add(params.cottonActiveClass);
        e.target.classList.add(params.modelsActiveClass);
      } // function for leaveModel

    }, {
      key: "leaveModelHandler",
      value: function leaveModelHandler(e) {
        var el = this.element;
        var params = this.params;
        if (params.on.leaveModel && typeof params.on.leaveModel === 'function') params.on.leaveModel.call(this, el, e.target, e);
        el.classList.remove(params.cottonActiveClass);
        e.target.classList.remove(params.modelsActiveClass);
      } // public methods
      // start animation

    }, {
      key: "move",
      value: function move() {
        var mouseData = this.params.data;
        var airMode = this.params.airMode;
        this.element.classList.add(this.params.conttonInitClass);
        if (!mouseData.animationFrame) airMode ? airModeAnimation(this) : cottonAnimation(this);
      } // stop animation

    }, {
      key: "stop",
      value: function stop() {
        var mouseData = this.params.data;
        this.element.classList.remove(this.params.conttonInitClass);
        this.element.classList.remove(this.params.cottonMovingClass);
        cancelAnimationFrame(mouseData.animationFrame);
        mouseData.animationFrame = undefined;
      } // update models binding

    }, {
      key: "updateModels",
      value: function updateModels() {
        bindModelCallbacks(this, false);
      }
    }], [{
      key: "getMouseData",
      value: function getMouseData(scope) {
        var el = scope.element;
        var scene = scope.scene;
        var params = scope.params;
        var mouseData = params.data;
        var airMode = params.airMode;
        scene.addEventListener('mousemove', function (e) {
          mouseData.mouseX = airMode ? e.pageX : e.clientX;
          mouseData.mouseY = airMode ? e.pageY : e.clientY;
          if (_toConsumableArray(el.classList).indexOf(params.conttonInitClass) > -1) el.classList.add(params.cottonMovingClass);
          if (params.on.cottonMove && typeof params.on.cottonMove === 'function') params.on.cottonMove.call(scope, el, e);
        });

        if (airMode) {
          if (!airMode.alive) {
            mouseData.rect = getRect(el);
            mouseData.transformX = getTransformX(el);
            mouseData.transformY = getTransformY(el);
            window.addEventListener('resize', function () {
              mouseData.rect = getRect(el);
            });
          }

          scene.addEventListener('mousemove', function () {
            if (airMode.alive) mouseData.rect = getRect(el);
            var maxX = window.innerWidth + mouseData.rect.width / 2;
            var maxY = window.innerHeight + mouseData.rect.height / 2;
            var distanceX = mouseData.mouseX - mouseData.rect.centerX;
            var distanceY = mouseData.mouseY - mouseData.rect.centerY;
            mouseData.distanceX = Math.min(Math.max(parseInt(distanceX), -maxX), maxX);
            mouseData.distanceY = Math.min(Math.max(parseInt(distanceY), -maxY), maxY);
          });
        }
      } // init

    }, {
      key: "init",
      value: function init(scope) {
        var el = scope.element;
        var params = scope.params;
        var scene = scope.scene;
        scene.addEventListener('mouseenter', function (e) {
          if (params.on.enterScene && typeof params.on.enterScene === 'function') params.on.enterScene.call(scope, el, scene, e);
        });
        scene.addEventListener('mouseleave', function (e) {
          el.classList.remove(params.cottonMovingClass);
          if (params.on.leaveScene && typeof params.on.leaveScene === 'function') params.on.leaveScene.call(scope, el, scene, e);
        });
        Cotton.getMouseData(scope, true);
        scope.move();
        bindModelCallbacks(scope, true);
      }
    }]);

    return Cotton;
  }();

  return Cotton;

})));
