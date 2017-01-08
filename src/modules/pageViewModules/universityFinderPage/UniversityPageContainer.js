import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'react-semantify';
import { bindActionCreators } from 'redux';
import DocumentMeta from 'react-document-meta';
// Layout Components
import { PageBody } from '../../../components/views/PageBody';
import { PageHeaderText } from '../../../components/views/PageHeaderText';
import { PrimarySlider } from '../../../components/views/PrimarySlider';
import { PrimaryContent } from '../../../components/views/PrimaryContent';
import { SubContent } from '../../../components/views/SubContent';
import { SideBar } from '../../../components/views/SideBar';
import { ServerErrorModal } from '../../../components/elements/ServerErrorModal';
// Page Specific Components
import { PrimaryContentSlider, actions as sliderActions } from '../../../modules/primarySlider';
import { StoriesView, actions as storyActions } from '../../../modules/story';
import { EventsView, actions as eventActions } from '../../../modules/event';
import { PagesView, actions as pageActions } from '../../../modules/pages';
import { UniversitySearchResultsContainer } from '../../../modules/universitySearch';
import SideBarAdvertisement from '../../../components/views/SideBarComponents/SideBarAdvertisement';
import SideBarLoginSignup from '../../../components/views/SideBarComponents/SideBarLoginSignup';
import UniversityMastHead from './UniversityMastHead';
// Utils
import { generateComponentProps } from '../../../utils/pageComponentsPropsGenerator';
import { universityPageConfig as pageConfig } from '../../../defaults';
import { universityPageMeta } from '../../../utils/metaTags';
import * as universityPageActions from '../../../actions/universityPage_actions';
import { fetchPrimarySliderContent, fetchPageBlock } from '../../../actions/universityPage_actions';
import * as utils from '../../../utils/utils';

class UniversityPageComponent extends React.Component {

  static fetchData({ dispatch, params = {}, query = {}, locale }) {
    return Promise.all(
      [storyActions.fetchUniversitySideBarStories, eventActions.fetchUniversitySideBarEvents, sliderActions.fetchOpportunitiesPrimarySliderContent, sliderActions.fetchUniversityPrimarySliderContent, pageActions.fetchUniversityPrimaryContentPages].map(actionCreator => dispatch(actionCreator({ params, query, locale })))
    );
  }

  componentWillMount() {
    this.emptyComponents = {};
  }

  componentWillUpdate(nextProps) {
    this.emptyComponents = nextProps.componentData.get('emptyComponents').toJS();
    if (nextProps.componentData.get('pageError')) {
      $('.ui.modal.serverError')
        .modal('setting', 'closable', false)
        .modal('show');
    }
  }

  render() {
    // Utility function call to create page component props
    const componentProps = generateComponentProps(pageConfig, this.props.apiActions, this.emptyComponents);

    return (
      <DocumentMeta {...universityPageMeta}>
      { utils.isServer() ? '' : <ServerErrorModal /> }
      <PageBody tabsUrl="universities">
      <PageHeaderText>
        <UniversityMastHead {...componentProps.searchForm} searchMode={this.props.searchMode} />
      </PageHeaderText>

      { this.props.searchMode === false ?
        <PrimarySlider>
          <PrimaryContentSlider {...componentProps.primarySlider} apiActions={this.props.sliderActions.fetchUniversityPrimarySliderContent} />
        </PrimarySlider> : null
      }
        <SideBar>
          <SideBarLoginSignup tabTitle="Login/Signup" computerOnly emptyState={this.props.isLoggedIn} />
          <StoriesView {...componentProps.sideBarStories} apiActions={this.props.storyActions.fetchUniversitySideBarStories} />
          <EventsView {...componentProps.sideBarEvents} apiActions={this.props.eventActions.fetchUniversitySideBarEvents} />
        </SideBar>

        <PrimaryContent>
          <SubContent {...componentProps.pages}>
            { this.props.searchMode ?
              <UniversitySearchResultsContainer {...componentProps.pages} />
              :
              <PagesView {...componentProps.pages} apiActions={this.props.pageActions.fetchUniversityPrimaryContentPages} />
            }
          </SubContent>
        </PrimaryContent>

      </PageBody>
        { /* <ProgressBar percent={percent} spinner={false} /> */}
        {!this.props.isTokenReceived ?
        <div className="ui active page dimmer">
          <div className="ui text loader custom-loader">
            <Icon className="header cd monogram logo loaderimage" />
          </div>
        </div> : null}
      </DocumentMeta>
    );
  }
}

UniversityPageComponent.PropTypes = {
  searchMode: PropTypes.bool,
  componentData: PropTypes.object,
  isLoggedIn: PropTypes.bool,
  isTokenReceived: PropTypes.bool,
  storyActions: PropTypes.onbject,
  pageActions: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    searchMode: state.get('universitySearchReducer').get('searchMode'),
    componentData: state.get(pageConfig.reducerName).get(pageConfig.parentComponent),
    isLoggedIn: state.get('reducer').get('isLoggedIn'),
    isTokenReceived: state.get('reducer').get('isTokenReceived'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    apiActions: bindActionCreators(universityPageActions, dispatch),
    storyActions: bindActionCreators(storyActions, dispatch),
    eventActions: bindActionCreators(eventActions, dispatch),
    pageActions: bindActionCreators(pageActions, dispatch),
    sliderActions: bindActionCreators(sliderActions, dispatch),
  };
}

// Connects dispatch and props to component
export default connect(mapStateToProps, mapDispatchToProps)(UniversityPageComponent);
