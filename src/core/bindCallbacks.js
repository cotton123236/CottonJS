export function bindModelCallbacks(scope, init) {
  if (scope.models.length === 0) return;

  const models = scope.models;

  if (init) {
    models.forEach((item) => {
      item.addEventListener('mouseenter', scope.enterModelHandler);
      item.addEventListener('mouseleave', scope.leaveModelHandler);
    });
  } else {
    models.forEach((item) => {
      item.removeEventListener('mouseenter', scope.enterModelHandler);
      item.removeEventListener('mouseleave', scope.leaveModelHandler);
    });

    const newModels = document.querySelectorAll(scope.params.models);

    newModels.forEach((item) => {
      item.addEventListener('mouseenter', scope.enterModelHandler);
      item.addEventListener('mouseleave', scope.leaveModelHandler);
    });

    scope.models = newModels;
  }
}