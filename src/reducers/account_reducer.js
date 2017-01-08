import { fromJS } from 'immutable';
import { filter, contains } from 'underscore';
import {
  IS_REQUESTING_FOR_ACCOUNT_UPDATE,
  ACCOUNT_UPDATE_SUCCESS,
  ACCOUNT_UPDATE_FAILED,
  SYNC_ACCOUNT_DATA,
  ACCOUNT_NOT_VERIFIED,
  REQUESTING_FOR_VERIFICATION,
  REQUEST_FOR_VERIFICATION_SUCCESS,
  REQUEST_FOR_VERIFICATION_FAILED,
  LOGOUT,
  ROUTE_CHANGED,
} from '../constants/actions';

const intitialState = fromJS(Object.assign({
  data: null,
  verification: {
    isVerified: true,
    isRequestingForVerification: false,
    isVerifyingWith: null,
    verifiedWith: null,
  },
  isRequestingForAccountUpdate: false,
  incompleteFields: null,
  currentRoute: null,
}));

function requestForVeficiationSuccess(state, action) {
  const currentState = state.toJS();
  if (currentState.verification.isRequestingForVerification) {
    currentState.verification.isRequestingForVerification = false;
  }
  if (action.via) {
    currentState.verification.isVerifyingWith = action.via;
  }
  return state.merge(fromJS(currentState));
}

const requestForVeficiationFailed = requestForVeficiationSuccess;

function updateSuccess(state, action) {
  const currentState = state.toJS();

  const newFields = filter(currentState.incompleteFields, function (field) {
    return !contains(currentState.incompleteFields, field);
  });

  if (contains(action.fields, 'phone')) {
    currentState.verification.verifiedWith = 'phone';
  }

  currentState.incompleteFields = newFields;

  /* If no incomplete fields mark account as verified */
  if (!currentState.incompleteFields.length) currentState.verification.isVerified = true;

  /* Stop requesting as request successed */
  if (currentState.isRequestingForAccountUpdate) {
    currentState.isRequestingForAccountUpdate = false;
  }
  return state.merge(fromJS(currentState));
}

function accountIncomplete(state, action) {
  const currentState = state.toJS();

  currentState.isRequestingForAccountUpdate = false;
  currentState.verification.isRequestingForVerification = false;

  const isPhoneNumberNotVerified = contains(action.fields, 'phone');

  const isEmailNotVerified = contains(action.fields, 'email');

  const isEmailAndPhoneNotVerified = isPhoneNumberNotVerified && isEmailNotVerified;

  if (isEmailAndPhoneNotVerified) {
    currentState.incompleteFields = ['email'];
    currentState.verification.isVerifyingWith = 'email';
  } else if (isPhoneNumberNotVerified && !isEmailNotVerified) {
    currentState.incompleteFields = ['phone'];
    currentState.verification.isVerifyingWith = 'phone';
  } else if (isEmailNotVerified) {
    currentState.verification.isVerifyingWith = 'email';
    currentState.incompleteFields = ['email'];
  }

  if (currentState.incompleteFields && currentState.incompleteFields.length) {
    currentState.verification.isVerified = false;
  } else {
    currentState.verification.isVerified = true;
  }

  return state.merge(fromJS(currentState));
}


/* after requested set requesting to false */
function updateFailed(state, action) {
  const currentState = state.toJS();
  if (currentState.isRequestingForAccountUpdate) {
    currentState.isRequestingForAccountUpdate = false;
  }
  return state.merge(fromJS(currentState));
}

function requesting(state, action) {
  const currentState = state.toJS();
  currentState.verification.isRequestingForVerification = action.status;
  return state.merge(fromJS(currentState));
}

/* Default export */
export default function (state = intitialState, action) {
  switch (action.type) {
    case IS_REQUESTING_FOR_ACCOUNT_UPDATE:
      return state.set('isRequestingForAccountUpdate', true);
    case ACCOUNT_NOT_VERIFIED:
      return accountIncomplete(state, action);
    case REQUESTING_FOR_VERIFICATION:
      return requesting(state, action);
    case REQUEST_FOR_VERIFICATION_SUCCESS:
      return requestForVeficiationSuccess(state, action);
    case REQUEST_FOR_VERIFICATION_FAILED:
      return requestForVeficiationFailed(state, action);
    case ACCOUNT_UPDATE_SUCCESS:
      return updateSuccess(state, action);
    case ACCOUNT_UPDATE_FAILED:
      return updateFailed(state, action);
    case SYNC_ACCOUNT_DATA:
      return state.set('data', action.account);
    case LOGOUT:
      return intitialState;
    case 'START_REENTER_CREDS_LOADER':
      return state.setIn(['verification', 'isRequstingForReEnter'], true);
    case 'STOP_REENTER_CREDS_LOADER':
      return state.setIn(['verification', 'isRequstingForReEnter'], false);
    case ROUTE_CHANGED:
      return state.set('currentRoute', action.currentRoute);
    default:
      return state;
  }
}
