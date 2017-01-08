import React from 'react';
import {
  Button,
  Divider,
  Icon,
  Menu,
  List,
  Item,
  Input,
  Dropdown,
  Segment,
  Grid,
  Content,
  Column,
  Card,
  Header
} from 'react-semantify';
import ProfileTeaserCard from '../components/views/cards/ProfileTeaserCard';
import {InteractivityCard} from '../components/views/cards/InteractivityCard';
import PageBlockCard from '../components/views/cards/PageBlockCard';
import ProfileBlockCard from '../components/views/cards/ProfileBlockCard';
import PageTeaserCard from '../components/views/cards/PageTeaserCard';
import PageMiniTeaserCard from '../components/views/cards/PageMiniTeaserCard';
import StoryMiniTeaserCard from '../components/views/cards/StoryMiniTeaserCard'
import ProfileMiniTeaserCard from '../components/views/cards/ProfileMiniTeaserCard';
import {StoryBlockCard} from '../components/views/cards/StoryBlockCard'
import EventMiniTeaserCard from '../components/views/cards/events/EventMiniTeaserCard';
import EventFeaturedCard from '../components/views/cards/EventFeaturedCard';
import StoryFeaturedCard from '../components/views/cards/StoryFeaturedCard';
import EventBlockCard from '../components/views/cards/events/EventBlockCard';


export const ExampleCard = React.createClass({
  render: function() {
    var miniTeaserContent = {
      imageOnClickLink : "#",
      imageSource : require("../../static/images/user_neutral.png"),
      primaryTextOnClickLink : "#",
      primaryText : "CD Exclusive",
      secondaryTextOnClickLink : "#",
      secondaryText : "campus diaries"
    }
    var pageTeaserContent = {
      imageSource:require("../../static/images/user_neutral.png"),
      primaryTextOnClickLink:"#",
      primaryText:"Page Teaser",
      imageOnClickLink : "#",
      secondaryTextOnClickLink : "#",
      buttonText:"follow",
      secondaryText:"Bangalore, India",
      isWrapped:true
    }
    var pageMiniTeaserContent = {
      imageOnClickLink:"#",
      imageSource:require("../../static/images/user_neutral.png"),
      imageOnClickLink:"#",
      primaryText:"Page Mini Teaser",
      primaryTextOnClickLink:"#",
      secondaryText:"Bangalore, India",
      secondaryTextOnClickLink:"#",
      isWrapped:{true}
    }
    return (
      <div className="card-section">
        <div className="ui four column stackable grid">
          <Column>
            <StoryBlockCard {...generatePropsData("StoryBlockCard")}/>
          </Column>
          <Column>
            <EventBlockCard {...generatePropsData("EventBlockCard")}/>
          </Column>
          <Column>
            <ProfileBlockCard {...generatePropsData("ProfileBlockContent")}/>
          </Column>
          <Column>
            <PageBlockCard {...generatePropsData("PageBlockContent")}/>
          </Column>
        </div>
        <Divider></Divider>
        <div className="ui three column stackable grid">
          <Column>
            <Card>
              <Content>
                <Header>
                  Title
                </Header>
                <div className="description">
                  Elliot requested permission to view your contact details
                  Elliot requested permission to view your contact details
                  Elliot requested permission to view your contact details
                  Elliot requested permission to view your contact details
                </div>
              </Content>
            </Card>
          </Column>
          <Column>
            <Card>
              <Content>
                <Header>
                  Title
                </Header>
                <ProfileMiniTeaserCard {...miniTeaserContent} isWrapped = {false}>
                </ProfileMiniTeaserCard>
                <div className="description" type="link">Testing name changes content check react semantify
                </div>
              </Content>
              <Content>
                <ProfileMiniTeaserCard {...miniTeaserContent} isWrapped = {false}>
                </ProfileMiniTeaserCard>
                <div className="description" type="link">Testing name changes content check react semantify
                </div>
              </Content>
            </Card>
          </Column>
          <Column>
            <PageTeaserCard {...pageTeaserContent} />
            <ProfileTeaserCard {...generatePropsData("ProfileTeaserCardContent")} />
            <ProfileMiniTeaserCard {...generatePropsData("ProfileMiniTeaserCardContent")} />
            <StoryMiniTeaserCard {...generatePropsData("StoryMiniTeaserCard")}> </StoryMiniTeaserCard>
            <PageMiniTeaserCard {...pageMiniTeaserContent} />
          </Column>
          <Column>
            <EventMiniTeaserCard {...generatePropsData("EventMiniTeaserCard")}/>
          </Column>
        </div>
        <Divider></Divider>
        <EventFeaturedCard {...generatePropsData("EventFeaturedCard")} {...generatePropsData("MiniTeaserContent")}
          {...generatePropsData("InteractivityCardContent")}/>
        <StoryFeaturedCard {...generatePropsData("StoryFeaturedCard")} {...generatePropsData("MiniTeaserContent")}
          {...generatePropsData("InteractivityCardContent")}/>
      </div>
    );
  }

});

/*
@param : type of card
@result : json object with the props required by the component
*/

export default function generatePropsData(type) {
  let event_block = {
    imageSource : "http://www.gettyimages.pt/gi-resources/images/Homepage/Hero/PT/PT_hero_42_153645159.jpg",
    primaryText : "This is an event block card which stretches more than one line then two lines" ,
    secondaryText : "27 April, 5050",
    primaryTextOnClickLink : "#",
    cardClasses : ['hide-block-card-shadow']
  };

  let profile_mini_teaser = {
    imageOnClickLink :"#",
    imageSource : require("../../static/images/user_neutral.png"),
    primaryTextOnClickLink :"#",
    primaryText:"Profile mini teaser",
    primaryTextOnClickLink: "#",
    secondaryText:"campus diaries",
  }

  let event_mini_teaser_card = {

  }
  var story_mini_teaser_content = {
    imageOnClickLink : "#",
    imageSource : require("../../static/images/user_neutral.png"),
    primaryTextOnClickLink : "#",
    primaryText : "Story Mini Teaser",
    secondaryTextOnClickLink : "#",
    secondaryText : "27 Apr, 2015"

  }

  let interactive_card = {
    recommendCount : "768",
    commentCount : "1.5k"
  }
  let page_block_card = {
    imageSource:require("../../static/images/thumbs.png"),
    imageOnClickLink : "#",
    primaryText:"page block",
    secondaryText : "Bangalore, India",
    primaryTextOnClickLink : "#",
    secondaryTextOnClickLink : "#",
    buttonText: 'follow',
    secondaryImageSource:require("../../static/images/user_neutral.png"),
    cardClasses: []
  }
  let profile_teaser = {
    imageSource:require("../../static/images/user_neutral.png"),
    primaryTextOnClickLink:"#",
    primaryText:"CD Exclusive",
    imageOnClickLink : "#",
    secondaryTextOnClickLink : "#",
    buttonText:"connect",
    secondaryText:"campus diaries",
    isWrapped:true
  }

  let featured_content = {
    imageSource : require("../../static/images/default_610x320.png"),
    primaryText : "Arduino Scripting and Programming Language for Schools",
    secondaryTextTwo : "story featured card",
    buttonText : "connect",
    secondaryTextOne : "Happening Now - 30 Dec '15",
    primaryTextOnClickLink: "#",
    imageOnClickLink : "#"
  }

  let profile_block = {
    imageSource:require("../../static/images/thumbs.png"),
    imageOnClickLink : "#",
    primaryText:"Profile block",
    secondaryText : "Campus Diaries",
    primaryTextOnClickLink : "#",
    secondaryTextOnClickLink : "#",
    buttonText: 'connect',
    secondaryImageSource:require("../../static/images/user_neutral.png"),
    cardClasses: []
  }

  let mini_teaser_content = {
    imageOnClickLink : "#",
    imageSource : require("../../static/images/user_neutral.png"),
    primaryTextOnClickLink : "#",
    primaryText : "CD Exclusive",
    secondaryTextOnClickLink : "#",
    secondaryText : "campus diaries"
  }

  let pageFeed = {
    imageOnClickLink: '#',
    imageSource: require("../../static/images/user_neutral.png"),
    primaryTextOnClickLink: '#',
    primaryText: 'CD Exclusive',
    secondaryTextOnClickLink: '#',
    secondaryText: 'campus Diaries',
    updatedTime: '10-oct-2013',
    recommendCount:'1',
    commentCount:'1',
    type: 'story'
  }

  switch (type) {
    case "EventBlockCard":
    return {
      'event' : event_block,
      'teaser' : profile_mini_teaser,
      'interactivity' : interactive_card
    }
    break;
    case "EventMiniTeaserCard":
    // profile_mini_teaser data can be used with event mini teaser
    let event_mini = profile_mini_teaser;
    event_mini['primaryText'] = "Event Mini teaser";
    event_mini['secondaryText'] = "27 May 2016";
    return event_mini
    case "StoryBlockCard" :
    return {
      imageSource : "http://www.gettyimages.pt/gi-resources/images/Homepage/Hero/PT/PT_hero_42_153645159.jpg",
      primaryText : "This is a story block card" ,
      secondaryText : "1462880865",
      profileMiniTeaserCardContent : profile_mini_teaser,
      interactivityCardContent : interactive_card,
      cardClasses : ['hide-block-card-shadow'],
      imageOnClickLink : "#",
      primaryTextOnClickLink : "#"
    }
    break;
    case "StoryMiniTeaserCard" :{
      return story_mini_teaser_content
    }
    break;
    case "PageBlockContent":
    return page_block_card
    case "PageFeaturedCard":
    return {
      'pages': page_block_card
    }
    break;
    case "ProfileTeaserCardContent":
    return {
      imageSource:require("../../static/images/user_neutral.png"),
      primaryTextOnClickLink:"#",
      primaryText:"Profile Teaser",
      imageOnClickLink : "#",
      secondaryTextOnClickLink : "#",
      buttonText:"connect",
      secondaryText:"campus diaries",
      isWrapped:true
    }
    break;
    case "ProfileMiniTeaserCardContent":
    return {
      imageOnClickLink : "#",
      imageSource : require("../../static/images/user_neutral.png"),
      primaryTextOnClickLink : "#",
      primaryText : "Profile Mini Teaser",
      secondaryTextOnClickLink : "#",
      secondaryText : "campus diaries"
    }
    break;
    case "StoryFeaturedCard":
    let story = featured_content;
    story['secondaryTextTwo'] = 'story featured card'
    return {
      'story':  story
    }
    break;
    case "EventFeaturedCard":
    let event = featured_content;
    event['secondaryTextTwo'] = 'Event featured card'
    return {
      'event':  event
    }
    break;
    case "ProfileBlockContent":
    return profile_block
    break;
    case "MiniTeaserContent":
    return {
      'miniTeaserContent' : mini_teaser_content
    }
    break;
    case "InteractivityCardContent":
    return {
      'interactivityCardContent' : interactive_card
    }
    break;
    case "HomePageFeed":
    return pageFeed
    break;
    default:
  }
}
