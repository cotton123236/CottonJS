export function bindModelCallbacks(scope, init) {
  if (scope.models.length === 0) return;

  const el = scope.element;
  const models = scope.models;
  const params = scope.params;
  // const listener = init ? 'addEventListener' : 'removeEventListener';

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

  models.forEach((item) => {
    if (item.isBound) return;
    item.addEventListener('mouseenter', enterHandler);
    item.addEventListener('mouseleave', leaveHandler);
    item.isBound = true;
  });

  // models.forEach((item) => {
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