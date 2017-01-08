import { contains, isEmpty as empty, isObject } from 'underscore'
import { toJS, fromJS, isArray } from 'immutable'

import { serverErrors,loginErros } from '../constants/messagesConfig'
import { UPDATE_ERRORS, validationErrors } from '../constants/messagesConfig'
import { sendVerificationEmail, sendSMSVerificationCode, validateOTP as checkOTP } from '../api/account/verification'
import {
  REQUEST_FOR_VERIFICATION_SUCCESS,
  ACCOUNT_UPDATE_SUCCESS,
  REQUEST_FOR_VERIFICATION_FAILED,
  REQUESTING_FOR_VERIFICATION,
  IS_REQUESTING_FOR_ACCOUNT_UPDATE,
  ACCOUNT_UPDATE_FAILED,
  SET_ERROR_MESSAGE,
  HOLD_REDIRECT
} from '../constants/actions'

function emailVerified() {
  return(dispatch)=> {
    dispatch({
      type: ACCOUNT_UPDATE_SUCCESS,
      fields: "email"
    })
  }
}


function handleRequestError(error, dispatch) {
  if(error) {
    if(isObject(error)) {
      if(error && error.data && error.data[0]) {
        error = error.data[0]
      }else if (typeof error.data === "string") {
        error = error.data
      }
    }
    if(error === serverErrors.serverIssue) {
      error = serverErrors.serverErrorMsg;
    }
    return {
      type : REQUEST_FOR_VERIFICATION_FAILED,
      error
    }
  }
}

function handleOTPError(error, dispatch) {
  let errorMsg = ""
  if(isObject(error)) {
    if(error && error.status === 400 && error.data && error.data[0]) {
      if(error.data[0] === validationErrors.OTP.wrongOTP) {
        errorMsg = loginErros.wrongOTP
      }else if (error.data[0] === validationErrors.OTP.phoneNumberMissing) {
        errorMsg = loginErros.phoneNumberMissing
      }
    }
  }
  dispatch({
    type: SET_ERROR_MESSAGE,
    message: errorMsg
  })

  dispatch({
    type: ACCOUNT_UPDATE_FAILED
  })
}

export function validateOTP(accountId, otp) {
  return (dispatch) => {

    dispatch({
      type: IS_REQUESTING_FOR_ACCOUNT_UPDATE
    })

    return checkOTP(accountId, otp).then((res) => {
      if(res) {
        $('.ui.modal.auth-modal').modal('hide')
        $('.ui.modal.auth-modal').remove()
        dispatch({
          type: HOLD_REDIRECT,
          status:  false
        })
        dispatch({
          type: ACCOUNT_UPDATE_SUCCESS,
          fields : ["phone"]
        })
      }
    }).catch((error) => {
        handleOTPError(error, dispatch)
    })
  }
}



export function sendVerificationCode(accountId, via){
  return (dispatch) =>{

    dispatch({
      type: REQUESTING_FOR_VERIFICATION,
      status:true
    })

    if(via === "phone") {
      sendSMSVerificationCode(accountId).then((response)=> {
        dispatch({
          type: REQUEST_FOR_VERIFICATION_SUCCESS,
          via
        })
      }).catch((err)=> { dispatch(handleRequestError(err)) })
    }else if (via === "email") {
      sendVerificationEmail(accountId).then((response)=> {
        dispatch({
          type: REQUEST_FOR_VERIFICATION_SUCCESS,
          via
        })
      }).catch((err)=> { dispatch(handleRequestError(err)) })
    }
  }
}

export function verifyWithEmail(accountId) {
  return ( dispatch ) => {
    sendVerificationEmail(accountId).then((response)=> {
      if(response) {
        dispatch({
          type: REQUEST_FOR_VERIFICATION_SUCESS
        })
      }
    }).catch((err)=> {
        dispatch(handleRequestError(err))
    })
  }
}
