export function getRect(element) {
  const rect = element.getBoundingClientRect();
  const body = document.body.getBoundingClientRect();

  return {
    width: rect.width,
    height: rect.height,
    centerX: rect.left - body.left + rect.width / 2 - getTransformX(element),
    centerY: rect.top - body.top + rect.height / 2 - getTransformY(element)
  }
}

export function getTransformX(obj) {
  const style = getComputedStyle(obj),
        transform = style.transform;
  var mat = transform.match(/^matrix3d\((.+)\)$/);
  if(mat) return parseFloat(mat[1].split(', ')[12]);
  mat = transform.match(/^matrix\((.+)\)$/);
  return mat ? parseFloat(mat[1].split(', ')[4]) : 0;
}

export function getTransformY(obj) {
  const style = getComputedStyle(obj),
        transform = style.transform;
  var mat = transform.match(/^matrix3d\((.+)\)$/);
  if(mat) return parseFloat(mat[1].split(', ')[13]);
  mat = transform.match(/^matrix\((.+)\)$/);
  return mat ? parseFloat(mat[1].split(', ')[5]) : 0;
}