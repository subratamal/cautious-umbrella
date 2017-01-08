import React, { PropTypes } from 'react';
import { Button, Item, Content } from 'react-semantify';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as connectActions from '../../../actions/connect_actions';


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
    const data = {
      type: this.props.type,
      entityId: this.props.entityId,
      storeIndex: this.props.storeIndex,
      sliderDataIndex: this.props.sliderDataIndex,
      componentName: this.props.componentName,
      parentComponent: this.props.parentComponent,
    };
    const connectData = this.props.connectData.toJS();
    if (!connectData.isConnecting) {
      this.props.apiActions.makeConnection(data);
    }
  }

  approveRequest() {
    const connectData = this.props.connectData.toJS();
    const data = {
      type: this.props.type,
      entityId: this.props.entityId,
      storeIndex: this.props.storeIndex,
      sliderDataIndex: this.props.sliderDataIndex,
      componentName: this.props.componentName,
      parentComponent: this.props.parentComponent,
      connectionId: connectData.connectionId ? connectData.connectionId : connectData.connection_rel_id,
    };
    if (!connectData.isConnecting) {
      this.props.apiActions.approveRequest(data);
    }
  }

  declineRequest() {
    const connectData = this.props.connectData.toJS();
    const data = {
      type: this.props.type,
      entityId: this.props.entityId,
      storeIndex: this.props.storeIndex,
      sliderDataIndex: this.props.sliderDataIndex,
      componentName: this.props.componentName,
      parentComponent: this.props.parentComponent,
      connectionId: connectData.connectionId ? connectData.connectionId : connectData.connection_rel_id,
    };
    if (!connectData.isConnecting) {
      this.props.apiActions.declineRequest(data);
    }
  }

  render() {
    let connectData = {};
    if (this.props.connectData && this.props.connectData.toJS()) {
      connectData = this.props.connectData.toJS();
    }
    const connectFlag = connectData.connected;

    return (
      <Content>
      {(connectFlag === 'no') &&
        <Item type="link" onClick={this.connectAction}>
          <Button
            className={connectData.isConnecting ? 'mini red inverted disabled' : 'mini red'}
          >Connect</Button>
        </Item>
      }
      {connectFlag === 'requested' &&
        <Item type="link">
          <Button className="mini red inverted disabled" >Requested</Button>
        </Item>
      }
      {(connectFlag === 'request_received') &&
            <Item>
              <Button onClick={this.approveRequest} className={connectData.isConnecting ? 'mini red inverted disabled' : 'mini red '} >Yes</Button>
              <Button onClick={this.declineRequest} className={connectData.isConnecting ? 'mini disabled' : 'mini basic default connect-decline-button '} >no</Button>
            </Item>

      }
      {connectFlag === 'yes' &&
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
  storeIndex: PropTypes.number,
  sliderDataIndex: PropTypes.number,
  componentName: PropTypes.string,
  parentComponent: PropTypes.string,
  connectionId: PropTypes.object,
  apiActions: PropTypes.object,
  connectData: PropTypes.object,
  connected: PropTypes.string,
};
/* if the interactivtiy card is in slider it will have sliderDataIndex */

function mapStateToProps(state, props) {
  if (props.sliderDataIndex !== undefined && props.componentName === 'HomePageFeed') {
    if (state.get(props.reducerName).get(props.componentName).get('data').get(props.sliderDataIndex)) {
      return {
        connectData:
        state.get(props.reducerName).get(props.componentName).get('data').get(props.sliderDataIndex).get('objects').get('data').get(props.storeIndex),
      };
    }
    return { connectData: null };
  } else if(props.sliderDataIndex !== undefined) {
    if (state.get(props.reducerName).get(props.componentName).get('data').get(props.sliderDataIndex)) {
      return {
        connectData:
        state.get(props.reducerName).get(props.componentName).get('data').get(props.sliderDataIndex).get('data').get(props.storeIndex),
      };
    }
    return { connectData: null };
  }

  return {
    connectData:
    state.get(props.reducerName).get(props.componentName).get('data').get(props.storeIndex),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    apiActions: bindActionCreators(connectActions, dispatch),
  };
}

export const ConnectButton = connect(mapStateToProps, mapDispatchToProps)(ConnectButtonStatic);
