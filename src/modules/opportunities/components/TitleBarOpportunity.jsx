import React from 'react';
import {
  Icon,
  Button,
} from 'react-semantify';


class TitleBarOpportunityStatic extends React.Component {
  constructor(props) {
    super(props);
    this.followButtonData = null;
    this.deleteFunction = this.deleteFunction.bind(this);
    this.saveFunction = this.saveFunction.bind(this);
    this.unApply = this.unApply.bind(this);
    this.apply = this.apply.bind(this);
  }

  unApply() {
    const relId = this.props.componentData[0].applied;
    const opportunityId = this.props.componentData[0].id;
    this.props.apiActions.unApply(opportunityId, relId);
  }

  apply() {
    const opportunityId = this.props.componentData[0].id;
    this.props.apiActions.apply(opportunityId);
  }

  saveFunction(e) {
    e.preventDefault();
    const data = this.props.componentData[0];
    this.props.apiActions.save(data.type, data.id);
  }

  deleteFunction(e) {
    e.preventDefault();
    const data = this.props.componentData[0];
    this.props.apiActions.removeSave(data.type, data.id, data.saved);
  }

  render() {
    const opportunityDetails =
    this.props.componentData && this.props.componentData.length > 0 ? this.props.componentData[0] : null;
    if (!opportunityDetails) {
      return null;
    }
    let applyButton = null;
    if (opportunityDetails) {
      if (!opportunityDetails.applied) {
        applyButton = (
            <a>
            <Button onClick={this.apply} className="primary">Apply</Button></a>
          );
      } else if (opportunityDetails.redirect_url) {
        applyButton = (<a
          target="_blank"
          href={opportunityDetails.redirect_url}
          rel="noopener noreferrer"
        ><Button onClick={this.apply} className="primary red inverted">Applied</Button></a>);
      } else {
        applyButton = (<a><Button onClick={this.apply} className="primary red inverted">Applied</Button></a>);
      }
    }
    return (
      <div className="item title-bar-opportunity title-bar-opportunity-view">
        <div className="ui buttons item">
          {applyButton}
        </div>
        <div className="item" style={{ margin: '0.5em' }}>
          {opportunityDetails && opportunityDetails.saved
            ?
            <a className="ui item opportunity-interactions" onClick={this.deleteFunction}>
                <Icon className="save active red" />
                Saved
            </a>
            :
            <a onClick={this.saveFunction} className="ui item opportunity-interactions">
              <Icon className="save" />
              Save
            </a>
          }
        </div>
        <div className="item">
          <a className="opportunity-interactions ui item" onClick={this.props.onShareClick}>
              <Icon className="share" />
              Share
         </a>
        </div>
      </div>
		);
  }
}

TitleBarOpportunityStatic.propTypes = {
  componentData: React.PropTypes.array,
  apiActions: React.PropTypes.object,
  onShareClick: React.PropTypes.func,
};


export default(TitleBarOpportunityStatic);
