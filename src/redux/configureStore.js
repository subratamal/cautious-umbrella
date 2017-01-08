import { createStore, applyMiddleware, compose } from 'redux';
import { combineReducers } from 'redux-immutable';
import thunk from 'redux-thunk';
import { routerMiddleware, UPDATE_LOCATION, LOCATION_CHANGE } from 'react-router-redux';
import { fromJS, toJS } from 'immutable';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import { reducer as formReducer } from 'redux-form';
import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-localstorage';
import merger from 'redux-storage-merger-immutablejs';
import filter from 'redux-storage-decorator-filter';
import reducer from '../reducers/reducer';
import discoverPage from '../reducers/discoverPage_reducer';
import profile from '../reducers/profile_reducer';
import account from '../reducers/account_reducer';
import universityPage from '../reducers/universityPage_reducer';
import landingPage from '../reducers/landingPage_reducer';
import homePage from '../reducers/homePage_reducer';
import eventsPage from '../reducers/eventsPage_reducer';
import notification from '../reducers/notification_reducer';
import DevTools from '../components/views/DevTools';
import { reducer as opportunityReducer } from '../modules/opportunities';
import { reducer as storyReducer } from '../modules/story';
import { reducer as eventReducer } from '../modules/event';
import { reducer as pageReducer } from '../modules/pages';
import { reducer as universitySearchReducer } from '../modules/universitySearch';
import { reducer as sliderReducer } from '../modules/primarySlider';
import { reducer as profileReducer } from '../modules/profile';
import { reducer as connectionRequestReducer } from '../modules/connectionRequests';
import { reducer as opportunitySearchReducer } from '../modules/opportunitySearch';
import crashReportingMiddleware from '../middlewares/crashReportingMiddleware';

const Immutable = require('immutable');

const initialState = Immutable.fromJS({
  locationBeforeTransitions: null,
});

function routerReducer(state = initialState, action) {
  if (action.type === LOCATION_CHANGE) {
    return state.merge({
      locationBeforeTransitions: action.payload,
    });
  }

  return state;
}

const reducers = storage.reducer(combineReducers({
  reduxAsyncConnect,
  routing: routerReducer,
  reducer,
  profile,
  account,
  form: (state = fromJS({}), action) => fromJS(formReducer(state.toJS(), action)), // --> workaround for converting redux-form state to immutable
  discoverPage,
  universityPage,
  landingPage,
  homePage,
  eventsPage,
  notification,
  storyReducer,
  eventReducer,
  pageReducer,
  universitySearchReducer,
  opportunitySearchReducer,
  sliderReducer,
  opportunityReducer,
  profileReducer,
  connectionRequestReducer,
}), merger);

let engine = createEngine('my-save-key');

engine = filter(engine, [
    ['profile', 'data'],
    ['reducer', 'crsf_token'],
    ['reducer', 'form_cache'],
    ['reducer', 'isLoggedIn'],
    ['account', 'data'],
    ['notification', 'notificationData'],
], ['form']);

export const engineWithFilters = engine;

export function finalStore(history, data) {
  const reduxRouterMiddleware = routerMiddleware(history);

  // middleware configuaration
  const storageMiddleware = storage.createMiddleware(engine);

  let finalCreateStore;
  if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
    const { persistState } = require('redux-devtools');
    const DevTools = require('../components/views/DevTools');

    finalCreateStore = compose(
      applyMiddleware(thunk, storageMiddleware, reduxRouterMiddleware),
      DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(createStore);
  } else {
    finalCreateStore = applyMiddleware(thunk, storageMiddleware, reduxRouterMiddleware)(createStore);
  }

  const store = finalCreateStore(reducers, data);
  return store;
}
