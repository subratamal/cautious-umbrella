import React from 'react';
import { connect } from 'react-redux';
import { Card, Grid, Column, Content, Icon, Button } from 'react-semantify';
import DocumentMeta from 'react-document-meta';
import currencies from '../../../../static/currencies';
import { createOpportunitiesDateFormat } from '../../../utils/formatDate';
import { generateOpportunityViewPageMetaTags } from '../../../utils/metaTags';

class OpportunityTitleCard extends React.Component {
  constructor(props) {
    super(props);
    this.unApply = this.unApply.bind(this);
    this.apply = this.apply.bind(this);
  }

  componentWillUpdate(nextProps) {
    if (nextProps.isLoggedIn !== this.props.isLoggedIn) {
      this.props.apiActions.fetchOpportunitiesViewData({ params: this.props.params, query: null, locale: null });
    }
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

  render() {
    const opportunityDetails = this.props.componentData ? this.props.componentData[0] : null;
    let currencyIcon = '$';
    if (opportunityDetails && opportunityDetails.compensation && opportunityDetails.compensation.currency && opportunityDetails.paid !== '0') {
      currencyIcon = currencies[opportunityDetails.compensation.currency].symbol;
    }
    const metaTags = generateOpportunityViewPageMetaTags(opportunityDetails);
    const deadline = opportunityDetails && opportunityDetails.deadline ? createOpportunitiesDateFormat(opportunityDetails.deadline) : null;
    const vacancies = opportunityDetails && opportunityDetails.vacancies ? opportunityDetails.vacancies : null;
    let applyButton = null;
    if (opportunityDetails) {
      if (!opportunityDetails.applied) {
        applyButton = (
            <a className="item">
            <Button onClick={this.apply} className="primary">Apply</Button></a>
          );
      } else if (opportunityDetails.redirect_url) {
        applyButton = (<a
          target="_blank"
          href={opportunityDetails.redirect_url}
          rel="noopener noreferrer"
          className="item"
        ><Button onClick={this.unApply} className="primary red inverted">Applied</Button></a>);
      } else {
        applyButton = (<a className="item"><Button onClick={this.unApply} className="primary red inverted">Applied</Button></a>);
      }
    }
    return (
            opportunityDetails ?
              <DocumentMeta {...metaTags}>
              <Grid id="opportunity-title-card" className="opportunity-title-card">
                <Column>
                  <Card className="fluid">
                    <Content>
                      <h3><b>{opportunityDetails.title}</b></h3>
                      <h5>{opportunityDetails.subtype}</h5>
                      <div className="ui hidden divider"></div>
                      <div className="opportunity-specs ui fluid grid">
                        <div className="opportunity-detail eleven wide computer sixteen wide mobile column">
                          <div className="ui three column grid">
                              <div className="opportunity-icon-details">
                                <Icon className="clock" />
                                <h5>{deadline}</h5>
                              </div>
                              <div className="opportunity-icon-details">
                                <div className="icon">{currencyIcon}</div>
                                <h5>&nbsp;{opportunityDetails.paid !== '0' && opportunityDetails.compensation ?
                                 `${opportunityDetails.compensation.value}` : 'Unpaid' }</h5>
                              </div>
                              {
                                vacancies ?
                                <div className="opportunity-icon-details">
                                  <Icon className="users" />
                                  <h5>{`${vacancies} Vacancies`}</h5>
                                </div>
                                :
                                null
                              }
                          </div>
                        </div>
                        <div className="share-detail five wide computer sixteen wide mobile column">
                          <div className="ui horizontal list buttons">
                            {applyButton}
                             <a className="content item" onClick={this.props.onShareClick}>
                                <Icon className="share" />
                                     Share
                            </a>
                          </div>
                        </div>
                      </div>
                    </Content>
                  </Card>
                </Column>
              </Grid>
              </DocumentMeta>
            :
            null
          );
  }
}

OpportunityTitleCard.propTypes = {
  apiActions: React.PropTypes.object,
  componentData: React.PropTypes.any,
  params: React.PropTypes.object,
  isLoggedIn: React.PropTypes.any,
  onShareClick: React.PropTypes.any,
};

function mapStateToProps(state) {
  return {
    isLoggedIn: state.get('reducer').get('isLoggedIn'),
  };
}

export default connect(mapStateToProps)(OpportunityTitleCard);
