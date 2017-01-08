import React, { PropTypes } from 'react';
import { Button, Item, Content } from 'react-semantify';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as followActions from './actions';

export class FollowButtonStatic extends React.Component {
  constructor(props) {
    super(props);
    this.followAction = this.followAction.bind(this);
    this.deleteFollowAction = this.deleteFollowAction.bind(this);
    this.followData = {};
  }

  followAction() {
    const { followInProgress } = this.props;
    const data = Object.assign({}, this.props);
    if (!followInProgress) {
      this.props.apiActions.follows(data);
    }
  }

  deleteFollowAction() {
    const { followInProgress } = this.props;
    const data = Object.assign({}, this.props);
    if (!followInProgress) {
      this.props.apiActions.removeFollow(data);
    }
  }

  render() {
    const { relationId, followInProgress } = this.props;
    return (
       <Content>
       {relationId === '0' || relationId === 'yes' || !relationId ?
         <Item type="link" onClick={this.followAction}>
           <Button
             className={followInProgress ? 'mini red inverted disabled' : 'mini red '}
           >Follow</Button>
         </Item>
             :
         <Item type="link" onClick={this.deleteFollowAction}>
           <Button
             className={followInProgress ? 'mini red disabled' : 'mini inverted red'}
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
  apiActions: PropTypes.object.isRequired,
  relationId: PropTypes.string.isRequired,
  followInProgress: PropTypes.bool,
};

function mapDispatchToProps(dispatch) {
  return {
    apiActions: bindActionCreators(followActions, dispatch),
  };
}

export const FollowButton = connect(null, mapDispatchToProps)(FollowButtonStatic);
