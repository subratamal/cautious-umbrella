/**
* @Author: Subrata Mal <subrat>
* @Date:   2016-09-21T12:30:20+05:30
* @Email:  subrata.mal@
* @Last modified by:   subrat
* @Last modified time: 2016-09-21T13:19:20+05:30
*/


import { contains, isEmpty as empty, isObject } from 'underscore';
import request from '../api/axiosRequest';
import api from '../api/api';
import { authenticationErrors, LOGIN_ERRORS, loginErros } from '../constants/messagesConfig';
import { logout as logOut } from '../api/api_bundle';
import { isServer, setTokenByName, setPropertyByName, setAnonymousState } from '../utils/utils';

import {
  IS_LOGGING_IN_VIA,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT,
  ACCOUNT_NOT_VERIFIED,
  PROFILE_INCOMPLETE,
  HOLD_REDIRECT,
  REMEBER_ME,
  CLEAR_REMEBER_STATE,
  SYNC_PROFILE_DATA,
  SYNC_ACCOUNT_DATA,
  CHECKING_FOR_LOGIN_STATE,
  CLEAR_LOGIN_ERROR,
  ROUTE_CHANGED,
} from '../constants/actions';


export function isLoggingInVia(via) {
  return (dispatch) => {
    dispatch({
      type: IS_LOGGING_IN_VIA,
      via,
    });
  };
}

function setCheckingStateToFalse(dispatch) {
  dispatch({
    type: CHECKING_FOR_LOGIN_STATE,
    status: false,
  });
}

export function clearLoginErrorMessage() {
  return (dispatch) => {
    dispatch({
      type: CLEAR_LOGIN_ERROR,
    });
  };
}

function getCSRFToken() {
  return new Promise((resolve, reject) => {
    api.getCSRFToken().then((response) => {
      if (response) {
        setTokenByName('csrfToken', {
          tokenValue: response.data,
        });
        resolve();
      }
    }).catch((err) => {
      reject(err);
    });
  });
}

function checkIfAccountDisabled(account) {
  return account.status === '0';
}

export function handleLoginError(error, dispatch) {
  let errorMessage = '';
  if (isObject(error)) {
    if (error && error.status === 401 && error.data) {
      if (error.data[0]) {
        const tempError = error.data[0];
        if (tempError === authenticationErrors.noAccountWithEmail ||
          tempError === authenticationErrors.noAccountWithPhone) {
          errorMessage = loginErros.noAccount;
        } else if (contains(loginErros, tempError)) {
          errorMessage = tempError;
        } else {
          errorMessage = loginErros.serverIssue;
        }
      }
    }
  }
  dispatch({
    type: LOGIN_FAILED,
    error: errorMessage,
  });
}
function checkIfAccountIsVerified(account) {
  const incompleteFields = [];
  const hasEmail = !empty(account.email);
  const isEmailVerified = account.email_verification_status === '1';
  const hasPhoneNumber = !empty(account.phone);


  const isPhoneNumberVerified = hasPhoneNumber && account.phone_verification_status === '1';

  if (!isEmailVerified && !hasPhoneNumber) incompleteFields.push('email');

  if (!hasEmail && hasPhoneNumber && !isPhoneNumberVerified) incompleteFields.push('phone');

  if (incompleteFields.length) {
    return {
      isVerified: false,
      fields: incompleteFields,
    };
  }
  return {
    isVerified: true,
  };
}

function checkIfProfileIsIncomplete(profile, account) {
  const fields = [];
  if (empty(profile.name)) {
    fields.push('name');
  }
  if (empty(account.email) && empty(account.phone)) {
    fields.push('email');
  }
  if (empty(profile.name) || (empty(account.email) && empty(account.phone))) {
    return {
      isComplete: false,
      fields,
    };
  }
  return {
    isComplete: true,
  };
}

function handleLoginProcess(account, profile, dispatch) {
  const isAccountDisabled = checkIfAccountDisabled(account);
  if (isAccountDisabled) {
    dispatch(handleLoginError(LOGIN_ERRORS.accountDisabled));
    /* Logout the use if account is disabled. */
    /* NOTE:: Don't know wether the user is logged or not if account is disabled. */
    return;
  }
  const profileIncompleteStatus = checkIfProfileIsIncomplete(profile, account);
  const accountVerificationStatus = checkIfAccountIsVerified(account);

  const isProfileComplete = profileIncompleteStatus && profileIncompleteStatus.isComplete;
  const isAccountVerified = accountVerificationStatus && accountVerificationStatus.isVerified;

  if (!isProfileComplete) {
    dispatch({
      type: PROFILE_INCOMPLETE,
      fields: profileIncompleteStatus.fields,
    });
  }

  if (!isAccountVerified) {
    dispatch({
      type: ACCOUNT_NOT_VERIFIED,
      fields: accountVerificationStatus.fields,
    });
  }

  if (!isProfileComplete || !isAccountVerified) {
    dispatch({
      type: HOLD_REDIRECT,
      status: true,
    });
  }

  if (isAccountVerified && isProfileComplete) {
    if (!isServer()) {
      /* Close the modal */
      $('.ui.modal.auth-modal').modal('hide');
      $('.ui.modal.auth-modal').remove();
    }
  }

  dispatch({
    type: SYNC_PROFILE_DATA,
    profile,
  });

  dispatch({
    type: SYNC_ACCOUNT_DATA,
    account,
  });

  dispatch({
    type: LOGIN_SUCCESS,
  });
  if (!isProfileComplete || !isAccountVerified) {
    if (!isServer()) {
      const isModalActive = $('.ui.modal.auth-modal').modal('is active');
      if (!isModalActive) $('.ui.modal.auth-modal').modal('show');
    }
  }
}

function setCSRFTokenOnError() {
  if (isServer()) {
    process.env.csrfToken = '';
  } else {
    setTokenByName('csrfToken', {
      tokenValue: '',
      tokenExpiry: new Date('01/01/1970'),
    });
  }
}

function setCookieForLogin(profileStatus, profileID) {
  setPropertyByName('isLoggedIn', '1');
  setPropertyByName('isAccountVerified', profileStatus);
  setPropertyByName('profileId', profileID);
}

export function checkForLoginState() {
  return (dispatch) => {
    return new Promise((resolve) => {
      api.getAccountInfo().then((response) => {
        const account = response.data;
        const profile = account.profile.data[0];
        getCSRFToken().then(() => {
          setCookieForLogin(profile.status, profile.id);
          handleLoginProcess(account, profile, dispatch);
          setCheckingStateToFalse(dispatch);
          resolve(response);
        }).catch((err) => {
          setCSRFTokenOnError();
          setAnonymousState();
          setCheckingStateToFalse(dispatch);
          resolve();
        });
      }).catch(() => {
        setCSRFTokenOnError();
        setAnonymousState();
        setCheckingStateToFalse(dispatch);
        resolve();
      });
    });
  };
}


export function logout() {
  return (dispatch) => {
    dispatch({
      type: 'START_LOGOUT_LOADER',
    });
    logOut().then((response) => {
      if (response) {
        setTokenByName('csrfToken', {
          tokenValue: '',
          tokenExpiry: new Date('01/01/1970'),
        });
        setAnonymousState();
        dispatch({
          type: LOGOUT,
        });

        dispatch({
          type: SYNC_PROFILE_DATA,
          profile: {},
        });
      }
    });
  };
}

export function reEntierCredentials() {
  return (dispatch) => {
    dispatch({
      type: SYNC_PROFILE_DATA,
      profile: {},
    });
    dispatch({
      type: 'START_REENTER_CREDS_LOADER',
    });

    logOut().then((response) => {
      if (response) {
        dispatch({
          type: 'STOP_REENTER_CREDS_LOADER',
        });
        dispatch({
          type: 'REENTER_CREDS',
        });
      }
    });
  };
}

export function removeReEntierCredentials() {
  return (dispatch) => {
    dispatch({
      type: 'REMOVE_RENTER_CREDS',
      profile: {},
    });
  };
}

export function rememberMe(data) {
  return (dispatch) => {
    const argType = typeof data;
    if (argType === 'object') {
      dispatch({
        type: REMEBER_ME,
        data,
      });
    } else if (argType === 'number') {
      dispatch({
        type: CLEAR_REMEBER_STATE,
      });
    }
  };
}

export function loginWithEmail(data) {
  return (dispatch) => {
    const isLoggingInAction = {
      type: IS_LOGGING_IN_VIA,
    };

    if (data.is_new) {
      isLoggingInAction.via = 'new_account';
    } else {
      isLoggingInAction.via = 'email';
    }

    if (data.email) {
      const base64PasswordWithEmail = btoa(`${data.email}:${data.password}`);
      data.password = base64PasswordWithEmail;
    } else if (data.phone) {
      const base64PasswordWithPhone = btoa(`${data.phone}:${data.password}`);
      data.password = base64PasswordWithPhone;
    }

    dispatch(isLoggingInAction);
    return api.loginWithEmail(data).then((response) => {
      getCSRFToken().then(() => {
        const profile = response.data;
        const account = profile.account.data;
        setCookieForLogin(profile.status, profile.id);
        handleLoginProcess(account, profile, dispatch);
      }).catch((err) => {
        handleLoginError(err, dispatch);
      });
    }).catch((err) => {
      handleLoginError(err, dispatch);
    });
  };
}

export function loginWithSocialAccount(data, isFacebook) {
  return (dispatch) => {
    const action = {
      type: IS_LOGGING_IN_VIA,
    };

    if (isFacebook) {
      action.via = 'facebook';
    } else {
      action.via = 'google';
    }
    dispatch(action);
    /* end points for signup or login with fb, gp */

    const fbUrl = '/v1/profiles/fb';
    const gpUrl = '/v1/profiles/gp';
    const postData = {
      account: {},
    };
    const url = isFacebook ? fbUrl : gpUrl;
    // set accccording to requested method.
    if (isFacebook) {
      postData.account.facebook_access_token = data.accessToken;
    } else {
      postData.account.g_access_token = data.tokenObj.id_token;
    }
    return request.post(url, postData)
      .then((response) => {
        getCSRFToken().then(() => {
          const profile = response.data;
          const account = profile.account.data;
          setCookieForLogin(profile.status, profile.id);
          handleLoginProcess(account, profile, dispatch);
        }).catch((error) => { handleLoginError(error, dispatch); });
      })
      .catch((error) => { handleLoginError(error, dispatch); });
  };
}


export function routeChanged(currentRoute) {
  return (dispatch) => {
    const action = {
      type: ROUTE_CHANGED,
      currentRoute,
    };

    dispatch(action);
  };
}
