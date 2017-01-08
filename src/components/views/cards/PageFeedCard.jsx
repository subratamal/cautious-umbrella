import React, { Component, PropTypes } from 'react';
import {
Card,
Content,
Item,
Icon,
Divider,
} from 'react-semantify';
import PageMiniTeaserCard from './PageMiniTeaserCard';
import PageFeedMiniTeaserCard from './PageFeedMiniTeaserCard';
import CommentList from './CommentList';
import FeedCommentForm from './FeedCommentForm';
import ShareModal from '../ShareModal';
import { createGeneralDateFormat } from '../../../utils/formatDate';
import { blockCardCoverImage } from '../../../defaults';
import { changeHtmlToString } from '../../../defaults';
import { InteractivityCard } from './InteractivityCard';
/*
Properties -
  imageSource - story card image src
  imageOnClickLink - url to be navigated on click of image
  primaryText - teaser header headerText
  secondaryText - date to be displayed
  primaryTextOnClickLink - url to be navigated on story primary text click
  cardClasses -  an array of class names to be attached to the block car
              -  'hide-block-card-shadow' - hides the shadow around the card
  MiniTeaserCardContent -  accept data for min teaser content as an object with structire ->
    imageOnClickLink - url to be navigated on image click
    imageSource - image src
    primaryText -  primary text
    primaryTextOnClickLink - url to be navigated on primary text click
    secondaryText - secondary text
    secondaryTextOnClickLink - url to be navigated on secondary text click
    isWrapped - boolean to add or remove card wrapper (default = true)
*/
class PageFeedCard extends React.Component {
  constructor(props) {
    super(props);
    this._openShareModal = this._openShareModal.bind(this);
  }
  componentWillMount() {
      /* If imageSource is not passed render default image for card cover*/

    if (!this.props.imageSource) {
      this.imageSource = blockCardCoverImage;
    }
    else {
      this.imageSource = this.props.imageSource;
    }

      /* Secondary text for story is date hence converting it to required format
        - Example '12 Apr, 2016'
      */
    if (this.props.secondaryText) {
      this.secondaryText = createGeneralDateFormat(this.props.secondaryText);
    }
      /* Default Card classes*/
    this.cardClasses = 'feed-card story-block-card centered fluid';

      /* Add classes passed in props to a variable*/
    if (this.props.cardClasses) {
        /* default class applied to story block card for identification */

      this.props.cardClasses.map((cssClass) => {
        this.cardClasses += ' ' + cssClass;
      });
    }
  }
  _openShareModal() {
    $('.ui.modal.share-modal').modal('show');
    const heading = this.props.body.primaryText;
    const url = this.props.body.imageOnClickLink;
    const shareData = {
      heading,
      url,
    };
    let { apiActions, dispatch } = this.props;
    dispatch(apiActions.setFeedShareData(shareData));
  }
  getAllFeeds(feedName) {
    const mastHeadImg = this.imageSource;
    const mastbg = {
      backgroundImage: 'url(' + mastHeadImg + ')',
    };
    return (
        <div className="page-feed" key={feedName}>
          <Card className={this.cardClasses}>
              <Content>
                <PageFeedMiniTeaserCard {...this.props.actors} isWrapped={false} />
              </Content>
                <a className="ui image fluid feed-bg-img" href={this.props.imageOnClickLink} style={mastbg} target="_blank" />
                <Content>
                  <h3 className="page-feed-header">
                    <a href={this.props.primaryTextOnClickLink} target="_blank">
                      {this.props.primaryText}
                    </a>
                  </h3>
                  <p className="description">
                      {changeHtmlToString(this.props.secondaryText)}
                  </p>
                  <div className="ui items meta">
                    <span className="date page-feed-date">{this.props.updatedTime}</span>
                  </div>
                  <PageMiniTeaserCard {...this.props.feedProfile} isWrapped={false} />
                </Content>

                <InteractivityCard {...this.props.body.interactivityCardData} onShareClick={this._openShareModal.bind(this)} />
                {/* <Content>
                  <CommentList/>
                </Content>*/}
                {/* <FeedCommentForm/>*/}
          </Card>
          <Divider className="hidden" />
        </div>
    );
  }
  getHomePageFeed() {
    const feedName = this.props.type;
    return this.getAllFeeds(feedName);
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

PageFeedCard.propTypes = {
  imageOnClickLink: PropTypes.string,
  primaryTextOnClickLink: PropTypes.string,
  primaryText: PropTypes.string,
  view: PropTypes.string,
  secondaryText: PropTypes.string,
  body: PropTypes.object,
  feedProfile: PropTypes.object,
  actors: PropTypes.object,
  imageSource: PropTypes.string,
  feedName: PropTypes.string,
  cardClasses: PropTypes.array,
};

export default PageFeedCard;
