export function isMobile() {
  let isMobile = false;
  const userAgent = navigator.userAgent;
  isMobile = (userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1);
  isMobile = userAgent.indexOf('Mac') > -1 && 'ontouchend' in document;
  return isMobile;
}