import React from 'react';
import { Card, Content, Item, Divider } from 'react-semantify';
import ProfileTeaserCard from './ProfileTeaserCard';
import TopicTeaserCard from './TopicTeaserCard';
import { createEntityNavigationUrl } from '../../../utils/createNavigationUrl';
/*
Properties -
    isWrapped - boolean to add or remove card wrapper (default = true)
*/
class PeopleTopicFeedCard extends React.Component {
  getPeopleProfile() {
    return (
      <div className="ui items mini-teaser page-mini-teaser">
        <Item>
          <a
            className="ui mini image"
            href={createEntityNavigationUrl(this.props.actor.id,
          this.props.actor.type)}
          >
            <img
              alt="user pic"
              className="ui medium rounded image"
              src={this.props.actor.display_picture.image_100_100}
            />
          </a>
          <Content>
            { this.props.verb === 'connected' ?
              this.getPrimaryTextForConnected(this.props)
            :
              this.getPrimaryTextForTopicFollow(this.props)
            }
            <div className="meta secondary-text location">
              {this.props.connection_time}
            </div>
          </Content>
        </Item>
      </div>
    );
  }

  getPrimaryTextForConnected(item) {
    if (item.peopleList.length > 2) {
      return (
        <div className="ui primary-text">
          <a
            href={createEntityNavigationUrl(item.actor.id,
          item.actor.type)} target="_blank" rel="noopener noreferrer"
          >{item.actor.name} </a>
          connected to <a
            href={createEntityNavigationUrl(item.peopleList[0].id, item.peopleList[0].type)}
            target="_blank" rel="noopener noreferrer"
          >{item.peopleList[0].name}</a>,
          <a
            href={createEntityNavigationUrl(item.peopleList[1].id,
            item.peopleList[1].type)}
            target="_blank" rel="noopener noreferrer"
          > {item.peopleList[1].name} </a>
          and <div className="ui scrolling dropdown item user-list-show">
          {item.peopleList.length - 2 }
            <div className="menu connection-list">
              {this.getTotalUser(item.peopleList)}
            </div>
            <span> others</span>
          </div>
        </div>
      );
    } else if (item.peopleList.length === 2) {
      return (
        <div className="ui primary-text">
          <a
            href={createEntityNavigationUrl(item.actor.id, item.actor.type)}
            target="_blank" rel="noopener noreferrer"
          >{item.actor.name} </a>
          connected to
          <a
            href={createEntityNavigationUrl(item.peopleList[0].id, item.peopleList[0].type)}
            target="_blank" rel="noopener noreferrer"
          > {item.peopleList[0].name}</a>,
          <a
            href={createEntityNavigationUrl(item.peopleList[1].id, item.peopleList[1].type)}
            target="_blank" rel="noopener noreferrer"
          > {item.peopleList[1].name} </a>
        </div>
    );
    /*eslint-disable */
    } else {
      /*eslint-enable */
      return (
        <div className="ui primary-text">
          <a
            href={createEntityNavigationUrl(item.actor.id, item.actor.type)}
            target="_blank" rel="noopener noreferrer"
          >{item.actor.name} </a>
          connected to
          <a
            href={createEntityNavigationUrl(item.peopleList[0].id, item.peopleList[0].type)}
            target="_blank" rel="noopener noreferrer"
          > {item.peopleList[0].name} </a>
        </div>
    );
    }
  }

  getPrimaryTextForTopicFollow(item) {
    if (item.peopleList.length > 2) {
      return (
        <div className="ui primary-text">
          <a
            href={createEntityNavigationUrl(item.actor.id,
            item.actor.type)}
            target="_blank" rel="noopener noreferrer"
          > {item.actor.name} </a>
          started following Topics
          <a
            href={createEntityNavigationUrl(item.peopleList[0].id, item.peopleList[0].type)}
            target="_blank" rel="noopener noreferrer"
          > {item.peopleList[0].name}</a>,
          <a
            href={createEntityNavigationUrl(item.peopleList[1].id, item.peopleList[1].type)}
            target="_blank" rel="noopener noreferrer"
          > {item.peopleList[1].name} </a>
           <span>and </span>
          <div className="ui scrolling dropdown item user-list-show">
             { item.peopleList.length - 2 }
            <div className="menu connection-list">
              {this.getTotalUser(item.peopleList)}
            </div>
            <span> others</span>
          </div>
        </div>
      );
    } else if (item.peopleList.length === 2) {
      return (
        <div className="ui primary-text">
          <a
            href={createEntityNavigationUrl(item.actor.id,
            item.actor.type)}
            target="_blank" rel="noopener noreferrer"
          > {item.actor.name} </a>
          started following Topics
          <a
            href={createEntityNavigationUrl(item.peopleList[0].id, item.peopleList[0].type)}
            target="_blank" rel="noopener noreferrer"
          > { item.peopleList[0].name}</a>,
          <a
            href={createEntityNavigationUrl(item.peopleList[1].id, item.peopleList[1].type)}
            target="_blank" rel="noopener noreferrer"
          > {item.peopleList[1].name} </a>
        </div>
      );
      /* eslint-disable*/
    } else {
      /* eslint-enable*/
      return (
        <div className="ui primary-text">
          <a
            href={createEntityNavigationUrl(item.actor.id,
            item.actor.type)}
            target="_blank" rel="noopener noreferrer"
          > {item.actor.name} </a>
          started following Topic
          <a
            href={createEntityNavigationUrl(item.peopleList[0].id, item.peopleList[0].type)}
            target="_blank" rel="noopener noreferrer"
          > {item.peopleList[0].name} </a>
        </div>
      );
    }
  }

  getTotalUser(data) {
    return data.map((item, index) => {
      if (index > 1) {
        return (
          <a
          target="_blank"
          href={createEntityNavigationUrl(item.id, item.type)}
          className="item" key={item + index}>
          {item.name}
          </a>
      );
      }
      return true;
    });
  }
  getTwoProfileTeaser(data, parentIndex) {
    /* eslint-disable */
    return data.map((item, index) => {
      /* eslint-enable */
      if (index <= 1) {
        const connectButtonData = {
          reducerName: 'homePage',
          parentComponent: 'HomePage',
          storeIndex: index,
          sliderDataIndex: this.props.feedLengthOffset + parentIndex,
          componentName: 'HomePageFeed',
          type: item.type,
          entityId: item.id,
        };
        if (item.connected === 'yes') {
          connectButtonData.connected = '1';
        } else if (item.connected === 'no') {
          connectButtonData.connected = '0';
        } else if (item.connected === 'requested') {
          connectButtonData.connected = 'requested';
        }
        const profileData = {
          connectButtonData,
          imageSource: item.display_picture !== undefined &&
          item.display_picture.image_100_100 !== undefined ?
          item.display_picture.image_100_100 : '',
          imageOnClickLink: createEntityNavigationUrl(item.id, item.type),
          primaryText: item.name,
          primaryTextOnClickLink: createEntityNavigationUrl(item.id, item.type),
          secondaryText: item.current_campus !== undefined && item.current_campus.data.length > 0 ?
          item.current_campus.data[0].rel_value : '',
          secondaryTextOnClickLink: item.current_campus !== undefined
          && item.current_campus.data.length > 0 ?
          createEntityNavigationUrl(item.current_campus.data[0].id,
            item.current_campus.data[0].type) : '',
        };
        return (
          <div className="ui item" key={index}>
            <ProfileTeaserCard
              {...profileData}
              isWrapped={false}
            />
          </div>
      );
      }
    });
  }

  getTwoTopicTeaser(data, parentIndex) {
    /*eslint-disable */
    return data.map((item, index) => {
      /* eslint-enable */
      if (index <= 1) {
        const followButtonData = {
          reducerName: 'homePage',
          parentComponent: 'HomePage',
          storeIndex: index,
          sliderDataIndex: this.props.feedLengthOffset + parentIndex,
          componentName: 'HomePageFeed',
          type: item.type,
          entityId: item.id,
        };
        const profileData = {
          followButtonData,
          topicCoverPicture: item.cover_picture,
          topicText: item.name,
          topicUrl: createEntityNavigationUrl(item.id, item.type),
        };
        return (
          <div className="ui item" key={index}>
            <TopicTeaserCard
              {...profileData}
              isWrapped={false}
            />
          </div>
      );
      }
    });
  }
  getTwoTeaser(data, verb, index) {
    if (verb === 'connected') {
      return this.getTwoProfileTeaser(data, index);
    } else if (verb === 'topic_follow') {
      return this.getTwoTopicTeaser(data, index);
    }
    return true;
  }
  getHomePageFeed() {
    return (
      <div className="page-feed">
        <Card className="feed-card story-block-card centered fluid">
          <Content>
            {this.getPeopleProfile()}
          </Content>
          <Content>
            <div className="ui  divided items">
            {this.props.peopleList.length ?
              this.getTwoTeaser(this.props.peopleList, this.props.verb, this.props.index)
            : ''}
            </div>
          </Content>
        </Card>
        <Divider className="hidden" />
      </div>
    );
  }
  render() {
    return (
      <div className="ui feed-cards">
      {
      this.getHomePageFeed()
      }
      </div>
    );
  }
}

PeopleTopicFeedCard.propTypes = {
  actor: React.PropTypes.object,
  peopleList: React.PropTypes.array,
  connection_time: React.PropTypes.string,
  verb: React.PropTypes.oneOfType([
    React.PropTypes.boolean,
    React.PropTypes.func,
  ]).isRequired,
  index: React.PropTypes.number,
  feedLengthOffset: React.PropTypes.number,
};

export default PeopleTopicFeedCard;
