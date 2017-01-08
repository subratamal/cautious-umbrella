const closestSelector = (el, fn) => el && (fn(el) ? el : closestSelector(el.parentNode, fn));

const scrollToTop = () => { if (typeof (window) !== 'undefined' && window.scrollTo) window.scrollTo(0, 0); }

const isDOMAvailable = () => {
  if (typeof (window) !== 'undefined' && window.document && window.document.createElement) {
    return true;
  }
  return false;
}
export default { closestSelector, scrollToTop, isDOMAvailable } ;
