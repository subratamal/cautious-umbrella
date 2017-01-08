import React, { PropTypes } from 'react';
import {
  Icon,
  Button,
  Item,
} from 'react-semantify';

const TitleBarOpportunityName = props => {
  const opportunityDetails =
    props.componentData && props.componentData.length > 0 ? props.componentData[0] : null;
  return (
          <Item className="opportunity-name">
            <h4 className="singleline-ellipsis">
              {opportunityDetails ? opportunityDetails.title : ''}
            </h4>
          </Item>
    );
};

TitleBarOpportunityName.propTypes = {
  componentData: PropTypes.array,
};

export default TitleBarOpportunityName;
