import React, { PropTypes } from 'react';
import { Card, Content } from 'react-semantify';
import ProfileMiniTeaserCard from '../ProfileMiniTeaserCard';
import { InteractivityCard } from '../InteractivityCard';
import { blockCardCoverImage } from '../../../../defaults';

/*
Properties -
  imageSource - event card image src
  imageOnClickLink - url to be navigated on click of image
  primaryText - teaser header headerText
  secondaryText - location to be displayed
  primaryTextOnClickLink - url to be navigated on event primary text click
  cardClasses -  an array of class names to be attached to the block car
              -  'hide-block-card-shadow' - hides the shadow around the card

  profileMiniTeaserCardContent -  accept data for min teaser content as an object with structire ->
    imageOnClickLink - url to be navigated on image click
    imageSource - image src
    primaryText -  primary text
    primaryTextOnClickLink - url to be navigated on primary text click
    secondaryText - secondary text
    secondaryTextOnClickLink - url to be navigated on secondary text click
    isWrapped - boolean to add or remove card wrapper (default = true)

  interactivity -
    recommendCount
    commentCount
*/
export default class EventBlockCard extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      imageSource: blockCardCoverImage,
    };
  }

  componentDidMount() {
      /* If imageSource is not passed render default image for card cover*/
    if (this.props.event && this.props.event.imageSource) {
      this.setState({
        imageSource: this.props.event.imageSource,
      });
    } else {
      this.setState({
        imageSource: blockCardCoverImage,
      });
    }
  /* default card classes*/
    this.cardClasses = 'event-block-card block-card centered fluid';
    /* Add classes passed in props to a variable*/
    if (this.props.event.cardClasses) {
      /* default class applied to event block card for identification */
      this.props.event.cardClasses.map((cssClass) => {
        this.cardClasses += ` ${cssClass}`;
        return null;
      });
    }
  }

  render() {
    return (
      <Card className={this.cardClasses}>
        <div className="ui move reveal image" >
        <Content className="cover-image">
          <a
            className="ui centered image cover-image-link"
            href={this.props.event.imageOnClickLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={this.state.imageSource} alt="" />
          </a>
        </Content>
        </div>
        <Content>
          <h5 className="title-min-height">
            <a
              href={this.props.event.primaryTextOnClickLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {this.props.event.primaryText}
            </a>
          </h5>
          <div className="ui items meta">
            <span className="location">{this.props.event.secondaryText}</span>
          </div>
          <ProfileMiniTeaserCard {...this.props.profileMiniTeaserCardContent} isWrapped={false} />
        </Content>
        <InteractivityCard {...this.props.interactivityCardContent} />
      </Card>
    );
  }
}

EventBlockCard.propTypes = {
  event: PropTypes.object.isRequired,
  primaryTextOnClickLink: PropTypes.string,
  profileMiniTeaserCardContent: PropTypes.object.isRequired,
  interactivityCardContent: PropTypes.object.isRequired,
};
