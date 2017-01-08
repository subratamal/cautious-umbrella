import React from 'react'
import { Divider, Grid, Segment, Column, Icon } from 'react-semantify'
import { reduxForm } from 'redux-form'
import { toJS } from 'immutable'
import { contains } from 'underscore'
import { validationErrors as Errors, RegExps,verificationMsgConfig } from '../../constants/messagesConfig'
import {FieldError} from '../elements/FieldError'



/*
  This isn't generic Component. Used only with login modal.
*/

export const fields = ['OTP']

export const validate = values => {
  const errors = {}
  if (!values.OTP) {
    errors.OTP = Errors.required;
  }
  if(values.OTP) {
    let otpValue = values.OTP.toString()
    
    if(otpValue.length !== 6){
      errors.OTP = Errors.OTP.invalid  
    }
    
  }
  return errors
}

class VerifyAccount extends React.Component {
  constructor(props) {
    super(props)
    this.sendVerificationCode = this.sendVerificationCode.bind(this)
    this.validateOTP = this.validateOTP.bind(this);
    this.reEntierCredentials = this.reEntierCredentials.bind(this)
  }

  reEntierCredentials(e) {
    e.preventDefault()
    let { actions } = this.props
    actions.reEntierCredentials()
    $('.ui.modal.auth-modal').modal('show')

  }

  sendVerificationCode(event) {
    event.preventDefault()
    let { accountActions, account } = this.props

    let toPhone = event.target.id === "sms" ? true : false || event.target.id === "resend" ? true : false
    let toEmail = event.target.id === "email" || event.target.id === "resend-email"

    if( toPhone ) {
      accountActions.sendVerificationCode(account.data.id, "phone")
    }else if(toEmail){
      accountActions.sendVerificationCode(account.data.id, "email")
    }
  }

  validateOTP(e) {
    e.preventDefault()
    let { actions, valid , account, accountActions , touchAll} = this.props

    actions.clearLoginErrorMessage()
    touchAll()

    let accountId = account.data.id
    let { otp } =this.refs

    if(valid) {
      accountActions.validateOTP(accountId, otp.value)
    }
  }

  showEmailSentSuccess() {
   let  { account } = this.props
   let isRequesting = account.verification.isRequestingForVerification
   return(
     <div className="ui main containers">
       <Divider className="hidden"/>
       <Grid className="container center aligned reset-password-form">
         <Grid>
           <Column className="sixteen wide container">
             <Segment className="padded">
               <p className="ui success message">
               {verificationMsgConfig.passwordResetMailText}
               </p>

               <small>{verificationMsgConfig.checkInboxText}</small>
             </Segment>
           </Column>
         </Grid>
       </Grid>
       <div className="modal-footer-fixed">
         <div className="ui divider"></div>
           <div className="field">
             <div className="ui center aligned container">
               <div>Email Sent.</div>
               <a href="#" onClick={this.sendVerificationCode}>
                 <span className="ui text red" id="resend-email">{verificationMsgConfig.resentConfirmation}</span>
               </a>
             </div>
           </div>
       </div>
       { isRequesting ?
         <div className="ui active dimmer">
           <div className="ui text loader custom-loader">
            <Icon className="header cd monogram logo loaderimage" />
          </div>
         </div> : null
       }
     </div>
   )
  }

  verifyAccountWithPhone() {
    let { fields: {OTP}, errorMsg, account } = this.props
    let isRequestingForUpdate = account.isRequestingForAccountUpdate
    let isRequestingForVerification = account.verification.isRequestingForVerification
    return (
      <div className="ui inner-form">
        <form className="ui form" id="id-modal-phoneverifcation-form" onSubmit={this.validateOTP}>
          <div className="field">
            <p className="ui center aligned container">
              {verificationMsgConfig.enterCodeText}
            </p>
          </div>
          <div className="field">
            <input type="number" ref="otp" placeholder="Enter the OTP" {...OTP}/>
            {
              OTP.touched && OTP.error &&
              <FieldError message={OTP.error}></FieldError>
            }
          </div>
          {
            errorMsg ?
            <div className="field">
              <div className="ui auth-form error message">
                {errorMsg}
              </div>
            </div> : null
          }
          <div className="ui field">
            <div className="ui center aligned container">
              <button className={ isRequestingForUpdate ? "ui button red loading": "ui button red" } type="submit">Submit</button>
            </div>
          </div>
        </form>
        <div className="modal-footer-fixed">
          <div className="ui divider"></div>
          <div className="ui form">
            <div className="ui center aligned container two fields">
              <div className="seven wide field">
                <div>OTP Sent.</div>
                <a href="#" onClick={this.sendVerificationCode}>

                  {account.verification.isRequestingForVerification ?
                  <div className="ui active medium loader send-again inline centered"></div>:
                  <span className="ui text red" id="resend">{verificationMsgConfig.resentConfirmation}</span>
                }
                </a>
              </div>
              <div className="two wide field"></div>
              <div className="seven wide field">
                <div>Wrong Phone Number? </div>
                <a href="#" onClick={this.reEntierCredentials}>
                  {account.verification.isRequstingForReEnter ?
                  <div className="ui active medium loader send-again inline centered"></div>:
                  <span className="ui text red" id="id-modal-verifyformfooter-re-enter-button">{verificationMsgConfig.retypeEmailText}</span>
                }
                </a>
              </div>
            </div>
          </div>
        </div>

    </div>
  )
}

  verifyAccountWithEmail(account) {
    let email = account.data && account.data.email
    const regExToPullDomain = /.*@/
    let emailDomainOfUser = email && email.replace(regExToPullDomain, "")
    let hrefForEmail = "http://" + emailDomainOfUser

    return (
      <div className="ui" id="id-page-emailverification-modal">
        <p className="ui center aligned container">
          {verificationMsgConfig.verifyAccountMsg}
        </p>
        <p className="ui center aligned container">
          <a href={hrefForEmail} target="_blank">
            <button className="ui red button" id="email" type="button">
              Verify
            </button>
          </a>
        </p>
        <div className="modal-footer-fixed">
          <div className="ui divider"></div>
          <div className="ui form">
            <div className="ui center aligned container two fields">
              <div className="seven wide field">
                <div>{verificationMsgConfig.emailSentText}</div>
                <a href="#" onClick={this.sendVerificationCode}>
                {account.verification.isRequestingForVerification ?
                  <div className="ui active medium loader send-again inline centered"></div>:
                  <span className="ui text red" id="resend-email">{verificationMsgConfig.resentConfirmation}</span>
                }
                </a>
              </div>
              <div className="two wide field"></div>
              <div className="six wide field">
                <div>Wrong Email? </div>
                <a href="#" onClick={this.reEntierCredentials}>
                {account.verification.isRequstingForReEnter ?
                  <div className="ui active medium loader send-again inline centered"></div>:
                  <span className="ui text red" id="id-modal-verifyformfooter-re-enter-button">{verificationMsgConfig.retypeEmailText}</span>
                }

                </a>
              </div>
            </div>
        </div>
      </div>

      </div>
    )
  }

  verifyAccount() {
    let { account } = this.props
    let incompleteFields = account.incompleteFields
    let isPhoneNotVerified = contains(incompleteFields, 'phone')

    return (
      <div className="ui">
        <p className="ui center aligned container">
          {verificationMsgConfig.verifyAccountMsg}
        </p>
        <p className="ui center aligned container">
          <button className="ui red button" id="email" type="button" onClick={this.sendVerificationCode}>
            {verificationMsgConfig.emailVerifyText}
          </button>
        </p>
        {
          isPhoneNotVerified ?
          <div className="ui">
            <div className="ui horizontal divider">
              Or
            </div>
          <p className="ui center aligned container">
            <button className="ui red button" id="sms" onClick={this.sendVerificationCode}>
              {verificationMsgConfig.sendCodeToMobileText}
            </button>
          </p>
        </div> : null
        }
        <div className="modal-footer-fixed">
          <div className="ui divider"></div>
            <div className="field">
              <div className="ui center aligned container">
                <div>{verificationMsgConfig.incorrectAccText}</div>
                <a href="#" onClick={this.reEntierCredentials}>
                  <span className="ui text red">Login Again</span>
                </a>
              </div>
            </div>
        </div>

      </div>
    )
  }

  render() {
    let { account } = this.props
    if(account && account.toJS) {
      account = account.toJS()
    }
    let isVerified        = account.verification.isVerified,
        isVerifyingWith   = account.verification.isVerifyingWith,
        incompleteFields  = account.incompleteFields,
        verifiedWith      = account.verification.verifiedWith

    let content

    if(!isVerified && isVerifyingWith === "email") {
      return this.verifyAccountWithEmail(account)
    }
    if(!isVerified && isVerifyingWith === "phone") {
      return this.verifyAccountWithPhone(account)
    }
  }

}

export default reduxForm({
  form: 'VerifyAccount',
  fields,
  validate,
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS() //--> workaround for converting redux-form state to immutable
})(VerifyAccount)
