import React, { PropTypes } from 'react';
import { Button, Item } from 'react-semantify';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as applyActions from './actions';

export class ApplyButtonStatic extends React.Component {
  constructor(props) {
    super(props);
    this.unApply = this.unApply.bind(this);
    this.apply = this.apply.bind(this);
  }

  unApply() {
    const relId = this.props.applied;
    const opportunityId = this.props.entityId;
    this.props.apiActions.unApply(opportunityId, relId);
  }

  apply() {
    const opportunityId = this.props.entityId;
    this.props.apiActions.apply(opportunityId);
  }


  render() {
    let btnClass = 'mini';
    const largeButton = this.props.large;
    if (largeButton) {
      btnClass = '';
    }
    const { applied } = this.props;
    if (applied && applied !== '0') {
      return (
         <Item type="link">
          <Button onClick={this.unApply} className={`${btnClass} inverted red`}>
            Applied
          </Button>
         </Item>);
    }

    return (
        <Item type="link">
          <Button onClick={this.apply} className={`${btnClass} red`}>
            Apply
          </Button>
        </Item>);
  }
 }

ApplyButtonStatic.propTypes = {
  type: PropTypes.string.isRequired,
  entityId: PropTypes.string.isRequired,
  apiActions: PropTypes.object.isRequired,
  relationId: PropTypes.string.isRequired,
  followInProgress: PropTypes.bool,
  applied: PropTypes.any,
  large: PropTypes.bool,
};

function mapDispatchToProps(dispatch) {
  return {
    apiActions: bindActionCreators(applyActions, dispatch),
  };
}

export const ApplyButton = connect(null, mapDispatchToProps)(ApplyButtonStatic);
