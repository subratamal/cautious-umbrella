import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { createPageNavigationUrl } from '../../utils/createNavigationUrl';
import routeUrls from '../../constants/routeURLConstants';
import * as loginActions from '../../actions/login_modal_actions';
import { closestSelector } from '../../utils/domManipulationUtils';

class SidebarMenu extends React.Component {
  constructor(props) {
    super(props);
    this.hideSidebar = this.hideSidebar.bind(this)
    this.propagateSideMenuLinkClick = this.propagateSideMenuLinkClick.bind(this);
  }

  componentDidMount() {
    this.initializeSideBar();
  }

  initializeSideBar() {
    if ($) {
      const $sidebarMenu = $('.ui.sidebar.menu:not(.processed)');
      if ($sidebarMenu && $sidebarMenu.sidebar) {
        $sidebarMenu.sidebar('attach events', '.ui.sidebar.menu .item', 'hide').addClass('processed');
      }
    }
  }

  propagateSideMenuLinkClick(evt) {
    let routeHref = evt.target.getAttribute('href');
    if (!routeHref) {
      const linkTarget = closestSelector(evt.target, (el) => el.className === 'item route-link');
      routeHref = linkTarget.getAttribute('href');
    }
    this.props.userActions.routeChanged(routeHref);
  }

  hideSidebar(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    const $sidebarMenu = $('.sidebar.menu');
    if ($sidebarMenu.sidebar) $sidebarMenu.sidebar('hide')
  }

  render() {
    return (
      <div className="ui sidebar vertical menu" ref="sidebarMenu" onMouseLeave={this.hideSidebar}>
  		  <Link className="logo-sidebar item" to={'/'}>
          <div className="ui images header logo">
  		  	 <i className="icon header cd full logo" />
          </div>
  		  </Link>
		    <div className="item sidebar-option">
          <div className="ui secondary menu compact">
            <Link className="item route-link" to={routeUrls.homeFeedPage} onClick={this.propagateSideMenuLinkClick}>
              <i className="icon home" />
            </Link>
            <a href={createPageNavigationUrl('search')} className="item route-link" target="_blank" rel="noopener noreferrer">
              <i className="icon search" />
            </a>
            <a href={createPageNavigationUrl('surprise_me')} className="item route-link" target="_blank" rel="noopener noreferrer">
              <i className="icon lightning" />
            </a>
          </div>
        </div>
		    <Link className="item" to={routeUrls.discoverLandingPage} onClick={this.propagateSideMenuLinkClick}>Discover</Link>
		    <Link className="item" to={routeUrls.universityLandingPage} onClick={this.propagateSideMenuLinkClick}>College Finder</Link>
        <Link className="item" to={routeUrls.eventsLandingPage} onClick={this.propagateSideMenuLinkClick}>Events</Link>
        <Link className="item" to={routeUrls.opportunityLandingPage} onClick={this.propagateSideMenuLinkClick}>Opportunities</Link>
        <a href={createPageNavigationUrl('stories')} className="item" target="_blank" rel="noopener noreferrer" >Stories</a>
        <a href={createPageNavigationUrl('topics')} className="item" target="_blank" rel="noopener noreferrer" >Topics</a>
        <a href={createPageNavigationUrl('people')} className="item showdivider" target="_blank" rel="noopener noreferrer">People</a>
        <a href={createPageNavigationUrl('25under25/home')} className="item showdivider" target="_blank" rel="noopener noreferrer">
          25 Under 25
          <i className="icon twnetyfivelogo" /></a>
        <div className="ui divider hidden" />
        <div className="ui divider hidden" />
        <div className="ui bottom fixed vertical menu">
          <div className="item share-icon">
            <a href="https://www.facebook.com/campusdiaries" target="_blank" rel="noopener noreferrer">
                <i className="icon facebook" />
              </a>
              <a href="https://twitter.com/campusdiaries" target="_blank" rel="noopener noreferrer">
                <i className="icon twitter" />
              </a>
              <a href="https://www.linkedin.com/company/campus-diaries" target="_blank" rel="noopener noreferrer">
                <i className="icon linkedin" />
              </a>
              <a href="https://plus.google.com/+Campusdiaries" target="_blank" rel="noopener noreferrer">
                <i className="icon google plus" />
              </a>
          </div>
          <div className="item">
            <div className="ui text footer-menu menu">
              <div className="item">© 2016 Campus Diaries</div>
              <a href={createPageNavigationUrl('about')} className="item" target="_blank" rel="noopener noreferrer">About</a>
              <a href={createPageNavigationUrl('privacy')} className="item" target="_blank" rel="noopener noreferrer">Privacy</a>
              <a href={createPageNavigationUrl('terms')} className="item" target="_blank" rel="noopener noreferrer">Terms</a>
            </div>
          </div>
        </div>
		</div>
    );
  }
}

SidebarMenu.propTypes = {
  userActions: PropTypes.object,
};

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators({
      routeChanged: loginActions.routeChanged,
    }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarMenu);
