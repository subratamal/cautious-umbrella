import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'react-semantify';
import { bindActionCreators } from 'redux';
import ProgressBar from 'react-progress-bar-plus';
import DocumentMeta from 'react-document-meta';

// Layout Components
import { PageBody } from '../../views/PageBody';
import { PageHeaderText } from '../../views/PageHeaderText';
import { LoginModal } from '../../views/LoginModal';
import { LoggedIn } from '../../elements/LoggedIn';
import { SideBar } from '../../views/SideBar';
import { PrimaryContent } from '../../views/PrimaryContent';
import { SubContent } from '../../views/SubContent';
import { ServerErrorModal } from '../../elements/ServerErrorModal';

// Page Specific Components
import FeedCard from '../../views/cards/FeedCard';
import FeedCardEvent from '../../views/cards/FeedCardEvent';
import FeedCardStory from '../../views/cards/FeedCardStory';
import { SideBarTrendingStories } from '../../views/SideBarComponents/SideBarTrendingStories';
import SideBarUserProfile from '../../views/SideBarComponents/SideBarUserProfile';
import SideBarAdvertisement from '../../views/SideBarComponents/SideBarAdvertisement';
import { SideBarSlider } from '../../views/SideBarComponents/SideBarSlider';
import ShareModal from '../../views/ShareModal';
import { homePageMeta } from '../../../utils/metaTags';

// Utils
import { generateComponentProps } from '../../../utils/pageComponentsPropsGenerator';
import { homePageConfig as pageConfig } from '../../../defaults';
import * as homePageActions from '../../../actions/homePage_actions';
import { fetchTrendingStories, fetchSidebarSliderData, fetchHomeFeedData,
  fetchHomeFeedEventData, fetchHomeFeedStoryData } from '../../../actions/homePage_actions';
import connectDataFetchers from '../../../utils/connectDataFetchers';
import * as utils from '../../../utils/utils';


class HomePageComponent extends React.Component {
  static propTypes = {
    props: PropTypes.shape({
      componentData: PropTypes.string
    })
  }

  static fetchData({ dispatch, params = {}, query = {}, locale }) {
    return Promise.all(
      [fetchTrendingStories, fetchSidebarSliderData, fetchHomeFeedData, fetchHomeFeedEventData, fetchHomeFeedStoryData]
      .map(actionCreator => dispatch(actionCreator({ params, query, locale })))
    );
  }

  componentWillUpdate(nextProps, nextState) {
    this.emptyComponents = nextProps.componentData.get('emptyComponents').toJS();

    if (nextProps.componentData.get('pageError')) {
      $('.ui.modal.serverError')
                .modal('setting', 'closable', false)
                .modal('show');
    }
  }

  componentWillMount() {
    this.emptyComponents = {};
  }

  render() {
    /*
      props being passed to wach component, contains apiActions
      TODO - Explore any ways better to pass the props
    */
    // Utility function call to create page component props
    const successListLength = this.props.componentData.get('successComponents').size;
    let percent;
    if (successListLength)
      percent = (successListLength / pageConfig.totalComponents) * 100;
    else
      percent = 10;
    const componentProps = generateComponentProps(pageConfig, this.props.apiActions, this.emptyComponents);

    return (
          <DocumentMeta {...homePageMeta}>
            { utils.isServer() ? '' : <ServerErrorModal></ServerErrorModal> }
            <PageBody tabsUrl="home" pageClass="page-feed">
            <SideBar>
                <SideBarUserProfile computerOnly {...componentProps.sideBarProfiles}></SideBarUserProfile>
                <SideBarTrendingStories {...componentProps.sideBarTrendingStories} ></SideBarTrendingStories>
                <SideBarSlider {...componentProps.sideBarSlider} computerOnly />
            </SideBar>
            <PrimaryContent>
              <SubContent showHeader={false} computerOnly>
                <FeedCard {...componentProps.HomePageFeed} />
              </SubContent>
              <SubContent showHeader={false} tabTitle="All" computerOnly={false}>
                <FeedCard {...componentProps.HomePageFeed} />
              </SubContent>
              <SubContent showHeader={false} tabTitle="Stories" computerOnly={false}>
                <FeedCardStory {...componentProps.HomePageFeedStory} feedType="story" />
              </SubContent>
              <SubContent showHeader={false} tabTitle="Events" computerOnly={false}>
                <FeedCardEvent {...componentProps.HomePageFeedEvent} feedType="event" />
              </SubContent>
            </PrimaryContent>
            </PageBody>
            <ProgressBar percent={percent} spinner={false} />
            {!this.props.isTokenReceived ?
            <div className="ui active page dimmer">
              <div className="ui text loader custom-loader">
                <Icon className="header cd monogram logo loaderimage" />
              </div>
            </div> : null}
            <ShareModal {...componentProps.ShareFeed} />
        </DocumentMeta>
    );
  }
}

function mapStateToProps(state) {
  return {
    componentData: state.get('homePage').get(pageConfig.parentComponent),
    isTokenReceived: state.get('reducer').get('isTokenReceived'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    apiActions: bindActionCreators(homePageActions, dispatch),
  };
}

HomePageComponent.propTypes = {
  componentData: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.func,
  ]).isRequired,
  isTokenReceived: React.PropTypes.oneOfType([
    React.PropTypes.boolean,
    React.PropTypes.func,
  ]).isRequired,
  apiActions: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.func,
  ]).isRequired,
};

// Connects dispatch and props to component
export default connect(mapStateToProps, mapDispatchToProps)(HomePageComponent);
