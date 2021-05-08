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

  el.style.transform = `translate(calc(-50% + ${mouseData.x}px), calc(-50% + ${mouseData.y}px))`
}

export function airModeAnimation(scope) {
  const el = scope.element;
  const params = scope.params;
  const mouseData = params.data;
  const airMode = params.airMode;

  if (typeof airMode !== 'object' || Array.isArray(airMode)) airMode = { resistance: 15, reverse: false }
  // if (airMode.resistance < 5 || airMode.resistance > 100) airMode.resistance = 15;
  
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

  el.style.transform = `translate(${mouseData.x / airMode.resistance}px, ${mouseData.y / airMode.resistance}px)`
}