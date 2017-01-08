import React, { PropTypes } from 'react';
import { Button, Item, Content } from 'react-semantify';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as connectActions from './actions';


/*
Properties -
reducerName - name of the reducer as specified in defaults for the current page
ParentName - name of the parent as specified in defaults for the current page
storeIndex - index of the data in store where the current entity is stored
sliderDataIndex  - index of the data in slider(required only for primary slider)
entityID - id of the entity to which interactivity is connected
*/

export class ConnectButtonStatic extends React.Component {

  constructor(props) {
    super(props);
    this.connectAction = this.connectAction.bind(this);
    this.approveRequest = this.approveRequest.bind(this);
    this.declineRequest = this.declineRequest.bind(this);
    this.connectData = {};
  }

  connectAction() {
    const { connectInProgress } = this.props;
    const data = Object.assign({}, this.props);
    if (!connectInProgress) {
      this.props.apiActions.makeConnection(data);
    }
  }

  approveRequest() {
    const { connectInProgress } = this.props;
    const data = Object.assign({}, this.props);
    if (!connectInProgress) {
      this.props.apiActions.approveRequest(data);
    }
  }

  declineRequest() {
    const { connectInProgress } = this.props;
    const data = Object.assign({}, this.props);
    if (!connectInProgress) {
      this.props.apiActions.declineRequest(data);
    }
  }

  render() {
    const { connectionStatus, connectInProgress } = this.props;

    return (
      <Content>
      {(connectionStatus === 'no') &&
        <Item type="link" onClick={this.connectAction}>
          <Button
            className={connectInProgress ? 'mini red inverted disabled' : 'mini red'}
          >Connect</Button>
        </Item>
      }
      {connectionStatus === 'requested' &&
        <Item type="link">
          <Button className="mini red inverted disabled" >Requested</Button>
        </Item>
      }
      {(connectionStatus === 'request_received') &&
            <Item>
              <Button onClick={this.approveRequest} className={connectInProgress ? 'mini red inverted disabled' : 'mini red '} >Yes</Button>
              <Button onClick={this.declineRequest} className={connectInProgress ? 'mini disabled default connect-decline-button' : 'mini basic default connect-decline-button'} >no</Button>
            </Item>

      }
      {connectionStatus === 'yes' &&
        <Item type="link" >
          <Button
            className="mini red inverted disabled"
          >Connected</Button>
        </Item>
      }

      </Content>
    );
  }
}

ConnectButtonStatic.propTypes = {
  type: PropTypes.string,
  entityId: PropTypes.string,
  connectInProgress: PropTypes.bool,
  connectionStatus: PropTypes.object,
  apiActions: PropTypes.object,
  connectData: PropTypes.object,
  connected: PropTypes.string,
};

function mapDispatchToProps(dispatch) {
  return {
    apiActions: bindActionCreators(connectActions, dispatch),
  };
}

export const ConnectButton = connect(null, mapDispatchToProps)(ConnectButtonStatic);
