import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as loginActions from '../../../actions/login_modal_actions';
import { isfetchTokensOnServer } from '../../../utils/utils';
import HeaderMenuAnonymous from './HeaderMenuAnonymous';
import HeaderMenuAuthenticated from './HeaderMenuAuthenticated';

class Header extends React.Component {
  componentDidMount() {
    if (!isfetchTokensOnServer()) {
      this.props.userActions.checkForLoginState();
    }
    this.props.userActions.routeChanged(this.props.pathName);
    if (this.props.isLoggedIn && this.props.profile.isComplete && this.props.isAccountVerified) {
      $('.ui.modal.auth-modal').modal('hide');
      $('.ui.modal.auth-modal').remove();

      const $sidebarMenu = $('.ui.sidebar.menu');
      $sidebarMenu.sidebar('hide');
    }
  }

  render() {
    const { isAccountVerified, isLoggedIn } = this.props;
    let { profile, account } = this.props;
    profile = profile.toJS();
    account = account.toJS();

    const header = isLoggedIn ?
      <HeaderMenuAuthenticated {...this.props} account={account.data} profile={profile.data} /> :
      <HeaderMenuAnonymous {...this.props} />;
    return (
      header
    );
  }
}

Header.propTypes = {
  profile: PropTypes.object,
  isAccountVerified: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  reEnterCreds: PropTypes.func,
  account: PropTypes.object,
  userActions: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    logoutLoader: state.get('reducer').get('logoutLoader'),
    isLoggedIn: state.get('reducer').get('isLoggedIn'),
    reEnterCreds: state.get('reducer').get('reEnterCreds'),
    isCheckingLoginState: state.get('reducer').get('isCheckingLoginState'),
    profile: state.get('profile'),
    account: state.get('account'),
    isAccountVerified: state.get('account').get('verification').get('isVerified'),
    currentRoute: state.get('account').get('currentRoute'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators({
      logout: loginActions.logout,
      checkForLoginState: loginActions.checkForLoginState,
      removeReEntierCredentials: loginActions.removeReEntierCredentials,
      routeChanged: loginActions.routeChanged,
    }, dispatch),
  };
}
// Connects dispatch and props to component
export default connect(mapStateToProps, mapDispatchToProps)(Header);
