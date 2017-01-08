import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/*eslint-disable */
import { toJS } from 'immutable';
/*eslint-enable */
import { Item, Content } from 'react-semantify';
import _ from 'underscore';
import client from '../../getStreamApi';
// file import
import * as notification from '../../actions/notification';
import { pageThumbnail } from '../../defaults';
import { createEntityNavigationUrl } from '../../utils/createNavigationUrl';
import { notificationPopupStyle } from '../../constants/domSettingsConstants';
/* element primary text*/
import RecommendCommentType from '../elements/notification/RecommendCommentType';
import AddedType from '../elements/notification/AddedType';
import EventReminder from '../elements/notification/EventReminder';
import MentionedConnected from '../elements/notification/MentionedConnected';
import ProjectAddRequest from '../elements/notification/ProjectAddRequest';

let viewMoreCount = 0;

class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.showNotification = this.showNotification.bind(this);
    this.readNotification = this.readNotification.bind(this);
    this.showMoreNotification = this.showMoreNotification.bind(this);
    this.state = {
      notificationCollection: [],
      dataSet: false,
      seen: false,
      latestUpdateData: false,
      notificationCount: 0,
    };
    this.initialNotification = [];
    this.handleResize = this.handleResize.bind(this);
  }
  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    let { account } = this.props;
    account = account.toJS();
    this.props.notification.getAllNotification(account.data.id);
    this.initializePopUp();
    $('.ui.popup.notification-menu-popup').css(notificationPopupStyle);
  }

  componentWillUpdate(nextProps, nextState) {
    if(nextProps.notificationData !== this.props.notificationData) {
        this.initialNotification = [...nextProps.notificationData];
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.notificationData !== null && this.props.emptyNotification !== true) {
      let self = this;
      let currentData = this.props.notificationData;
      let previousData = prevProps.notificationData;
      if (!_.isEqual(currentData, previousData)
        && this.state.dataSet === true) {
        self.setState({
          latestUpdateData: false,
        });
      }

      if (this.state.dataSet === true && !this.state.latestUpdateData) {
        let self = this;
        const newArray = this.state.notificationCollection.slice();
        newArray.length = 0;
        this.props.notificationData.map(item => {
          newArray.push(item);
          self.setState({
            notificationCollection: newArray,
          });
          return true;
        });
        self.setState({
          latestUpdateData: true,
          seen: false,
        });
      }
    }
    if (this.props.emptyNotification !== true && this.props.notificationData !== null
      && !this.state.dataSet && this.props.notificationData.length > 0) {
      const self = this;
      const newArray = this.state.notificationCollection.slice();
      this.props.notificationData.map(item => {
        newArray.push(item);
        self.setState({
          notificationCollection: newArray,
        });
        return true;
      });
      let these = this;
      these.setState({
        dataSet: true,
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
  getPrimaryText(data) {
    let primaryTitle = '';
    const usersList = data[0];
    const objectDetail = data[1];
    const extraDetail = data[3];
    const projectAddData = data[2];
    const actorCount = extraDetail !== undefined ? extraDetail.actorCount : '';
    const verb = extraDetail !== undefined ? extraDetail.verb : '';
    if ((verb === 'comment' || verb === 'recommend'
    || verb === 'attending' || verb === 'attending_owner')
    && data[1] !== undefined && usersList.length > 0) {
      return (
          <RecommendCommentType
            verb={verb}
            data={data}
            usersList={usersList}
            actorCount={actorCount}
          />
      );
    }
    if ((verb === 'story_added' || verb === 'added_to_topic'
    || verb === 'added_to_page') && data[1] !== undefined && usersList.length > 0
    && usersList[0] !== undefined) {
      return (
        <AddedType
          data={data}
          usersList={usersList}
          verb={verb}
        />
      );
    }
    if ((verb === 'event_start_reminder' || verb === 'event_end_reminder')
    && objectDetail !== undefined) {
      return (
        <EventReminder
          data={data}
          verb={verb}
        />
      );
    }
    if ((verb === 'mentioned') &&
    data[1] !== undefined &&
    data[1] !== true &&
    data[1].title !== undefined &&
    usersList.length > 0
    && usersList[0] !== undefined) {
      return (
        <MentionedConnected
          data={data}
          usersList={usersList}
          verb={verb}
        />
      );
    }
    if(verb === 'connected' &&
    usersList.length > 0
    && usersList[0] !== undefined) {
      return (
        <MentionedConnected
          data={data}
          usersList={usersList}
          verb={verb}
        />
      );
    }
    if (verb === 'project_add_request'
    && projectAddData !== true && usersList.length > 0
      && usersList[0] !== undefined) {
      let primaryTitle = usersList[0].name;
      return (
        <ProjectAddRequest
          primaryTitle={primaryTitle}
          projectAddData={projectAddData}
          verb={verb}
          data={data}
        />
      );
    }
    return true;
  }

  getItemList(notifications) {
    let primaryTextOnClick = '';
    return notifications.map((item, index) => {
      const userList = item[0];
      const objectData = item[1];
      const addProjectData = item[2];
      const extraDetail = item[3];
      if (userList[0] !== undefined && userList.length > 0
        && extraDetail.verb === 'connected') {
        primaryTextOnClick = createEntityNavigationUrl(userList[0].id,
          userList[0].type);
      } else if (extraDetail.verb === 'project_add_request' && objectData !== undefined) {
        primaryTextOnClick = createEntityNavigationUrl(objectData.id,
          objectData.type);
          primaryTextOnClick = `${primaryTextOnClick}/edit`;
      } else if(objectData !== undefined) {
        primaryTextOnClick = createEntityNavigationUrl(objectData.id,
          objectData.type);
      }
      if (this.getPrimaryText(item) !== undefined) {
        return (
            <Item
              className={extraDetail.is_read === true ? ' read-notification' : ''}
              data-activityId={extraDetail.activity_id} key={index} onClick={this.readNotification}
              data-link={primaryTextOnClick}
            >
              <a className="ui mini image">
                <img
                  className="ui medium rounded image"
                  src={objectData !== undefined &&
                  objectData.cover_picture !== undefined ?
                  objectData.cover_picture.image_100_100 : pageThumbnail} alt="profile"
                />
              </a>
              <Content>
                {this.getPrimaryText(item)}
                <div className="meta">
                  {extraDetail.createdAt}
                </div>
              </Content>
            </Item>
          );
      }
      return true;
    });
  }

  handleResize() {
    $('.ui.popup.notification-menu-popup').css(notificationPopupStyle);
  }

  showNotification() {
    let { account } = this.props;
    const { feedToken } = this.props;
    account = account.toJS();
    const notify = client.feed('notification', account.data.id, feedToken);
    const params = { mark_seen: true };
    const self = this;
    notify.get(params).then((response) => {
      if (response.unseen === 0) {
        self.setState({
          seen: true,
          notificationCount: response.unseen,
        });
      }
    });
  }

  initializePopUp() {
    $('.ui.item.notification-element:not(.processed)')
       .popup({
         position: 'bottom right',
         popup: $('.notification-menu-popup'),
         on: 'click',
         target: $('.header-menu.logged-menu'),
       }).addClass('processed')
   ;
  }

  showMoreNotification(event) {
    event.stopPropagation();
    event.preventDefault();
    this.handleResize();
    let { account } = this.props;
    account = account.toJS();
    viewMoreCount++;
    this.props.notification.getAllNotification(account.data.id, viewMoreCount);
  }

  readNotification(event) {
    let { account } = this.props;
    const { feedToken } = this.props;
    account = account.toJS();
    const notData = client.feed('notification', account.data.id, feedToken);
    const activityid = event.currentTarget.getAttribute('data-activityId');
    const params = { mark_read: [activityid] };
    notData.get(params);
    /* eslint no-param-reassign: ["error", { "props": false }] */
    event.currentTarget.className = 'item read-notification';
    const currentLink = event.currentTarget.getAttribute('data-link');
    if (typeof window !== 'undefined') {
      window.open(currentLink, '_blank');
    }
  }

  render() {
    this.initializePopUp();
    const { notificationLoader, showMoreNotificationBtn } = this.props;
    const { notificationCount } = this.props;
    return (
      <div className="notification-field">
        <div className="ui item notification-element" onClick={this.showNotification}>
          <i className="icon notification" />
          {!this.props.emptyNotification && notificationCount !== 0 &&
            !(this.state.seen && this.state.notificationCount === 0) ?
            <span className="notification-count">{notificationCount}</span>
          : ''}
        </div>
        <div className="ui popup bottom right notification-menu-popup">
          <div className="ui divided link items  mini-teaser profile-min-teaser notification-menu">
          {!this.props.emptyNotification && this.state.notificationCollection.length > 0 ?
            this.getItemList(this.state.notificationCollection) :
            this.initialNotification.length > 0
            && !this.state.notificationCollection.length > 0 ?
            this.getItemList(this.initialNotification) :
            <Item className="no-notification-found">no notification found</Item>}
          {!this.props.emptyNotification && this.state.notificationCollection.length > 0
            && showMoreNotificationBtn === true ?
            <div className="ui link items view-more-btn">
              <div className="more-notification" onClick={this.showMoreNotification}>
                View more notification
                {notificationLoader === true ? <span className="ui loader" /> : ''}
              </div>
            </div>
          : ''}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    account: state.get('account'),
    notificationData: state.get('notification').get('notificationData'),
    notificationCount: state.get('notification').get('notificationCount'),
    feedToken: state.get('notification').get('feedToken'),
    emptyNotification: state.get('notification').get('emptyNotification'),
    notificationLoader: state.get('notification').get('notificationLoader'),
    showMoreNotificationBtn: state.get('notification').get('showMoreNotificationBtn'),
  };
}
function mapDispatchToProps(dispatch) {
  return {
    notification: bindActionCreators({
      getAllNotification: notification.getAllNotification,
    }, dispatch),
  };
}

Notification.propTypes = {
  account: React.PropTypes.object,
  notificationData: React.PropTypes.array,
  notificationCount: React.PropTypes.number,
  feedToken: React.PropTypes.string,
  emptyNotification: React.PropTypes.oneOfType([
    React.PropTypes.boolean,
    React.PropTypes.func,
  ]).isRequired,
  notificationLoader: React.PropTypes.oneOfType([
    React.PropTypes.boolean,
    React.PropTypes.func,
  ]).isRequired,
  showMoreNotificationBtn: React.PropTypes.oneOfType([
    React.PropTypes.boolean,
    React.PropTypes.func,
  ]).isRequired,
  notification: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.func,
  ]).isRequired,
};

// Connects dispatch and props to component
export default connect(mapStateToProps, mapDispatchToProps)(Notification);
