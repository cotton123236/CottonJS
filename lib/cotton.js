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

    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
      isMobile = true;
    }

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
    params.mouseCenter ? el.style.transform = "translate(calc(-50% + ".concat(mouseData.x, "px), calc(-50% + ").concat(mouseData.y, "px))") : el.style.transform = "translate(".concat(mouseData.x, "px, ").concat(mouseData.y, "px)");
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
    el.style.transform = "translate(".concat(Math.floor(airX / airMode.resistance), "px, ").concat(Math.floor(airY / airMode.resistance), "px)");
  }

  function bindModelCallbacks(scope, init) {
    if (scope.models.length === 0) return;
    var el = scope.element;
    var models = scope.models;
    var params = scope.params; // const listener = init ? 'addEventListener' : 'removeEventListener';

    function enterHandler() {
      if (params.on.enterModel && typeof params.on.enterModel === 'function') params.on.enterModel.call(scope, el, this);
      el.classList.add(params.cottonActiveClass);
      this.classList.add(params.modelsActiveClass);
    }

    function leaveHandler() {
      if (params.on.leaveModel && typeof params.on.leaveModel === 'function') params.on.leaveModel.call(scope, el, this);
      el.classList.remove(params.cottonActiveClass);
      this.classList.remove(params.modelsActiveClass);
    }

    models.forEach(function (item) {
      if (item.isBound) return;
      item.addEventListener('mouseenter', enterHandler);
      item.addEventListener('mouseleave', leaveHandler);
      item.isBound = true;
    }); // models.forEach((item) => {
    //   item[listener]('mouseenter', enterHandler);
    //   item[listener]('mouseleave', leaveHandler);
    //   console.log('olds', item, listener)
    // });
    // if (!init) {
    //   const newModels = document.querySelectorAll(params.models);
    //   newModels.forEach((item) => {
    //     console.log('news', item)
    //     item.addEventListener('mouseenter', enterHandler);
    //     item.addEventListener('mouseleave', leaveHandler);
    //   });
    //   scope.models = newModels;
    // }
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
        mouseCenter: true,
        speed: 0.125,
        airMode: false,
        on: {
          enterModel: null,
          leaveModel: null,
          enterScene: null,
          leaveScene: null
        }
      };
      this.element = document.querySelector(element);
      this.params = Object.assign({}, defaults, options);
      this.scene = document.querySelector(this.params.scene);
      this.models = document.querySelectorAll(this.params.models);
      if (!this.element) return warn('Cannot define a cotton element which is not exist');
      if (!this.scene) return warn('Cannot define a scene which is not exist');
      if (this.params.speed > 1 || this.params.speed <= 0) this.params.speed = 0.125;

      if (this.params.airMode) {
        var airMode = this.params.airMode;
        var airDefaults = {
          resistance: 15,
          reverse: false
        };
        if (_typeof(airMode) !== 'object' || Array.isArray(airMode)) this.params.airMode = airDefaults;else this.params.airMode = Object.assign(airDefaults, airMode);
        if (airMode.resistance < 1 || airMode.resistance > 100) airMode.resistance = 15;
      }

      if (!isMobile()) Cotton.init(this);
    } // private functions
    // set mouse data


    _createClass(Cotton, [{
      key: "move",
      value: // public methods
      // anmate cotton element
      function move() {
        var mouseData = this.params.data;
        var airMode = this.params.airMode;
        Cotton.setData(this, true);
        this.element.classList.add(this.params.conttonInitClass);
        if (!mouseData.animationFrame) airMode ? airModeAnimation(this) : cottonAnimation(this);
      } // stop animation

    }, {
      key: "stop",
      value: function stop() {
        var mouseData = this.params.data;
        Cotton.setData(this, false);
        this.element.classList.remove(this.params.conttonInitClass);
        this.element.classList.remove(this.params.cottonMovingClass);
        cancelAnimationFrame(mouseData.animationFrame);
        mouseData.animationFrame = undefined;
      } // update models binding

    }, {
      key: "updateModels",
      value: function updateModels() {
        // this.models = document.querySelectorAll(this.params.models);
        bindModelCallbacks(this);
      }
    }], [{
      key: "setData",
      value: function setData(scope, type) {
        var el = scope.element;
        var scene = scope.scene;
        var params = scope.params;
        var mouseData = params.data;
        var airMode = params.airMode;
        var listener = type ? 'addEventListener' : 'removeEventListener';
        var classType = type ? 'add' : 'remove';
        var callbackType = type ? 'enterScene' : 'leaveScene';

        function getMouseMove(e) {
          mouseData.mouseX = airMode ? e.pageX : e.clientX;
          mouseData.mouseY = airMode ? e.pageY : e.clientY;
        }

        document.addEventListener('mousemove', getMouseMove);

        if (airMode) {
          if (type) mouseData.rect = getRect(el);
          var maxX = window.innerWidth + getRect(el).width / 2;
          var maxY = window.innerHeight + getRect(el).height / 2;

          function getMouseDistance(e) {
            var distanceX = mouseData.mouseX - mouseData.rect.centerX;
            var distanceY = mouseData.mouseY - mouseData.rect.centerY;
            mouseData.distanceX = Math.min(Math.max(parseInt(distanceX), -maxX), maxX);
            mouseData.distanceY = Math.min(Math.max(parseInt(distanceY), -maxY), maxY);
          }

          scene[listener]('mousemove', getMouseDistance);
        }

        if (_toConsumableArray(el.classList).indexOf(params.conttonInitClass) > -1) el.classList[classType](params.cottonMovingClass);
        if (params.on[callbackType] && typeof params.on[callbackType] === 'function') params.on[callbackType].call(scope, el, scene);
      } // init

    }, {
      key: "init",
      value: function init(scope) {
        scope.scene; // scene.addEventListener('mouseenter', function() { Cotton.setData(scope, true) });
        // scene.addEventListener('mouseleave', function() { Cotton.setData(scope, false) });

        scope.move();
        bindModelCallbacks(scope);
      }
    }]);

    return Cotton;
  }();

  return Cotton;

})));
