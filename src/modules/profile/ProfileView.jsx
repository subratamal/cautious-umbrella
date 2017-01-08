import React, { PropTypes } from 'react';
import SideBarTeaserList from '../listViewModules/SideBarTeaserList';


const ProfileView = (props) => <SideBarTeaserList {...props} />

ProfileView.propTypes = {
  pageName: PropTypes.string,
  view: PropTypes.string,
  componentData: PropTypes.array,
};

export default ProfileView ;
