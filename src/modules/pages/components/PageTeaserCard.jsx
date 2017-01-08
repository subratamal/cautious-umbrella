/* Page Card Mini Teaser*/
import React, { Component } from 'react';
import {
Item,
Content,
Card,
} from 'react-semantify';

import { profilePictureThumbnail } from '../../../defaults';
import { FollowButton } from '../../follow/FollowButton';

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

class PageTeaserCard extends React.Component {
  constructor() {
    super();
    this.imageFetchFailed = this.imageFetchFailed.bind(this);
  }

  componentWillMount() {
    let image;
    image = this.props.imageSource ? this.props.imageSource : profilePictureThumbnail;
    this.setState({
      imageSource: image,
    });
  }
/* If image recived from api call failed, render default image*/
  imageFetchFailed() {
    this.setState({
      imageSource: profilePictureThumbnail,
    });
  }
  render() {
    const textClass = this.props.showFullTextClass ? this.props.showFullTextClass
: '';
    const textClasses = 'ui ' + (this.props.secondaryText ? ' primary-text ' : ' primary-text ') + textClass;
    const imageSource = this.props.imageSource ? this.props.imageSource : this.state.imageSource;
    return (
<div className="ui items mini-teaser page-mini-teaser">
<Item>
          <a className="ui mini image" href={this.props.imageOnClickLink}>
          <img className="ui medium rounded image" src={imageSource} onError={this.imageFetchFailed} />
          </a>
    <Content>
       <a href={this.props.primaryTextOnClickLink} className={textClasses}>{this.props.primaryText}</a>
        <div className="meta secondary-text location">
          {this.props.secondaryText}
        </div>
     <div className="extra">
                <FollowButton {...this.props.followButtonData} />
                </div>
    </Content>
        </Item>
        </div>
);
  }
}

export default PageTeaserCard;
