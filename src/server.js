/**
* @Author: Subrata Mal <subrat>
* @Date:   2016-09-21T12:30:20+05:30
* @Email:  subrata.mal@
* @Last modified by:   subrat
* @Last modified time: 2016-09-21T13:04:44+05:30
*/

import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import compression from 'compression';
import path from 'path';
import http from 'http';
import { match, RouterContext } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import * as storage from 'redux-storage';
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect'; // eslint-disable-line no-unused-vars
import { Provider } from 'react-redux';
import cookieParser from 'cookie-parser';
import createHistory from 'react-router/lib/createMemoryHistory';
import { toJS } from 'immutable'; // eslint-disable-line no-unused-vars
import bodyParser from 'body-parser';
import { finalStore, engineWithFilters } from './redux/configureStore';
import getRoutes from './routes';
import { fetchComponentsData } from './utils/connectDataFetchers';
import config from './config';
import Html from './helpers/Html'; // eslint-disable-line
import getStreamConfig from '../config/getStream';
import getOauthToken from './utils/getOauthToken';
import { getTokenByName, isfetchTokensOnServer } from './utils/utils';
import { checkForLoginState } from './actions/login_modal_actions';
import { ServerErrorModal } from './components/elements/ServerErrorModal';
import getLoginState from './actions/getLoginState';

// eslint-disable-next-line no-unused-vars
const targetUrl = `http://${config.apiHost}:${config.apiPort}`;
const app = new Express();
const server = new http.Server(app);

// initialise getStream.
const stream = require('getstream');

const client = stream.connect(getStreamConfig.apiKey, getStreamConfig.secretKey, getStreamConfig.siteId);

// Fake client side object so that current way of written code doesn't break.
// TODO: we need to remove absolute reference of these object in our code.
global.window = {
  innerHeight: 1000,
  innerWidth: 1024,
  location: {},
  document: {
    createElement: () => {},
  },
};

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(Express.static(path.join(__dirname, '..', 'static')));
app.use(cookieParser());
// Creating a getStream feed token server side.
app.post('/getStreamNotificationFeedToken', (request, response) => {
  const uuid = request.body.accountId;
  if (uuid !== '') {
    const userFeed = client.feed('notification', uuid);
    response.send(userFeed.token);
  }
});

app.use((req, res) => {
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  }

  const memoryHistory = createHistory(req.originalUrl);
  const store = finalStore(memoryHistory);
  const history = syncHistoryWithStore(memoryHistory, store, {
    selectLocationState: (state) => state.get('routing'),
  });

  const routes = getRoutes();

  function hydrateOnClient() {
    res.send(`<!doctype html>
      ${renderToString(<Html assets={webpackIsomorphicTools.assets()} store={store} />)}`);
  }

  if (__DISABLE_SSR__) {
    hydrateOnClient();
    return;
  }
  match({
    history,
    routes,
    location: req.originalUrl,
  }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      res.status(500);
      hydrateOnClient();
    } else if (renderProps) {
      const cookie = req.headers.cookie;
      // This cookie is session cookie which is set by used REST API calls,
      // as session management is handled by the API server.
      // Hence not using util functions "setTokenByName" and "getTokenByName" here to manage sessions cookies.
      process.env.cookie = cookie;

      let fetchComponentsDataAndTokensPromise;
      if (isfetchTokensOnServer()) {
        fetchComponentsDataAndTokensPromise = getOauthToken()
        .then((response) => {
          return response;
        }).then(() => {
          return getLoginState(store.dispatch);
        })
        .then(() => {
          return fetchComponentsData({
            dispatch: store.dispatch,
            components: renderProps.components,
            params: renderProps.params,
            query: renderProps.location.query,
          })
        }
      );
      } else {
        fetchComponentsDataAndTokensPromise = Promise.resolve(fetchComponentsData({
          dispatch: store.dispatch,
          components: renderProps.components,
          params: renderProps.params,
          query: renderProps.location.query,
        }));
      }

      fetchComponentsDataAndTokensPromise
      .then(() => {
        const component = (
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        );

        const csrfToken = getTokenByName('csrfToken');
        res.status(200);
        global.navigator = { userAgent: req.headers['user-agent'] };

        const oAuthToken = getTokenByName('oAuthToken');
        const load = storage.createLoader(engineWithFilters);
        load(store);

        res.cookie('oAuthToken', oAuthToken, { maxAge: 1987200000 });
        res.cookie('csrfToken', csrfToken, { maxAge: 1987200000 });
        res.send(`<!doctype html>
            ${renderToString(
              <Html assets={webpackIsomorphicTools.assets()} component={component} store={store} />
            )}`
          );
      })
      .catch((error) => {
        res.status(500);
        res.send(`<!doctype html>
          ${renderToString(
            <ServerErrorModal />
          )}`
        );
      });
    } else {
      res.status(404).send('Not found');
    }
  });
});

if (config.port) {
  server.listen(config.port, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> ✅  %s is running on %s.', config.app.title, config.port);
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port);
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
