import React, { PropTypes } from 'react';
import { Card, Content } from 'react-semantify';
import ProfileMiniTeaserCard from '../../../components/views/cards/ProfileMiniTeaserCard';
import { createGeneralDateFormat } from '../../../utils/formatDate';
import { InteractivityCard } from '../../../components/views/cards/InteractivityCard';
import { blockCardCoverImage } from '../../../defaults';

/*
Properties -
  imageSource - story card image src
  imageOnClickLink - url to be navigated on click of image
  primaryText - teaser header headerText
  secondaryText - date to be displayed
  primaryTextOnClickLink - url to be navigated on story primary text click
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
  interactivityCardContent -
    recommendCount
    commentCount
*/

export default class StoryBlockCard extends React.Component {
  componentWillMount() {
    /* If imageSource is not passed render default image for card cover */

    if (this.props.imageSource) {
      this.setState({
        imageSource: this.props.imageSource,
      });
    } else {
      this.setState({
        imageSource: blockCardCoverImage,
      });
    }

    /* Secondary text for story is date hence converting it to required format
      - Example '12 Apr, 2016'
    */
    if (this.props.secondaryText) {
      this.secondaryText = createGeneralDateFormat(this.props.secondaryText);
    }
    /* Default Card classes */
    this.cardClasses = 'story-block-card block-card centered fluid';
    /* Add classes passed in props to a variable */
    if (this.props.cardClasses) {
      /* default class applied to story block card for identification */

      this.props.cardClasses.map((cssClass) => {
        this.cardClasses += ` ${cssClass}`;
        return null;
      });
    }
  }
  /* If image recived from api call failed, render default image */

  render() {
    return (
      <Card className={this.cardClasses}>
      <div className="ui move reveal image" >
      <Content className="cover-image">
          <a
            className="ui centered image cover-image-link"
            href={this.props.imageOnClickLink}
            rel="noopener noreferrer"
            target="_blank"
          >
            <img src={this.state.imageSource} alt="" />
          </a>
        </Content>
        </div>
        <Content>
          <h5 className="title-min-height">
            <a href={this.props.primaryTextOnClickLink} target="_blank" rel="noopener noreferrer">
            {this.props.primaryText}
            </a>
          </h5>
          <div className="ui items meta">
            <span className="date">{this.secondaryText}</span>
          </div>
          <ProfileMiniTeaserCard {...this.props.profileMiniTeaserCardContent} isWrapped={false} />
        </Content>
        <InteractivityCard {...this.props.interactivityCardContent} />
      </Card>
    );
  }
}

StoryBlockCard.propTypes = {
  interactivityCardContent: PropTypes.object.isRequired,
  profileMiniTeaserCardContent: PropTypes.object.isRequired,
  secondaryText: PropTypes.string.isRequired,
  primaryText: PropTypes.string.isRequired,
  imageOnClickLink: PropTypes.string.isRequired,
  cardClasses: PropTypes.array,
  primaryTextOnClickLink: PropTypes.string.isRequired,
  imageSource: PropTypes.string,
};
