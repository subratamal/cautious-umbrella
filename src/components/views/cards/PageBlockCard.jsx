import { Content, Card } from 'react-semantify';
import React, { PropTypes } from 'react';
import { blockCardCoverImage, pageThumbnail } from '../../../defaults';
import { FollowButton } from './FollowButton';


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
cardClasses - array of classes on card
*/
class PageBlockCard extends React.Component {
  constructor() {
    super();
    this.state = {
      showDefaultTillImageLoad: true,
    };
    this.coverFetchFailed = this.coverFetchFailed.bind(this);
    this.thumbnailFetchFailed = this.thumbnailFetchFailed.bind(this);
    this.onLoadFunction = this.onLoadFunction.bind(this);
  }

  componentDidMount() {
/* Add classes passed in props to a variable*/
    if (this.props.cardClasses) {
/* default class applied to page block card for identification */
      this.cardClasses = 'block-card page-block-card fluid';
      this.props.cardClasses.map((cssClass) => {
        this.cardClasses = `${this.cardClasses} ${cssClass}`;
      });
    }
/* If imageSource is not passed render default image for card cover*/
    const coverImageSrc = this.props.imageSource ? this.props.imageSource : blockCardCoverImage;
    const thumbnailImageSrc = this.props.secondaryImageSource ?
    this.props.secondaryImageSource : pageThumbnail;
    this.setState({
      imageSource: coverImageSrc,
      secondaryImageSource: thumbnailImageSrc,
    });
  }

/* If image recived from api call failed, render default image*/
  onLoadFunction() {
    this.setState({
      showDefaultTillImageLoad: false,
    });
  }
  thumbnailFetchFailed() {
    this.setState({
      secondaryImageSource: pageThumbnail,
      showDefaultTillImageLoad: false,
    });
  }
  coverFetchFailed() {
    this.setState({
      imageSource: blockCardCoverImage,
    });
  }

  render() {
    return (
      <Card className={this.cardClasses}>
        <div className="ui move reveal image" >
          <Content className="cover-image" >
            <a
              className="ui centered image cover-image-link "
              href={this.props.imageOnClickLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img className="ui fluid image" src={this.state.imageSource} alt="" />
            </a>
          </Content>
        </div>
        <Content>
          <div className="ui center aligned container">
            <a
              className="ui centered tiny image"
              href={this.props.imageOnClickLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="ui centered medium rounded image"
                alt=""
                src={this.state.secondaryImageSource}
                onError={this.thumbnailFetchFailed}
              />
            </a>
            <div className="ui list">
              <a
                href={this.props.primaryTextOnClickLink}
                className="singleline-ellipsis"
                target="_blank"
                rel="noopener noreferrer"
              >
                {this.props.primaryText}
              </a>
              <div className="meta singleline-ellipsis location">
                {this.props.secondaryText}
              </div>
            </div>
            <FollowButton {...this.props.followButtonData} />
          </div>
        </Content>
      </Card>
    );
  }
}
PageBlockCard.propTypes = {
  followButtonData: PropTypes.object.isRequired,
  secondaryText: PropTypes.string.isRequired,
  primaryText: PropTypes.string.isRequired,
  imageOnClickLink: PropTypes.string.isRequired,
  cardClasses: PropTypes.array.isRequired,
  primaryTextOnClickLink: PropTypes.string.isRequired,
  secondaryImageSource: PropTypes.string.isRequired,
  imageSource: PropTypes.string,
};

export default PageBlockCard;
