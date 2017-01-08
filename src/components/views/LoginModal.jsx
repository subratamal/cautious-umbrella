import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toJS } from 'immutable';

import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

import { Icon } from 'react-semantify';
import LoginWithEmailForm from './LoginForm';
import VerifyAccount from './VerifyAccount';
import * as loginModalActions from '../../actions/login_modal_actions';

import { update } from '../../actions/profile';
import * as accountActions from '../../actions/accounts';

import { facebookConfig } from '../../../config/social';
import { googleConfig } from '../../../config/social';
import { customMessages } from '../../constants/messagesConfig';
import UpdateProfile from './UpdateProfile';

class Login extends React.Component {
  constructor(props) {
    super(props);
    // Closing all login modals before creating new one.
    // This is to avoid multiple login modals.
    try {
      $('.ui.modal.auth-modal').modal('hide');
      $('.ui.modal.auth-modal').remove();
    } catch (exp) {
    }
  }

  shouldComponentUpdate(nextProps) {
    const profile = nextProps.profile.toJS();
    const account = nextProps.account.toJS();
    if (nextProps.isLoggedIn && profile.isComplete && account.verification.isVerified) {
      return false;
    } else {
      return true;
    }
  }

  // response callback from facebook
  responseFacebook(response) {
    const { actions } = this.props;
    if (response && response.accessToken) {
      actions.loginWithSocialAccount(response, true);
    } else {
      // if signin failed
      actions.handleLoginError(customMessages.tryAgain);
    }
  }

  // response callback from google
  responseGoogle(response) {
    const { actions } = this.props;
    if (response) {
      actions.loginWithSocialAccount(response, false);
      // actions.loginWithSocialAccount(response, false)
    } else {
      // if signin failed
      actions.handleLoginError(customMessages.tryAgain);
    }
  }

  updateProfile() {
    return (
      <UpdateProfile {...this.props}></UpdateProfile>
    );
  }

  verifyAccount(account) {
    let { error } = this.props;
    return (
      <VerifyAccount {...this.props} account={account} errorMsg={error}></VerifyAccount>
    );
  }

  loginWithSocialAccountOrEmail(fbId, gpId) {
    const { isLoggingInVia } = this.props;
    return (
      <div className="ui grid">
      <div className="sixteen wide column facebook-section">
        <FacebookLogin
          appId={fbId}
          autoLoad={false} callback={this.responseFacebook.bind(this)}
          cssClass={isLoggingInVia === 'facebook' ? 'ui button fluid facebook loading' : 'ui button fluid facebook'}
          icon="facebook normal icon"
        />
      </div>
      <div className="sixteen wide column google-section">
        <GoogleLogin
          clientId={gpId}
          className={isLoggingInVia === 'google' ? 'ui google plus button fluid loading' : 'ui google plus button fluid'}
          onSuccess={this.responseGoogle.bind(this)}
          onFailure={this.responseGoogle.bind(this)}
        >
        <Icon className="googleplus" />
        <span>Login With Google</span>
        </GoogleLogin>
      </div>
      <div className="ui horizontal divider modal-divider">
        or
      </div>
      <LoginWithEmailForm {...this.props} errorMsg={this.props.error} />
      </div>
    );
  }

  render() {
    const facebookClientId = facebookConfig.client_id,
      googleClientId = googleConfig.client_id;

    let { isLoggedIn, profile, account, isRedirectOnHold } = this.props;

    if (profile) {
      profile = profile.toJS();
    }
    if (account) {
      account = account.toJS();
    }

    let isProfileComplete = profile && profile.isComplete,
      isAccountVerified = account && account.isVerified;

    let content;

    if (!isLoggedIn) content = this.loginWithSocialAccountOrEmail(facebookClientId, googleClientId);
    if (isLoggedIn && isRedirectOnHold && !isProfileComplete) content = this.updateProfile();
    if (isLoggedIn && isRedirectOnHold && isProfileComplete && !isAccountVerified) content = this.verifyAccount(account);
    return (
      <div className="ui tiny modal auth-modal" ref="uiModal">
        <i className="close icon"></i>
        <h2 className="ui icon header">Sign Up / Login</h2>
        <div className="content">
          {content}
        </div>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    isRedirectOnHold: state.get('reducer').get('isRedirectOnHold'),
    form_cache: state.get('reducer').get('form_cache'),
    error: state.get('reducer').get('error'), // to show errors
    isLoggedIn: state.get('reducer').get('isLoggedIn'), // to show loading indicator,
    isLoggingInVia: state.get('reducer').get('isLoggingInVia'), // to show loading indicator,
    account: state.get('account'),
    profile: state.get('profile'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(loginModalActions, dispatch),
    accountActions: bindActionCreators(accountActions, dispatch),
    profileActions: bindActionCreators({ update }, dispatch),
  };
}

export const LoginModal = connect(mapStateToProps, mapDispatchToProps)(Login);
