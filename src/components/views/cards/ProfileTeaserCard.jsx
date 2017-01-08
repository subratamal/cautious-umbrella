import React, { Component, PropTypes } from 'react';
import {
  Button,
  Icon,
  Item,
  Content,
  Card,
} from 'react-semantify';

import CardWrapper from './CardWrapper';
import { profilePictureThumbnail } from '../../../defaults';
import { ConnectButton } from './ConnectButton';


/*
Properties -

imageOnClickLink - url to be navigated on image click
imageSource - image src
primaryText -  primary text
primaryTextOnClickLink - url to be navigated on primary text click
secondaryText - secondary text
secondaryTextOnClickLink - url to be navigated on secondary text click
buttonText - CTA button text
isWrapped - boolean to add or remove card wrapper (default = true)
*/

class ProfileTeaserCard extends React.Component {
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
    return (
      <div className="ui items mini-teaser">
              <div className="item">
                <a className="ui mini image" href={this.props.imageOnClickLink}>
                <img className="ui medium rounded image" src={this.props.imageSource} />
                </a>
                <Content>
                  <a href={this.props.primaryTextOnClickLink} className="singleline-ellipsis">{this.props.primaryText}</a>
                  <div className="meta singleline-ellipsis">
                    <a href={this.props.secondaryTextOnClickLink}>{this.props.secondaryText}</a>
                  </div>
                  <div className="extra">
                  <ConnectButton {...this.props.connectButtonData} />
                  </div>
                </Content>
              </div>
        </div>
      );
  }
}

export default CardWrapper(ProfileTeaserCard);
