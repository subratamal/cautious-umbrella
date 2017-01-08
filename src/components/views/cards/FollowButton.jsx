import React, { PropTypes } from 'react';
import { Button, Item, Content } from 'react-semantify';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as followActions from '../../../actions/follow_actions';

/*
Properties -
reducerName - name of the reducer as specified in defaults for the current page
ParentName - name of the parent as specified in defaults for the current page
storeIndex - index of the data in store where the current entity is stored
sliderDataIndex  - index of the data in slider(required only for primary slider)
entityID - id of the entity to which interactivity is connected
*/

export class FollowButtonStatic extends React.Component {
  constructor(props) {
    super(props);
    this.followAction = this.followAction.bind(this);
    this.deleteFollowAction = this.deleteFollowAction.bind(this);
    this.followData = {};
  }

  followAction() {
    const { followData } = this.props;
    const data = Object.assign({}, this.props);
    if (followData !== undefined &&
    !followData.get('isFollowing')) {
      this.props.apiActions.follows(data);
    } else {
      this.props.apiActions.follows(data);
    }
  }

  deleteFollowAction() {
    const { followData } = this.props;
    const data = Object.assign({}, this.props);
    if (!followData.get('isFollowing')) {
      if (this.props.type === 'page') {
        data.followId = followData.get('following');
        this.props.apiActions.removeFollow(data);
      } else if (this.props.type === 'topic') {
        data.followId = followData.get('subscribed');
        this.props.apiActions.removeFollow(data);
      }
    }
  }

  render() {
    let followData = {};
    if (this.props.followData && this.props.followData.toJS()) {
      followData = this.props.followData.toJS();
    }
    const followFlag = followData.following ? followData.following : followData.subscribed;
    return (
      <Content>
      {followFlag === '0' || followFlag === 'yes' || !followFlag ?
        <Item type="link" onClick={this.followAction}>
          <Button
            className={followData.isFollowing ? 'mini red inverted disabled' : 'mini red '}
          >Follow</Button>
        </Item>
            :
        <Item type="link" onClick={this.deleteFollowAction}>
          <Button
            className={followData.isFollowing ? 'mini red disabled' : 'mini inverted red'}
          >Following</Button>
        </Item>
          }
      </Content>
    );
  }
}

FollowButtonStatic.propTypes = {
  type: PropTypes.string.isRequired,
  entityId: PropTypes.string.isRequired,
  storeIndex: PropTypes.number.isRequired,
  sliderDataIndex: PropTypes.number,
  componentName: PropTypes.string.isRequired,
  parentComponent: PropTypes.string.isRequired,
  connectionId: PropTypes.string,
  apiActions: PropTypes.object.isRequired,
  followData: PropTypes.object,
  subscribed: PropTypes.string,
};
/* if the interactivtiy card is in slider it will have sliderDataIndex */

function mapStateToProps(state, props) {
  if (props.sliderDataIndex !== undefined && props.componentName === 'HomePageFeed') {
    if (state.get(props.reducerName)
    .get(props.componentName).get('data').get(props.sliderDataIndex)) {
      return {
        followData:
        state.get(props.reducerName).get(props.componentName).get('data').get(props.sliderDataIndex)
        .get('objects')
        .get('data')
        .get(props.storeIndex),
      };
    }
    return { followData: null };
  } else if (props.sliderDataIndex !== undefined) {
    if (state.get(props.reducerName).get(props.componentName).get('data').get(props.sliderDataIndex)) {
      return {
        followData:
        state.get(props.reducerName).get(props.componentName).get('data').get(props.sliderDataIndex)
        .get('data')
        .get(props.storeIndex),
      };
    }
    return { connectData: null };
  }
  return {
    followData:
    state.get(props.reducerName).get(props.componentName).get('data').get(props.storeIndex),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    apiActions: bindActionCreators(followActions, dispatch),
  };
}

export const FollowButton = connect(mapStateToProps, mapDispatchToProps)(FollowButtonStatic);
