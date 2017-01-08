import {
  IS_LOGGING_IN_VIA,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  HOLD_REDIRECT,
  LOGOUT,
  CHECKING_FOR_LOGIN_STATE,
  REMEBER_ME,
  CLEAR_LOGIN_ERROR,
  SET_ERROR_MESSAGE
 } from "../constants/actions"

import { Map, fromJS, toJS } from 'immutable'

const intitialState = fromJS(Object.assign({
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

function loginFailed(state, action) {
  let currentState = state.toJS()

  /* Reset the logging in state after login failed */
  if(currentState.isLoggingInVia) currentState.isLoggingInVia = null

  /* Reason for login failure */
  if(action.error) {
    currentState.error = action.error
  }
  /* Return in the new state */
  return state.merge(fromJS(currentState))
}

function logout(state) {
  /* Clear the state after user logs out */
  let cS = intitialState.toJS()
  cS.isCheckingLoginState = false
  cS.logoutLoader = false

  return state.merge(cS)
}

function remeber(s, a) {
  let cS = s.toJS()
  cS["form_cache"] = a.data
  return s.merge(fromJS(cS))
}

function reEnterCreds(state) {
  /* Clear the state after user logs out */
  let cS = intitialState.toJS()
  cS.isCheckingLoginState = false
  cS.reEnterCreds = true;
  return state.merge(cS)
}



export default function (state=intitialState, action) {
  switch (action.type) {
    case IS_LOGGING_IN_VIA:
      state = state.set('isLoggingInVia', action.via);
      state = state.set('error',null);
      return state
      break
    case CHECKING_FOR_LOGIN_STATE:
      return state.set('isCheckingLoginState', action.status)
      break;
    case LOGIN_SUCCESS:
        state = state.set('isLoggingInVia',null);
        state = state.set('isLoggedIn', true)
      return state
      break
    case HOLD_REDIRECT:
      return state.set('isRedirectOnHold', action.status)
      break
    case LOGIN_FAILED:
      return loginFailed(state, action)
      break
    case SET_ERROR_MESSAGE:
      return state.set('error', action.message)
      break
    case CLEAR_LOGIN_ERROR:
      return state.set('error', "")
      break
    case LOGOUT:
      return logout(state)
      break
    case 'REENTER_CREDS' :
      return reEnterCreds(state)
    case 'REMOVE_RENTER_CREDS' :
      return state.set('reEnterCreds',false)
    case REMEBER_ME:
      return remeber(state, action)
      break
    case "START_LOGOUT_LOADER" :
      return state.set("logoutLoader",true)
    case 'SET_TOKEN_RECEIVED':
      return state.set('isTokenReceived', true)
      break
    default:
    return state
  }
}
