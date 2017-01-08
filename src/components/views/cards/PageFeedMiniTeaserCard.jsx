/* Page Card Mini Teaser*/
import React from 'react';
import { Item, Content } from 'react-semantify';

import CardWrapper from './CardWrapper';

/*
Properties -

imageOnClickLink - url to be navigated on image click
imageSource - image src
primaryText -  primary text
primaryTextOnClickLink - url to be navigated on primary text click
secondaryText - secondary text
secondaryTextOnClickLink - url to be navigated on secondary text click
isWrapped - boolean to add or remove card wrapper (default = true)

*/

/*
class .mini-teaser is wirtten in item.overrides which
- Makes the mini teaser responsive as required
- Overrides default behaviour added by semnatic mobile device dimentions
*/

class PageFeedMiniTeaserCard extends React.Component {
  getPrimaryText() {
    const textClass = this.props.showFullTextClass
? this.props.showFullTextClass : '';
    const textClasses = `ui primary-text ${textClass}`;
    if (this.props.verb === 'publish' || this.props.verb === 'recommend'
    || this.props.verb === 'comment') {
      return (
        <div className={textClasses}>
          <a
            href={this.props.primaryTextOnClickLink}
            target="_blank" rel="noopener noreferrer"
          >
          {this.props.actorName} </a>
          {this.props.primaryText}
        </div>
    );
    } else if (this.props.verb === 'attending') {
      if (this.props.secondaryActor !== '') {
        return (
          <div className={textClasses}>
            <a
              href={this.props.primaryTextOnClickLink}
              target="_blank" rel="noopener noreferrer"
            >
            {this.props.actorName}</a>
            , <a
              href={this.props.secondaryActorUrl}
              target="_blank" rel="noopener noreferrer"
            >
              {this.props.secondaryActor} </a>
            {this.props.primaryText}
          </div>
      );
      /*eslint-disable*/
      } else {
      /*eslint-enable*/
        return (
          <div className={textClasses}>
            <a
              href={this.props.primaryTextOnClickLink}
              target="_blank" rel="noopener noreferrer"
            >{this.props.actorName} </a>
            {this.props.primaryText}
          </div>
      );
      }
    } else if(this.props.verb === 'story_added') {
      return (
        <div className={textClasses}>
          {this.props.storyAddedData.type}
          <a
          href={this.props.storyAddedData.link}
          target="_blank" rel="noopener noreferrer"
          >
             {this.props.storyAddedData.title}
          </a>
          {this.props.primaryText}
          <a
            href={this.props.primaryTextOnClickLink}
            target="_blank" rel="noopener noreferrer"
          >
          {this.props.actorName} </a>
        </div>
      );
    } else {
      return (
        <div className={textClasses}>
          {this.props.primaryText}
          <a
            href={this.props.primaryTextOnClickLink}
            target="_blank" rel="noopener noreferrer"
          >
          {this.props.actorName} </a>
        </div>
      );
    }
  }
  render() {
    return (
      <div className="ui items mini-teaser page-mini-teaser">
        <Item>
          <a className="ui mini image" href={this.props.imageOnClickLink}>
            <img
              className="ui medium rounded image"
              src={this.props.imageSource} alt="profile"
            />
          </a>
          <Content>
            {this.getPrimaryText()}
            <div className="meta secondary-text location">
              {this.props.secondaryText}
            </div>
          </Content>
        </Item>
      </div>
    );
  }
}

PageFeedMiniTeaserCard.propTypes = {
  primaryText: React.PropTypes.string,
  primaryTextOnClickLink: React.PropTypes.string,
  secondaryText: React.PropTypes.string,
  actorName: React.PropTypes.string,
  imageSource: React.PropTypes.string,
  imageOnClickLink: React.PropTypes.string,
  verb: React.PropTypes.string,
  showFullTextClass: React.PropTypes.string,
  secondaryActor: React.PropTypes.string,
  secondaryActorUrl: React.PropTypes.string,
};

/*eslint-disable*/
export default CardWrapper(PageFeedMiniTeaserCard);
/*eslint-enable*/
