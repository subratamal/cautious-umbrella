import jsdom from 'jsdom';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';

// We need to create jsdom versions of the document,
// and window objects that would normally be provided by the web browser.
// Then we need to put them on the global object, so that they will be
// discovered by React when it accesses document or window.
const doc = jsdom.jsdom('<!doctype <html></head></head><body><script></script></body></html>');
const win = doc.defaultView;
const $ = require('jquery')(win);

global.document = doc;

/*For match media pollyfill dependency 
 matchmedia is for testing css media queries 
*/
var matchMedia = typeof window != 'undefined' ? window.matchMedia : null;
win.matchMedia = matchMedia || function() {
    return {
        matches : false,
        addListener : function() {},
        removeListener: function() {}
    };
};

global.window = win;
global.$ = $;

/*
  Mocha doesnt have scope for localStorage,
  hence we need to mock the localStorage to globals of Mocha
*/
const mock = (function() {
   let store = {};
   return {
       getItem: function (key) {
         return store[key];
       },
       setItem: function(key, value) {
         store[key] = value && value.toString();
       },
       clear: function() {
         store = {};
       }
  };
 })();

 global.localStorage = mock


// We need to take all the properties that the jsdom window object contains,
// such as navigator, and hoist them on to the Node.js global object.
// This is done so that properties provided by window can be used without the window. prefix,
// which is what would happen in a browser environment
Object.keys(window).forEach((key) => {
  if (!(key in global)) {
    global[key] = window[key];
  }
});



chai.use(chaiImmutable);
