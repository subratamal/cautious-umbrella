import React from 'react';
import { Item } from 'react-semantify';
import ProfileMiniTeaserCard from './cards/ProfileMiniTeaserCard';
import { createPageNavigationUrl } from '../../utils/createNavigationUrl';


// Component used to display Poopup on clicking dripdown arrow in header
class LogoutMenu extends React.Component {
  render() {
    const accountUrl = createPageNavigationUrl(`${this.props.account.name}/edit`);
    return (
      <div className="ui  menu logout-menu" >
        <div className="ui fluid container">
          <ProfileMiniTeaserCard {...this.props.profileTeaser} />
          <div className="ui divider" />
          <div className="ui grid">
            <div className="row">
              <div className="column eight wide left aligned">
                <Item type="link" href={accountUrl}>Account</Item>
              </div>
              <div className="column eight wide right aligned">
                <Item id="id-header-dropdown-logout-link" type="link" onClick={this.props.logout}>Logout</Item>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LogoutMenu.propTypes = {
  profileTeaser: React.PropTypes.object,
  account: React.PropTypes.object,
  logout: React.PropTypes.func,
};

export default LogoutMenu;
