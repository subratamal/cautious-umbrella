import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Menu, Item, Dropdown, Icon } from 'react-semantify';
import routeUrls from '../../../constants/routeURLConstants';
import { LoginModal } from '../../views/LoginModal';
import { profilePictureThumbnail } from '../../../defaults';
import { env } from '../../../../config';
import { createEntityNavigationUrl } from '../../../utils/createNavigationUrl';
import LogoutMenu from '../../views/LogoutMenu';
import * as loginActions from '../../../actions/login_modal_actions';
import Notification from '../../views/Notification';
import { ConnectionRequest } from '../../../modules/connectionRequests';

class HeaderMenuAuthenticated extends Component {
  constructor(props) {
    super(props);
    this.showSidebar = this.showSidebar.bind(this);
    this.showSidebarMobile = this.showSidebarMobile.bind(this);
    this.propagateSideMenuLinkClick = this.propagateSideMenuLinkClick.bind(this);
  }

  componentDidMount() {
    const $dropdown = $('.ui.dropdown.account-setting');
    if ($dropdown.dropdown) $dropdown.dropdown();
    $('.ui.header-menu .header-item.item').on('click', function click() {
      $('.ui.header-menu .header-item.item').removeClass('activeClass');
      $(this).addClass('activeClass');
    });
  }

  propagateSideMenuLinkClick(evt) {
    const pageName = (evt.target.getAttribute('href') || '');
    this.props.userActions.routeChanged(pageName);
  }

  showSidebar(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    const $sidebarMenu = $('.sidebar.menu');
    if ($sidebarMenu.sidebar) $sidebarMenu
    .sidebar('setting', 'transition', 'overlay')
    .sidebar('toggle');
  }

  showSidebarMobile(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    const $sidebarMenu = $('.sidebar.menu');
    if ($sidebarMenu.sidebar) $sidebarMenu.sidebar('toggle');
  }

  render() {
    const profile = this.props.profile;
    const account = this.props.account;
    const defaultImageUrl = profilePictureThumbnail;
    const isProfileComplete = profile && profile.isComplete;
    const src = profile && profile.display_picture && (profile.display_picture.thumbnail || defaultImageUrl);
    const userProfielUrl = createEntityNavigationUrl(profile.id, profile.type);
    const profileMiniTeaserProps = {
      imageOnClickLink: userProfielUrl,
      imageSource: profile.display_picture ? profile.display_picture.image_100_100 : null,
      primaryTextOnClickLink: userProfielUrl,
      primaryText: profile.name,
      secondaryText: (profile.current_campus && profile.current_campus.data[0] ?
        profile.current_campus.data[0].rel_value : ''),
      isWrapped: false,
    };
    return (
      <div>
      <Menu className="text header-menu logged-menu fixed">
        <Item className="ui images header logo" onClick={this.showSidebarMobile} onMouseEnter={this.showSidebar}>
          <Icon className="header cd monogram logo" />
        </Item>
        <Link className={`item header-item hide-item-mobile ${this.props.currentRoute === routeUrls.homeFeedPage ? 'activeClass' : ''}`} to={routeUrls.homeFeedPage} onClick={this.propagateSideMenuLinkClick}>
          Home
        </Link>
        <Link className={`item header-item hide-item-mobile ${this.props.currentRoute === routeUrls.discoverLandingPage ? 'activeClass' : ''}`} to={routeUrls.discoverLandingPage} onClick={this.propagateSideMenuLinkClick}>
          Discover
        </Link>
        <Link className={`item header-item hide-item-mobile ${this.props.currentRoute === routeUrls.universityLandingPage ? 'activeClass' : ''}`} to={routeUrls.universityLandingPage} onClick={this.propagateSideMenuLinkClick} >
          College Finder
        </Link>
        <Menu className="text right stackable desktop-menu">
          <Item>
            <a className="ui button primary" id="id-header-create-button" href={`${env.API_URL}/node/add/story`} target="_blank" rel="noopener noreferrer">Create</a>
          </Item>
        </Menu>
        <Menu className="text right stackable connection-req-menu-option" >
            <ConnectionRequest pathName={this.props.pathName}/>
        </Menu>
        <Menu className="text right stackable notification-menu-option">
            <Notification pathName={this.props.pathName}/>
        </Menu>

        {this.props.logoutLoader ?
          <Item>
            <div className="ui active small loader inline " />
          </Item> :
          <Dropdown className="item right account-setting" init={false}>
          <a className="ui mini image">
            <img className="ui medium rounded image" src={src} alt="" />
          </a>
          <Icon className="dropdown" />
          <LogoutMenu
            profileTeaser={profileMiniTeaserProps}
            logout={this.props.userActions.logout}
            account={account}
          />

        </Dropdown>
        }
      </Menu>
      {this.props.isLoggedIn && this.props.isAccountVerified && this.isProfileComplete ? null : <LoginModal {...this.props} />}
      </div>
    );
  }
}

HeaderMenuAuthenticated.propTypes = {
  logoutLoader: PropTypes.bool,
  profile: PropTypes.object,
  account: PropTypes.object,
  userActions: PropTypes.object,
  isLoggedIn: PropTypes.bool,
  isAccountVerified: PropTypes.bool,
  currentRoute: PropTypes.string,
};

function mapStateToProps() {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators({
      routeChanged: loginActions.routeChanged,
      logout: loginActions.logout,
    }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderMenuAuthenticated);
