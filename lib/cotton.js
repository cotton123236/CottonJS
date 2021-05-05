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

  function mobileDetecter() {
    var isMobile = false;

    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
      isMobile = true;
    }

    return isMobile;
  }

  function getRectWidth(target) {
    return target.getBoundingClientRect().width;
  }
  function getRectHeight(target) {
    return target.getBoundingClientRect().height;
  }

  function warn(msg) {
    console.error("[Cotton warn]: ".concat(msg));
  }

  function bindCallback(scope) {
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
      if (!this.element) return warn('Cannot define a element which is not exist');
      if (this.params.speed > 1 || this.params.speed <= 0) return warn('The speed property must be > 0 or <= 1');
      if (!Cotton.isMobile()) this.init();
    } // private functions
    // detect is mobile or not


    _createClass(Cotton, [{
      key: "init",
      value: // public methods
      // init
      function init() {
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
      key: "isMobile",
      value: function isMobile() {
        return mobileDetecter();
      } // get target width

    }, {
      key: "getElementWidth",
      value: function getElementWidth(target) {
        return getRectWidth(target);
      } // get target height

    }, {
      key: "getElementHeight",
      value: function getElementHeight(target) {
        return getRectHeight(target);
      } // callbacks when cotton element enter (leave) models

    }, {
      key: "bindModelCallback",
      value: function bindModelCallback(scope) {
        if (scope.models.length !== 0) return bindCallback(scope);
      }
    }]);

    return Cotton;
  }();

  return Cotton;

})));
