import React, { PropTypes } from 'react';
import { Item, Content } from 'react-semantify';
import { SaveIcon } from '../../save/SaveIcon';
/*
Properties -
reducerName - name of the reducer as specified in defaults for the current page
ParentName - name of the parent as specified in defaults for the current page
storeIndex - index of the data in store where the current entity is stored
sliderDataIndex  - index of the data in slider(required only for primary slider)
entityID - id of the entity to which interactivity is connected
*/
const OpportunityInteractions = props => (
      <Content className="ui secondary menu fitted extra interactivity-card opportunity-interactions">
        <div className="menu left">
          <div>{props.subType}</div>
        </div>
        <div className="menu right">
          <SaveIcon {...props} />
        </div>
      </Content>
);

OpportunityInteractions.propTypes = {
  subType: PropTypes.string.isRequired,
};
/* if the interactivtiy card is in slider it will have sliderDataIndex */
export default OpportunityInteractions;
