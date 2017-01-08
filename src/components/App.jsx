import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Icon } from 'react-semantify';
import api from '../api/api';
import Header from './menu/Header/Header';
import SidebarMenu from './menu/SidebarMenu';
import oauthConfig from '../../config/oauth';
import Footer from './views/Footer';
import VerificationSuccessModal from './elements/VerificationSuccessModal';
import { setTokenRecieved } from '../actions/common_actions';
import * as utils from '../utils/utils';
import { verificationConfig } from '../../config/application'
import oauth_config from '../../config/oauth';
/*
  Root Container
    - shows loading till oauth2 token is recieved
*/
class App extends React.Component {
  static propTypes = {
    props: PropTypes.shape({
      location: PropTypes.string
    })
  }

  constructor() {
    super();
    if(utils.isServer()){
      this.state = {
        showLoading: false,
      };
    } else {
      this.state = {
        showLoading: true,
      };
    }
  }

  componentDidMount() {
    if (!utils.isfetchTokensOnServer()) {
      api.oauthToken().then((token) => {
        const tokenValue = 'Bearer' + ' ' + token.data.access_token;
        utils.setTokenByName('oAuthToken', { tokenValue });
        this.props.setTokenRecieved();
        this.setState({
          showLoading: false,
        });
      });
    } else {
      this.props.setTokenRecieved();
      this.setState({
        showLoading: false,
      });
    }
    const { query } = this.props.location;
    const showVerificationModal = query && query.email_verification && query.email_verification === 'success';
    if (showVerificationModal) {
      setTimeout(() => {
        $('.ui.verification-success').modal('show');
      }, verificationConfig.showModalTime);
      setTimeout(() => {
        $('.ui.verification-success').modal('hide');
      }, verificationConfig.hideModalTime);
    }
  }

  render() {
    const { query, pathname } = this.props.location;
    const showVerificationModal = query && query.email_verification && query.email_verification === 'success';
    return (
      <div>
      {!this.state.showLoading ?
        <div>
          <Header pathName={pathname} />
            {this.props.children}
          <Footer />
        </div> :
         <div className="ui active dimmer">
          <div className="ui text loader custom-loader">
            <Icon className="header cd monogram logo loaderimage" />
          </div>
        </div>
      }
      { showVerificationModal ? <VerificationSuccessModal /> : null }
      <SidebarMenu />
        <div className="ui page inverted dimmer first-load">
          <div className="ui large text loader">Loading...</div>
       </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return { setTokenRecieved: bindActionCreators(setTokenRecieved, dispatch) };
}

// Connects dispatch and props to component
export default connect(mapStateToProps, mapDispatchToProps)(App);
