export function bindCallback(scope) {
  const element = scope.element;
  const models = scope.models;
  const params = scope.params;

  models.forEach((item) => {
    if (item.isBound) return;
    item.isBound = true;
    item.addEventListener('mouseenter', function() {
      if (params.on.modelEnter && typeof params.on.modelEnter === 'function') params.on.modelEnter.call(scope, element, this);
      element.classList.add(params.cottonActiveClass);
      this.classList.add(params.modelsActiveClass);
    });
    item.addEventListener('mouseleave', function() {
      if (params.on.modelLeave && typeof params.on.modelLeave === 'function') params.on.modelLeave.call(scope, element, this);
      element.classList.remove(params.cottonActiveClass);
      this.classList.remove(params.modelsActiveClass);
    });
  });
}