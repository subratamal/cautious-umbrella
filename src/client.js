
/**
* THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
*/

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import withScroll from 'scroll-behavior';
import * as storage from 'redux-storage';
import { ReduxAsyncConnect } from 'redux-connect';
import { fromJS } from 'immutable';
import ReactGA from 'react-ga';
import getRoutes from './routes';
import { finalStore, engineWithFilters } from './redux/configureStore';
import google from '../config/ga';

require('react-fastclick');
require('./../semantic/dist/semantic.min.css');
require('./../semantic/dist/semantic.min');
require('./../static/css/slick.css');
require('./../static/css/swipeViews.css');
require('./../static/css/progress-bar.css');

const _browserHistory = withScroll(browserHistory, (prevLocation, location) => {
  // do nothing
});

const dest = document.getElementById('content');
const state = fromJS(window && window.__data);
const store = finalStore(_browserHistory, state);

let lastRoute = null;
let lastRouteJS = null;
const history = syncHistoryWithStore(_browserHistory, store, {
  selectLocationState: (state) => {
    if (state.get('routing') !== lastRoute) {
      lastRoute = state.get('routing');
      lastRouteJS = lastRoute.toJS();
      return lastRouteJS;
    } else {
      return lastRouteJS;
    }
  },
});
// Google Analytics Initialisation.
ReactGA.initialize(google.GA_CREDS.app_id, { debug: false });
function logPageView() {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

const renderRouter = (props) => <ReduxAsyncConnect {...props} />;
const component = (
  <Router onUpdate={logPageView} history={history} render={renderRouter}>
    {getRoutes()}
  </Router>
);

// Reseting localstorgae at app load
localStorage.removeItem('my-save-key');
const load = storage.createLoader(engineWithFilters);

load(store);

load(store).then(() => {
  ReactDOM.render(
    <Provider store={store} key="provider">
      {component}
    </Provider>,
    dest
  );
}).catch((err) => console.log(err));

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger
  if (!dest) {
    console.error('Server-side React render was discarded.' +
    'Make sure that your initial render does not contain any client-side code.');
  }
}

if (__DEVELOPMENT__ && window.devToolsExtension) {
  const devToolsDest = document.createElement('div');
  window.document.body.insertBefore(devToolsDest, null);
  const DevTools = require('./components/views/DevTools');
  ReactDOM.render(
    <Provider store={store} key="provider">
      <DevTools />
    </Provider>,
    devToolsDest
  );
}
