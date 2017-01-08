import {List, Map, fromJS, toJS} from 'immutable';
import {expect} from 'chai';
import {reducerTestValues} from '../test_constants'

import reducer from '../../src/reducers/reducer';


let intitialStateReducerState = fromJS(Object.assign({
  isLoggedIn : false,
  isRegistering : false,
  isCheckingLoginState: true,
  isRedirectOnHold : false,
  error: null,
  isLoggingInVia : null,
  form_cache: {
    email : null,
    password : null
  }
}))

describe('reducer', () => {

  it('handles login state', ()=> {
    const intitialState = new Map();
    const action = function () {
      return {
        'type': 'LOGIN SUCCESS'
      }
    }
    const nextState = reducer(intitialState, action());
    expect(nextState).to.deep.equal(fromJS({
      "isLoggingInVia": null,
      "isLoggedIn": true
    }))
  })

 it('handles logout state ', () => {
   const action = function () {
     return {
       'type': 'LOGOUT'
     }
   }
   const nextState = reducer(intitialStateReducerState, action());
   let nS = nextState.toJS()
   nS.isCheckingLoginState = false
   expect(nextState).to.deep.equal(fromJS(nS))
 })

});
