import React, { PropTypes } from 'react';
import {
  Segment,
  Card,
} from 'react-semantify';

const SideBarAuthorDetails = props => {
  if (!props.description) {
    return null;
  }
  return (
      <Card className="fluid recruiter-details-card">
        <Segment>
          <h4>About this Company</h4>
          <div dangerouslySetInnerHTML={{ __html: props.description }} />
        </Segment>
      </Card>
		);
};
SideBarAuthorDetails.propTypes = {
  description: PropTypes.string,
};

export default SideBarAuthorDetails;
