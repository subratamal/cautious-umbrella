import React , {Component, PropTypes} from 'react'
import {
  Icon,
  Item,
  Content,
  Card,
  Divider
} from 'react-semantify';
import { breakPointsDefaults,pageThumbnail } from '../../../defaults'
import PageBlockCard from '../../views/cards/PageBlockCard'
import {FollowButton} from '../../views/cards/FollowButton'
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


class UniversityPageFeaturedCard extends React.Component {
  constructor() {
    super();
    this.state = {windowWidth: window.innerWidth};
    this.thumbnailFetchFailed = this.thumbnailFetchFailed.bind(this)
  }
  /*If image recived from api call failed, render default image*/
  thumbnailFetchFailed() {
    this.setState({
      secondaryImageSource : pageThumbnail
    })
  }
   componentWillMount() {
    /*If imageSource is not passed render default image for card cover*/
      let thumbnailImageSrc = this.props.pages.secondaryImageSource ? this.props.pages.secondaryImageSource  : pageThumbnail;
    this.setState({
      secondaryImageSource : thumbnailImageSrc
    });
  }
  render() {
    let mastHeadImg = this.props.pages.imageSource;
    let mastHead = {
      background:'linear-gradient(0deg, rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.0)),url('+ mastHeadImg +') center center no-repeat',
      backgroundSize:'cover' /* In css required importent */
    }
    // Handle grid classes.
    let featuredCardStackable = (this.state.windowWidth <= breakPointsDefaults.largeMobileDevice) ? 'stackable' : '';
    let blockData = {
      imageOnClickLink: this.props.pages.imageOnClickLink,
      imageSource: this.props.pages.imageMobileSource,
      primaryTextOnClickLink: this.props.pages.primaryTextOnClickLink,
      primaryText: this.props.pages.primaryText,
     
      secondaryTextOnClickLink: this.props.pages.secondaryTextOnClickLink,
      secondaryText: this.props.pages.secondaryText,
      buttonText: 'follow',
      isWrapped : false,
      followButtonData : this.props.pages.followButtonData,
      cardClasses: []
    }
    return (
      <div>
      {featuredCardStackable? 
        <PageBlockCard {...blockData}/>
        : 
      <Card className={"big-feature-card page-featured-card fluid grid page-featured-card"}>
        <div className="row">
          <a href={this.props.pages.imageOnClickLink} className="ui image sixteen wide column bg-img" style={mastHead} target="_blank">
          </a>
          <div className="ui inner-container basic segment">
            <div className="ui fluid vertically very padded grid">
              <div className="ui page-featured-column twelve wide column computer twelve wide mobile">
                <div className="ui items mini-teaser">
                  <div className="item">
                    <a className="ui tiny image" href={this.props.pages.imageOnClickLink} target="_blank">
                      <img className="ui medium rounded image" src={this.state.secondaryImageSource} onError={this.thumbnailFetchFailed}/>
                    </a>
                    <div className="content ">
                      <h3 className="ui header">
                        <a href={this.props.pages.primaryTextOnClickLink} target="_blank">
                          {this.props.pages.primaryText}
                        </a>
                      </h3>
                      <div className="meta">
                          <a className="location singleline-ellipsis" href={this.props.pages.secondaryTextOnClickLink} target="_blank">{this.props.pages.secondaryText}</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ui page-featured-column grid four wide column computer four wide mobile">
                <div className="ui items column">
                  <div className="item">
                    <FollowButton {...this.props.pages.followButtonData} featuredButtonClass = {true}/>
                  </div>
                </div>
              </div>
            </div>
            <Divider className="inverted"></Divider>
          </div>
        </div>
      </Card>}
      </div>
    )
  }
}

export default UniversityPageFeaturedCard
