import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createPageNavigationUrl, navigateTo } from '../../utils/createNavigationUrl';
import routeUrls from '../../constants/routeURLConstants';
import * as loginActions from '../../actions/login_modal_actions';


class Footer extends React.Component {
  constructor() {
    super();
    this.propagateSideMenuLinkClick = this.propagateSideMenuLinkClick.bind(this);
  }

  propagateSideMenuLinkClick(evt) {
    const pageName = (evt.target.getAttribute('href') || '');
    this.props.userActions.routeChanged(pageName);

    $('html, body').animate({ scrollTop: 0 }, $(window).innerHeight());
  }

  render() {
    return (
			<div className="ui black inverted vertical footer segment very padded" onClick={navigateTo}>
			  <div className="ui center aligned container">
			    <div className="ui footer-container inverted grid center aligned">
			      <div className="three wide column">
			        <h4 className="ui inverted header">GET IN TOUCH</h4>
			        <div className="ui inverted link list">
			          <a className="item" href={createPageNavigationUrl('about')} target="_blank" rel="noopener noreferrer">About Us</a>
			          <a className="item" href="https://campusdiaries.typeform.com/to/rmIpkt" target="_blank" rel="noopener noreferrer">Contact Us</a>
			        </div>
			      </div>
			      <div className="three wide column" />
			      <div className="four wide column">
			        <h4 className="ui inverted header">HELP</h4>
			        <div className="ui inverted link list">
			          <a className="item" href="https://campusdiaries.typeform.com/to/IeM3QM" target="_blank" rel="noopener noreferrer">Feedback</a>
			          <a className="item" href={createPageNavigationUrl('privacy')} target="_blank" rel="noopener noreferrer">Privacy</a>
			          <a className="item" href={createPageNavigationUrl('terms')} target="_blank" rel="noopener noreferrer">Terms</a>
			        </div>
			      </div>
			      <div className="three wide column" />
			      <div className="three wide column">
			        <h4 className="ui inverted header">COMMUNITY</h4>
			        <div className="ui inverted link list center aligned">
			          <a className="item" href={createPageNavigationUrl('stories')} target="_blank" rel="noopener noreferrer">Stories</a>
			          <a className="item" href={createPageNavigationUrl('people')} target="_blank" rel="noopener noreferrer">People</a>
                <Link className="item" to={routeUrls.eventsLandingPage} onClick={this.propagateSideMenuLinkClick}>Events</Link>
			        </div>
			      </div>
			    </div>
			    <div className="ui section divider hidden" />
			    <div className="ui lists">
				    <div className="ui horizontal inverted link list">
				      <a className="item" href="https://www.facebook.com/campusdiaries" target="_blank" rel="noopener noreferrer">
				      	<i className="icon facebook" />
				      </a>
				      <a className="item" href="https://twitter.com/campusdiaries" target="_blank" rel="noopener noreferrer">
				      	<i className="icon twitter" />
				      </a>
				      <a className="item" href="https://www.linkedin.com/company/campus-diaries" target="_blank" rel="noopener noreferrer">
				      	<i className="icon linkedin" />
				      </a>
				      <a className="item" href="https://plus.google.com/+Campusdiaries" target="_blank" rel="noopener noreferrer">
				      	<i className="icon google plus" />
				      </a>
				    </div>
				</div>
			    <div className="ui horizontal inverted small link list">
			      <a className="item" href="http://semantic-ui.mit-license.org/" target="_blank" rel="noopener noreferrer">© 2016 Campus Diaries • Proudly Made in Bangalore</a>
			    </div>
			  </div>
			</div>
		);
  }
}

Footer.propTypes = {
  userActions: PropTypes.object,
};

function mapStateToProps() {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators({
      routeChanged: loginActions.routeChanged,
    }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
