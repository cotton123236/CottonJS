export function bindModelCallbacks(scope) {
  if (scope.models.length === 0) return;

  const el = scope.element;
  const models = scope.models;
  const params = scope.params;

  models.forEach((item) => {
    if (item.isBound) return;
    item.isBound = true;
    item.addEventListener('mouseenter', function() {
      if (params.on.enterModel && typeof params.on.enterModel === 'function') params.on.enterModel.call(scope, el, this);
      el.classList.add(params.cottonActiveClass);
      this.classList.add(params.modelsActiveClass);
    });
    item.addEventListener('mouseleave', function() {
      if (params.on.leaveModel && typeof params.on.leaveModel === 'function') params.on.leaveModel.call(scope, el, this);
      el.classList.remove(params.cottonActiveClass);
      this.classList.remove(params.modelsActiveClass);
    });
  });
}