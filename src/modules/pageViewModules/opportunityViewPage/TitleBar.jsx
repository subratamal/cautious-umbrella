import React from 'react';
import { connect } from 'react-redux';
import { Grid, Icon, Button, Item } from 'react-semantify';
import { generatePageTeaserCards } from '../../../utils/cardsGenerators/teaserCardsGenerator';
import OpportunitiesView from '../../opportunities/OpportunitiesView';
import PagesView from '../../pages/PagesView';

const imageSource = require('../../../../static/images/logo.png');

class TitleBarStatic extends React.Component {
  constructor(props) {
    super(props);
    this.followButtonData = null;
    this.secondaryMenuVisible = false;
  }


  componentWillMount() {
    this.emptyComponents = {};
  }

  componentDidMount() {
    $('#opportunity-secondary-title-wrapper').slideUp();
    const headerOrgOffset = $('#opportunity-title-card').height() / 3;
    $('#opportunity-secondary-title-wrapper')
      .height($('#opportunity-secondary-title-bar').height());
    $(window).scroll(function a() {
      const currentScroll = $(this).scrollTop();
      if (currentScroll > headerOrgOffset) {
        // $('#opportunity-secondary-title-wrapper').slideDown();
        if (!this.secondaryMenuVisible) {
          $('#opportunity-secondary-title-wrapper').transition({
            animation: 'slide down',
            duration: '500ms',
          });
          this.secondaryMenuVisible = true;
        }
      } else {
        // $('#opportunity-secondary-title-wrapper').slideUp();
        if (this.secondaryMenuVisible) {
          $('#opportunity-secondary-title-wrapper').transition({
            animation: 'slide up',
            duration: '500ms',
          });
          this.secondaryMenuVisible = false;
        }
      }
    });
  }

  render() {
    const componentProps = this.props.componentProps;
    return (
      <div
        className="menu opportunity-secondary-title-wrapper"
        id="opportunity-secondary-title-wrapper"
      >
        <div
          id="opportunity-secondary-title-bar"
          className="ui text fixed header-menu menu opportunity-secondary-title-bar fitted"
        >
          <div className="ui middle aligned grid item section-left recruiter-title-teaser">
            <div className="menu left desktop-menu">
              <PagesView {...componentProps.secondaryTitleBarAuthor} />
            </div>
          </div>
          <div className="ui item section-middle title-bar-opportunity">
            <OpportunitiesView {...componentProps.secondaryTitleBarOpportunityName} />
          </div>
          <div className="ui middle aligned grid item section-right">
            <div className="menu right desktop-menu">
              <OpportunitiesView {...componentProps.secondaryTitleBarOpportunity} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
TitleBarStatic.propTypes = {
  apiActions: React.PropTypes.object,
  componentProps: React.PropTypes.object,
};

export default TitleBarStatic;
