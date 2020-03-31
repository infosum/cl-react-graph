console.log('set up mocha ......');

const { JSDOM } = require('jsdom');
const d3 = require('d3');
// Have to set a url to avoid security
// errors with browserHistory.push('/');
// require('html-loader');
const jsdom = new JSDOM('<!doctype html><html><body><div id="app"></div></body></html>', {
  pretendToBeVisual: true,
  url: 'https://localhost',
});
const { window } = jsdom;

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .map(prop => Object.getOwnPropertyDescriptor(src, prop));
  Object.defineProperties(target, props);
}

window.isProd = true;
global.window = window;
global.document = window.document;

global.CSS = {
  supports: () => true,
};

global.requestAnimationFrame = (callback) => {
  setTimeout(callback, 0);
};

copyProps(window, global);

// Make requiring files a noOp
const noop = () => 1;

require.extensions['.css'] = noop;
require.extensions['.scss'] = noop;
require.extensions['.png'] = noop;
require.extensions['.jpg'] = noop;
require.extensions['.jpeg'] = noop;
require.extensions['.gif'] = noop;
require.extensions['.svg'] = noop;
require.extensions['.html'] = noop;

Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property];
  }
});
global.HTMLElement = () => { };

function MutationObserver() {
  // https://github.com/tmpvar/jsdom/issues/639
  return {
    observe: function () { return [] },
    takeRecords: function () { return [] },
    disconnect: function () { return [] }
  }
}

global.MutationObserver = MutationObserver;

global.navigator = {
  appName: 'other',
  userAgent: 'node.js',
  platform: 'node.js',
};

// get a reference of the document object

// start with the visualization
d3.select(window.document)
