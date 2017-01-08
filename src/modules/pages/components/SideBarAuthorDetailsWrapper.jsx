import React, { PropTypes } from 'react';
import SideBarAuthorDetails from './SideBarAuthorDetails';

const PageBlockCardWrapper = props => {
  const data = props.componentData ? props.componentData[0] : null;
  if (!data || !data.description) {
    return null;
  }
  return (<SideBarAuthorDetails {...data} />);
};

PageBlockCardWrapper.propTypes = {
  componentData: PropTypes.array,
};

export default PageBlockCardWrapper;
