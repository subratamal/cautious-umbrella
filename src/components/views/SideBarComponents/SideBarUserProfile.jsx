import React, { PropTypes } from 'react';
import _ from 'underscore';
import { connect } from 'react-redux';
import ProfileMiniTeaserCard from '../../views/cards/ProfileMiniTeaserCard';
import { generateProfile } from '../../../utils/cardsGenerators/pageFeedGenerator';

class SideBarUserProfile extends React.Component {
	/* on load acquire window side and accordingly set a flag on state */
  constructor(props) {
    super(props);
    this.profileArray = [];
    this.state = {
      showProfile: false,
    };
  }
  componentDidMount() {
    let { profile } = this.props;
    profile = profile.toJS();
    const tempPropsArray = generateProfile(profile);
    _.each(tempPropsArray, (props, index) => {
      this.profileArray.push(<div key={index}><ProfileMiniTeaserCard {...props} userProfile /></div>);
    });
    if (this.profileArray.length > 0) {
      this.setState({
        showProfile: true,
      });
    }
  }

  render() {
    const self = this;
    if (self.state.showProfile === true) {
      return (
       <div className="sidebar-user-profile">
        {self.profileArray}
       </div>
		  );
    }
    return null;
  }
}

SideBarUserProfile.propTypes = {
  profile: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    profile: state.get('profile'),
  };
}

export default connect(mapStateToProps)(SideBarUserProfile);
