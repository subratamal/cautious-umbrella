import React from 'react';
import {
Card,
Grid,
Column,
Content,
Button,
Icon,
} from 'react-semantify';
import { createOpportunityLocationString } from '../utils';
import { createEntityNavigationUrl } from '../../../utils/createNavigationUrl';

const OpportunityDetailsCard = props => {
  const unApply = () => {
    const relId = props.componentData[0].applied;
    const opportunityId = props.componentData[0].id;
    props.apiActions.unApply(opportunityId, relId);
  };

  const apply = () => {
    const opportunityId = props.componentData[0].id;
    props.apiActions.apply(opportunityId);
  };

  const opportunityDetails = props.componentData ? props.componentData[0] : null;
  const location = createOpportunityLocationString(opportunityDetails);
  let applyButton = null;
  if (opportunityDetails) {
    if (!opportunityDetails.applied) {
      applyButton = (
          <a className="item">
          <Button onClick={apply} className="primary">Apply</Button></a>
        );
    } else if (opportunityDetails.redirect_url) {
      applyButton = (<a
        target="_blank"
        href={opportunityDetails.redirect_url}
        rel="noopener noreferrer"
        className="item"
      ><Button onClick={unApply} className="primary red inverted">Applied</Button></a>);
    } else {
      applyButton = (<a className="item"><Button onClick={unApply} className="primary red inverted">Applied</Button></a>);
    }
  }

  return (
      opportunityDetails ?
        <Grid className="opportunity-details-card">
          <Column>
            <Card className="fluid">
              <Content>
              {location ?
                <div>
                  <h4><b>Where you'll be working</b></h4>
                  <h4>
              {
                location
              }
                  </h4>
                  <br />
                </div>
                :
                null
              }

              {
                opportunityDetails.requiredSkills.length ?
                  <div>
                    <h4><b>The skills you need to have</b></h4>
                    <div className="ui hidden divider" />
                    <Grid className="stackable opportunity-detail-tags">
                  {
                    opportunityDetails.requiredSkills.map((skill, index) =>
                        <a
                          key={index}
                          target="_blank"
                          rel="noopener noreferrer"
                          href={createEntityNavigationUrl(skill.id, skill.type)}
                        ><Button className="skill">{skill.name}</Button></a>
                    )
                  }
                    </Grid>
                  </div>
                  :
                  null
              }
                <br />
                {
                  opportunityDetails.workAreas.length ?
                    <div>
                      <h4><b>Required work area</b></h4>
                      <div className="ui hidden divider" />
                      <Grid className="stackable opportunity-detail-tags">
                    {
                      opportunityDetails.workAreas.map((area, index) =>
                          <a
                            key={index}
                            target="_blank"
                            rel="noopener noreferrer"
                            href={createEntityNavigationUrl(area.id, area.type)}
                          ><Button className="topic">{area.name}</Button></a>
                      )
                    }
                      </Grid>
                    </div>
                    :
                    null
                }
                <br />
                  {
                    opportunityDetails.description ?
                      <div>
                        <h3><b>About the Job</b></h3>
                        {
                          opportunityDetails.description.map((data, index) =>
                            <div key={index}>
                              <h4><b>{data.label}</b></h4>
                              <h5>{data.text}</h5>
                              <br />
                            </div>)
                        }
                      </div>
                      :
                      null
                  }
                <div className="share-detail ui horizontal list buttons">
                  {
                    applyButton
                  }
                  <a className="content item" onClick={props.onShareClick}>
                        <Icon className="share" />
                        Share
                 </a>
               </div>
              </Content>
            </Card>
          </Column>
        </Grid>
                :
                null
        );
};

OpportunityDetailsCard.propTypes = {
  componentData: React.PropTypes.any,
  apiActions: React.PropTypes.object,
  onShareClick: React.PropTypes.func,
};

export default OpportunityDetailsCard;
