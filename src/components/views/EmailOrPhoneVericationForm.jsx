import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import { toJS } from 'immutable';
import { contains } from 'underscore';
import { validationErrors as Errors, verificationMsgConfig} from '../../constants/messagesConfig'
class EmailOrPhoneVericationForm extends React.Component {
  constructor(props) {
    super(props);
    this.validateOTP.bind(this);
    this.sendVerificationCode.bind(this);
  };

  validateOTP(event) {
    event.preventDefault();
    let { otp } = this.refs;
    let { UIActions } = this.props;

    if(otp.value.toString().length !== 6) {
      return UIActions.handleError(Errors.OTP.min)
    }else {
      //if error present, clear the error.
      UIActions.handleError(Errors.noError)
    }

    let { profile, account, ApiActions } = this.props;
    let enteredOTP = otp && otp.value;

    if(enteredOTP){
        UIActions.loading(true)
        ApiActions.validateOTP(profile, account.id, enteredOTP)
    }
  };

  sendVerificationCode(event) {
    event.preventDefault();
    let { UIActions, ApiActions, account } = this.props;

    let toPhone = event.target.id === "sms" ? true : false || event.target.id === "resend" ? true : false
    UIActions.loading(true);

    if( toPhone ) {
      ApiActions.sendVerificationCode(account.id, "phone")
    }else if(event.target.id === "email"){
      ApiActions.sendVerificationCode(account.id, "email")
    }else {
      UIActions.loading(false);
      return
    }

  };

  render() {

    let { fields, UILoading, error, verification_status, success } = this.props;
    let hasPhoneField = contains(fields, 'phone');
    let hasEmailField = contains(fields, 'email');

    if(verification_status && verification_status.toJS) {
      verification_status = verification_status.toJS();

      //using var becuase this should be accessed out of the block.
      var
        method = verification_status.method,
        sent = verification_status.sent;

    }


    if( !sent ) {
      return (
        <div className="ui">
          <p className="ui center aligned container">
          {verificationMsgConfig.verifyAccountMsg}
          </p>
          {
            success ?
            <div class="ui positive message">
              <div class="header">
                {success}
              </div>
            </div> : null
          }
          {
            hasEmailField ?
            <p className="ui center aligned container">
              <button className="ui inverted red button" id="email" type="button" onClick={this.sendVerificationCode}>
                {verificationMsgConfig.emailVerifyText}
              </button>
            </p> : null
          }
          {
            hasPhoneField && hasEmailField ?
            <div className="ui horizontal divider">
              Or
            </div> : null
          }
          {
            hasPhoneField ?
            <p className="ui center aligned container">
              <button className="ui inverted red button" id="sms" onClick={this.sendVerificationCode}>
              {verificationMsgConfig.sendCodeToMobileText}
              </button>
            </p> : null
          }
          <div className="modal-footer-fixed">
            <div className="ui divider"></div>
              <div className="field">
                <div className="ui center aligned container">
                
                  <div>{verificationMsgConfig.incorrectAccText}</div>
                  <a href="#" onClick={this.props.goBacktoLogin}>
                    <span className="ui text red">Login Again</span>
                  </a>
                </div>
              </div>
          </div>
          {
            UILoading ?
            <div className="ui active dimmer">
              <div className="ui text loader">Loading</div>
            </div>
            : null
          }
      </div>
      )
    }

    if(sent && method === "email") {
      return (
        <div className="ui success message">
          <div className="header">
          {verificationMsgConfig.codeSentText}
          </div>
        </div>
      )
    }

    if(sent && method === "sms") {
      return (
        <div className="ui form">
          {
            error ?
            <div className="ui negative message">
              <p>
                {error}
              </p>
            </div> : null
          }
          <div className="ui grid field">
            <div className="sixteen wide column">
              <p className="ui center aligned container">
              {verificationMsgConfig.enterCodeText}
              </p>
            </div>
          </div>
          <div className="field">
            <input type="number" ref="otp" min="6" max="6" placeholder="123456"/>
          </div>
          <div className="ui grid field">
            <div className="ui center aligned container sixteen wide column">
              <button className={ UILoading ? "ui button red inverted loading": "ui button red inverted" } type="submit" onClick={this.validateOTP}>Submit</button>
            </div>
          </div>
          <div className="ui divider"></div>
            <div className="field">
              <div className="ui right aligned container">
                <p>
                  {verificationMsgConfig.notRecievedText}
                </p>
                <a href="#" onClick={this.sendVerificationCode}>
                  <span className="ui text red" id="resend">
                  {verificationMsgConfig.resentConfirmation}
                  </span>
                </a>
              </div>
            </div>
          </div>
        )
      }

  }
}

function mapStateToProps(state) {
  return {
    error: state.get('reducer').get('error'),
    success : state.get('reducer').get('succes'),
    UILoading: state.get('reducer').get('UILoading'),
    verification_status : state.get('reducer').get('verification_status')
  }
}

export default connect(mapStateToProps)(EmailOrPhoneVericationForm);
