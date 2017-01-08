import React from 'react'
import {
	Segment,
	Button
} from 'react-semantify';
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'
import { toJS } from 'immutable'
import {
	breakPointsDefaults
} from '../../../defaults'
import { LoginModal } from '../LoginModal';
import * as loginActions from '../../../actions/login_modal_actions';
/*
1. Sidebar loginSignup card
2. Title and button of login
3. getLoginSignupCard render card html according login user
*/

class SideBarLoginSignup extends React.Component {
	constructor(props) {
		super(props);
		if (window.innerWidth <= breakPointsDefaults.tablet) {
			this.state = {mobileView: true};
		} else {
			this.state = {mobileView: false};
		}
		this.handleResize = this.handleResize.bind(this);
	}
	_openModal() {
	    $('.ui.modal.auth-modal').modal('show');
	  }
	handleResize(e) {
		if (window.innerWidth <= breakPointsDefaults.tablet && this.state.mobileView == false) {
			this.setState({
				mobileView: true
			});
		} else if(window.innerWidth > breakPointsDefaults.tablet && this.state.mobileView == true) {
			this.setState({
				mobileView: false
			});
		}
	}

	componentDidMount() {
		window.addEventListener('resize', this.handleResize);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
	}

	getLoginSignupCard() {
		let isLoggedIn = this.props.isLoggedIn;
		if(!isLoggedIn) {
			return (
				<Segment>
					<h4 className="ui header">Stay Updated</h4>
					<Button className="primary login-button fluid" onClick={this._openModal}>Sign up</Button>
				</Segment>
			)
		} else {
			return (null)
		}
	}

	render() {
		return	this.getLoginSignupCard()
	}
}

function mapStateToProps(state) {
  return {
    isLoggedIn : state.get('reducer').get('isLoggedIn')
  }
}

function mapDispatchToProps(dispatch) {
  return { loginActions : bindActionCreators( loginActions, dispatch ) }
}

// Connects dispatch and props to component
export default connect(mapStateToProps, mapDispatchToProps)( SideBarLoginSignup );
