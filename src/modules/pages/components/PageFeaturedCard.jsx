import React, { PropTypes } from 'react';
import { Card, Divider } from 'react-semantify';
import { breakPointsDefaults, pageThumbnail } from '../../../defaults';
import PageBlockCard from './PageBlockCard';
import { FollowButton } from '../../follow/FollowButton';
/*
Properties -
imageOnClickLink - url to be navigated on image click
imageSource - image src
secondaryImageSource: secondary image
primaryText -  primary text
primaryTextOnClickLink - url to be navigated on primary text click
secondaryText - secondary text
secondaryTextOnClickLink - url to be navigated on secondary text click
buttonText -CTA button
*/


class PageFeaturedCard extends React.Component {
  constructor() {
    super();
    this.state = { windowWidth: window.innerWidth };
    this.thumbnailFetchFailed = this.thumbnailFetchFailed.bind(this);
  }
  /* If image recived from api call failed, render default image */
  componentWillMount() {
    const thumbnailImageSrc = this.props.pages.secondaryImageSource ? this.props.pages.secondaryImageSource : pageThumbnail;
    this.setState({
      secondaryImageSource: thumbnailImageSrc,
    });
  }
  thumbnailFetchFailed() {
    this.setState({
      secondaryImageSource: pageThumbnail,
    });
  }
  render() {
    const coverImage = {
      background: `linear-gradient(0deg, rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.0)),url('${this.props.pages.imageSource}') center center no-repeat`,
      backgroundSize: 'cover',
    };
    // Handle grid classes.
    const featuredCardStackable = (this.state.windowWidth <= breakPointsDefaults.largeMobileDevice) ? 'stackable' : '';
    const {
      imageOnClickLink,
      imageMobileSource,
      primaryTextOnClickLink,
      primaryText,
      secondaryTextOnClickLink,
      secondaryText,
      followButtonData,
    } = this.props.pages;
    const blockData = {
      imageOnClickLink,
      imageSource: imageMobileSource,
      primaryTextOnClickLink,
      primaryText,
      secondaryTextOnClickLink,
      secondaryText,
      buttonText: 'follow',
      isWrapped: false,
      followButtonData,
      cardClasses: [],
    };
    return (
      <div>
      {featuredCardStackable ?
        <PageBlockCard {...blockData} />
        :
      <Card className={"big-feature-card page-featured-card fluid grid page-featured-card"}>
        <div className="row">
          <a href={imageOnClickLink} rel="noopener noreferrer" className="ui image sixteen wide column bg-img" style={coverImage} target="_blank" />
          <div className="ui inner-container basic segment">
            <div className="ui fluid vertically very padded grid">
              <div className="ui page-featured-column twelve wide column computer twelve wide mobile">
                <div className="ui items mini-teaser">
                  <div className="item">
                    <a className="ui tiny image" href={imageOnClickLink} target="_blank" rel="noopener noreferrer">
                      <img className="ui medium rounded image" src={this.state.secondaryImageSource} alt="" onError={this.thumbnailFetchFailed} />
                    </a>
                    <div className="content ">
                      <h3 className="ui header">
                        <a href={primaryTextOnClickLink} target="_blank" rel="noopener noreferrer">
                          {primaryText}
                        </a>
                      </h3>
                      <div className="meta">
                          <a className="location singleline-ellipsis" href={secondaryTextOnClickLink} target="_blank" rel="noopener noreferrer"> {secondaryText} </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ui page-featured-column grid four wide column computer four wide mobile">
                <div className="ui items column">
                  <div className="item">
                    <FollowButton {...followButtonData} featuredButtonClass />
                  </div>
                </div>
              </div>
            </div>
            <Divider className="inverted" />
          </div>
        </div>
      </Card>}
      </div>
    );
  }
}

PageFeaturedCard.propTypes = {
  imageOnClickLink: PropTypes.string,
  imageMobileSource: PropTypes.string,
  primaryTextOnClickLink: PropTypes.string,
  primaryText: PropTypes.string,
  secondaryTextOnClickLink: PropTypes.string,
  secondaryText: PropTypes.string,
  followButtonData: PropTypes.object,
  pages: PropTypes.object,
};


export default PageFeaturedCard;
