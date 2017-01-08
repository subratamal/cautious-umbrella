import {createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux-immutable';
import thunk from 'redux-thunk';
import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-localstorage';
import immutablejs from 'redux-storage-decorator-immutablejs';
import merger from 'redux-storage-merger-immutablejs';
import filter from 'redux-storage-decorator-filter'
import reducer from '../src/reducers/reducer';
import universityPage from '../src/reducers/universityPage_reducer';
import homePage from '../src/reducers/homePage_reducer';
import eventsPage from '../src/reducers/eventsPage_reducer';
import { reducer as formReducer } from 'redux-form'
import profile from '../src/reducers/profile_reducer'
import account from '../src/reducers/account_reducer'

import discoverPage from '../src/reducers/discoverPage_reducer'

import { fromJS } from 'immutable';

const reducers = storage.reducer(combineReducers({
  reducer,
  profile,
  account,
  discoverPage,
  universityPage,
  homePage,
  eventsPage,
  form: (state = fromJS({}), action) => fromJS(formReducer(state.toJS(), action))
}), merger);

//Create an instance of localStorage engine to save state
//Don't change the argument to createEngine as this is specifically requried by engine
var engine = createEngine('my-save-key');

//as immutable isn't supperted by localStorage
//convert state from immutable to js and saves in localStorage
// engine = immutablejs(engine);

//@params: [ engine, [ whitlist reducers ], [blacklist reducer] ]

engine = filter(engine, [ ['reducer', 'user'] ], []);

//middleware configuaration
const middleware = storage.createMiddleware(engine);
const createStoreWithMiddleware = applyMiddleware(thunk, middleware)(createStore);

//creatin a store with middleware
export const store = createStoreWithMiddleware(reducers);
