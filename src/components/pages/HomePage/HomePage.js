// module imports
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toJS } from 'immutable';

// file import
import * as loginActions from '../../../actions/login_modal_actions';
import * as homePageActions from '../../../actions/homePage_actions';
import HomePageContainer from './HomePageContainer';
import LandingPageContainer from '../LandingPage/LandingPageContainer';
import { fetchTopics, fetchProfiles, fetchPages, fetchBodyStories, fetchBodyEvents, fetchPrimarySliderContent } from '../../../actions/landingPage_firebase_actions';


class HomePage extends React.Component {
  static fetchData({ dispatch, params = {}, query = {}, locale }) {
    return Promise.all(
      [fetchTopics, fetchProfiles, fetchPages, fetchBodyStories, fetchBodyEvents, fetchPrimarySliderContent].map(actionCreator => dispatch(actionCreator({ params, query, locale })))
    );
  }

  constructor(props) {
    super(props);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.isLoggedIn != this.props.isLoggedIn) {
      this.props.apiActions.resetHomePage();
    }
  }

  render() {
    let { profile, isAccountVerified, isLoggedIn } = this.props;
    profile = profile.toJS();
    if (isLoggedIn && profile.isComplete && isAccountVerified) {
      return <HomePageContainer {...this.props} />;
    } else {
      return <LandingPageContainer {...this.props} />;
    }
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.get('reducer').get('isLoggedIn'),
    isCheckingLoginState: state.get('reducer').get('isCheckingLoginState'),
    profile: state.get('profile'),
    isAccountVerified: state.get('account').get('verification').get('isVerified'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators({
      checkForLoginState: loginActions.checkForLoginState,
    }, dispatch),
    apiActions: bindActionCreators(homePageActions, dispatch),
  };
}
// Connects dispatch and props to component
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
