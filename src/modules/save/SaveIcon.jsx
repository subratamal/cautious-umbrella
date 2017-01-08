import React, { PropTypes } from 'react';
import { Icon } from 'react-semantify';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as saveActions from './actions';

export class SaveButtonStatic extends React.Component {
  constructor(props) {
    super(props);
    this.deleteFunction = this.deleteFunction.bind(this);
    this.saveFunction = this.saveFunction.bind(this);
  }

  saveFunction(e) {
    e.preventDefault();
    const data = this.props;
    this.props.apiActions.save(data.type, data.entityId);
  }

  deleteFunction(e) {
    e.preventDefault();
    const data = this.props;
    this.props.apiActions.removeSave(data.type, data.entityId, data.saved);
  }

  render() {
    const { saved } = this.props;
    let onClick;
    let displayText;
    let classes;
    if (saved && saved !== '0') {
      onClick = this.deleteFunction;
      displayText = 'Saved';
      classes = 'save active red';
    } else {
      onClick = this.saveFunction;
      displayText = 'Save';
      classes = 'save';
    }
    return (
      <a className="item" onClick={onClick}>
          <Icon className={classes} /><span>{displayText}</span>
      </a>
    );
  }
 }

SaveButtonStatic.propTypes = {
  type: PropTypes.string.isRequired,
  entityId: PropTypes.string.isRequired,
  apiActions: PropTypes.object.isRequired,
  relationId: PropTypes.string.isRequired,
  followInProgress: PropTypes.bool,
};

function mapDispatchToProps(dispatch) {
  return {
    apiActions: bindActionCreators(saveActions, dispatch),
  };
}

export const SaveIcon = connect(null, mapDispatchToProps)(SaveButtonStatic);
