import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Menu, Item, Dropdown, Button, Icon } from 'react-semantify';
import { LoginModal } from '../../views/LoginModal';
import routeUrls from '../../../constants/routeURLConstants';
import { createPageNavigationUrl } from '../../../utils/createNavigationUrl';
import * as loginActions from '../../../actions/login_modal_actions';


class HeaderMenuAnonymous extends React.Component {
  constructor() {
    super();
    this.showSidebar = this.showSidebar.bind(this);
    this.showSidebarMobile = this.showSidebarMobile.bind(this);
    this.propagateSideMenuLinkClick = this.propagateSideMenuLinkClick.bind(this);
  }

  componentDidMount() {
    const $dropdown = $('.ui.dropdown');
    if ($dropdown.dropdown) $dropdown.dropdown();
    $('.ui.header-menu .header-item.item').on('click', () => {
      $('.ui.header-menu .header-item.item').removeClass('activeClass');
      $(this).addClass('activeClass');
    });
    if (this.props.reEnterCreds) {
      $('.ui.modal.auth-modal').modal('show');
      this.props.userActions.removeReEntierCredentials();
    }
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
    .sidebar('show');
  }

  showSidebarMobile(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    const $sidebarMenu = $('.sidebar.menu');
    if ($sidebarMenu.sidebar) $sidebarMenu.sidebar('toggle');
  }

  openModal() {
    $('.ui.modal.auth-modal').modal('show');
  }

  render() {
    const { isCheckingLoginState } = this.props;
    return (
      <div>
        <Menu className="text fixed header-menu">
          <Item className="ui images header logo item" onClick={this.showSidebarMobile} onMouseEnter={this.showSidebar} >
            <Icon className="header cd monogram logo mobile-logo" />
            <Icon className="header cd full logo tablet-logo" />
          </Item>
          <Menu className="text right stackable desktop-menu">
          <Link className={`item header-item ${this.props.currentRoute === routeUrls.eventsLandingPage ? 'activeClass' : ''}`} to={routeUrls.eventsLandingPage} onClick={this.propagateSideMenuLinkClick}>
            Events
          </Link>
          <Link className={`item header-item hide-item-mobile ${this.props.currentRoute === routeUrls.universityLandingPage ? 'activeClass' : ''}`} to={routeUrls.universityLandingPage} onClick={this.propagateSideMenuLinkClick} >
            College Finder
          </Link>
            <a className="item header-item" href={createPageNavigationUrl('about')} target="_blank" rel="noopener noreferrer">
              About
            </a>
          </Menu>
          <Dropdown className="right item mobile-menu" init={false}>
            <Icon className="list" />
            <Menu>
              <Link className="item" to={routeUrls.eventsLandingPage}>
              Events
            </Link>
            <Link className="item" to={routeUrls.universityLandingPage}>
              College Finder
            </Link>
            <a className="item" href={createPageNavigationUrl('about')} target="_blank" rel="noopener noreferrer">
              About
            </a>
            </Menu>
          </Dropdown>
            <Item>
            {isCheckingLoginState ? null :
              <Button className="primary login-button" id="id-header-login-button" onClick={this.openModal}>Login</Button>
            }
            </Item>
        </Menu>
      <LoginModal {...this.props} />
      {
        isCheckingLoginState ? <div className="ui page active dimmer">
                  <div className="ui text loader custom-loader">
                    <Icon className="header cd monogram logo loaderimage" />
                  </div>
                </div> : null
      }
      </div>
    );
  }
}

HeaderMenuAnonymous.propTypes = {
  userActions: PropTypes.object,
  isCheckingLoginState: PropTypes.bool,
  currentRoute: PropTypes.string.isRequired,
  reEnterCreds: PropTypes.bool,
};

function mapStateToProps() {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators({
      routeChanged: loginActions.routeChanged,
      removeReEntierCredentials: loginActions.removeReEntierCredentials,
    }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderMenuAnonymous);
