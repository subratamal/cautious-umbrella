import React from 'react';
import { Button } from 'react-semantify';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import routeUrls from '../../../constants/routeURLConstants';
import { isServer, isUnitTesting } from '../../../utils/utils';
import { breakPointsDefaults } from '../../../defaults';

const mastHeadDesktopImage = require('../../../../static/images/landingPageCover-deskTop.png');
const mastHeadMobileImage = require('../../../../static/images/landingPageCover-mobile.png');

class LandingPageViewStatic extends React.Component {
  constructor() {
    super()
    if (window.innerWidth <= breakPointsDefaults.tablet) {
      this.state = {
        mobileView: true,
      };
    } else {
      this.state = {
        mobileView: false,
      };
    }

    // Override the state.mobileView incase of server rendering.
    if (isServer() && !isUnitTesting()) {
      this.state = {
        mobileView: false,
      };
    }
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    if (window.innerWidth <= breakPointsDefaults.tablet && this.state.mobileView == false) {
      this.setState({
        mobileView: true,
      });
    } else if (window.innerWidth > breakPointsDefaults.tablet && this.state.mobileView == true) {
      this.setState({
        mobileView: false,
      });
    }
  }

  openModal() {
    $('.ui.auth-modal.modal').modal('show');
  }

  render() {
    const self = this;
    let mastHeadImg = mastHeadDesktopImage;
    if (self.state.mobileView) {
      mastHeadImg = mastHeadMobileImage;
    }
    const mastHead = {
      background: `linear-gradient(0deg, rgba(0, 0, 0, 0.22),rgba(0, 0, 0, 0.22)),url(${mastHeadImg}) center center no-repeat`,
      backgroundSize: 'cover' /* In css required importent */,
    };
    return (
      <div className="ui page grid padded landing-page">
        <div className="column">
          <div className="row">
            <div className="sixteen column wide masthead" style={mastHead}>
              <div className="ui text text-container">
                <div className="ui basic segment page grid">
                  <h1
                    className="ui inverted huge header center aligned container"
                  >Kickass Connections, Experiences and Opportunities for Students
                  </h1>
                  <h2 className="ui inverted large header center aligned container">
                    Join an inspiring student community from across campuses and different disciplines
                  </h2>
                  <div className="ui sixteen wide column" />
                  <div
                    className="ui text center aligned container sixteen wide column button-option"
                  >
                  {!this.props.isLoggedIn ||
                   !this.props.isAccountVerified ?
                   <Button className=" primary" onClick={this.openModal}>Signup</Button>
                   : ''}
                 <Link className="ui inverted red button" to={routeUrls.discoverLandingPage}>
                   Discover
                 </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

const LandingPageView = connect(mapStateToProps)(LandingPageViewStatic);
export default LandingPageView;
