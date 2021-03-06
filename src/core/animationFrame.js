import {
  getTransformX,
  getTransformY
} from './../utils/getRect'

export function cottonAnimation(scope) {
  const el = scope.element;
  const params = scope.params;
  const mouseData = params.data;

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

  mouseData.animationFrame = requestAnimationFrame(function() {
    cottonAnimation(scope);
  });

  params.centerMouse ? el.style.transform = `translate(calc(-50% + ${mouseData.x}px), calc(-50% + ${mouseData.y}px))` : el.style.transform = `translate(${mouseData.x}px, ${mouseData.y}px)`
}

export function airModeAnimation(scope) {
  const el = scope.element;
  const params = scope.params;
  const mouseData = params.data;
  const airMode = params.airMode;
  
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

  mouseData.animationFrame = requestAnimationFrame(function() {
    airModeAnimation(scope);
  });

  const airX = airMode.reverse ? - mouseData.x : mouseData.x
  const airY = airMode.reverse ? - mouseData.y : mouseData.y
  const originX = typeof mouseData.transformX === 'number' ? mouseData.transformX + 'px' : mouseData.transformX
  const originY = typeof mouseData.transformY === 'number' ? mouseData.transformY + 'px' : mouseData.transformY
  const transformX = mouseData.transformX ? `calc(${originX} + ${roundToTwo(airX / airMode.resistance)}px)` : `${roundToTwo(airX / airMode.resistance)}px`
  const transformY = mouseData.transformY ? `calc(${originY} + ${roundToTwo(airY / airMode.resistance)}px)` : `${roundToTwo(airY / airMode.resistance)}px`

  el.style.transform = `translate(${transformX}, ${transformY})`
}

const roundToTwo = (num) => {
  return Math.round((num + Number.EPSILON) * 100) / 100
}