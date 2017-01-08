const webpack = require('webpack');
const path = require('path');

const assetsPath = path.resolve(__dirname, '../static/dist');
module.exports = {
  entry: {
    lib: [
      'axios',
      'immutable',
      'react',
      'react-dom',
      'react-router',
      'react',
      'react-addons-pure-render-mixin',
      'react-document-meta',
      'react-dom',
      'react-easy-transition',
      'react-facebook-login',
      'react-fastclick',
      'react-ga',
      'react-google-login',
      'react-helmet',
      'react-infinite-scroller',
      'react-inline-css',
      'react-progress-bar-plus',
      'react-redux',
      'react-router',
      'react-router-redux',
      'react-semantify',
      'react-share',
      'react-slick',
      'react-tooltip',
      'reactfire',
      'redux',
      'redux-async-connect',
      'redux-connect',
      'redux-form',
      'redux-immutable',
      'redux-storage',
      'redux-storage-decorator-filter',
      'redux-storage-decorator-immutablejs',
      'redux-storage-engine-localstorage',
      'redux-storage-merger-immutablejs',
      'redux-thunk',
      'scroll-behavior',
      'redux',
      'react-redux',
      'react-semantify',
      'jquery',
      'underscore',
      'moment',
      'react-a11y',
      'react-addons-test-utils',
      'react-hot-loader',
      'react-transform-catch-errors',
      'react-transform-hmr',
      'redbox-react',
      'redux-devtools',
      'redux-devtools-dock-monitor',
      'redux-devtools-log-monitor',
      'strip-loader',
      'style-loader',
      'firebase',
      'getstream',
      'history',
      'serialize-javascript',
    ],
  },

  output: {
    filename: '[name].bundle.js',
    path: assetsPath,

    // The name of the global variable which the library's
    // require() function will be assigned to
    library: '[name]_lib',
  },

  plugins: [
    new webpack.DllPlugin({
      // The path to the manifest file which maps between
      // modules included in a bundle and the internal IDs
      // within that bundle
      path: `${assetsPath}/[name]-manifest.json`,
      // The name of the global variable which the library's
      // require function has been assigned to. This must match the
      // output.library option above
      name: '[name]_lib',
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
  ],
};
