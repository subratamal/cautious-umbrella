import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'react-semantify';
import { bindActionCreators } from 'redux';
import DocumentMeta from 'react-document-meta';
import { PageBody } from '../../../components/views/PageBody';
import { PageHeaderText } from '../../../components/views/PageHeaderText';
import { PrimarySlider } from '../../../components/views/PrimarySlider';
import { PrimaryContent } from '../../../components/views/PrimaryContent';
import { SubContent } from '../../../components/views/SubContent';
import { SideBar } from '../../../components/views/SideBar';
import { ServerErrorModal } from '../../../components/elements/ServerErrorModal';
import { PrimaryContentSlider, actions as sliderActions } from '../../../modules/primarySlider';
import { OpportunitySearchResultsContainer } from '../../../modules/opportunitySearch';
import SideBarAdvertisement from '../../../components/views/SideBarComponents/SideBarAdvertisement';
import SideBarLoginSignup from '../../../components/views/SideBarComponents/SideBarLoginSignup';
import OpportunitiesMastHead from './OpportunitiesMastHead';
import { generateComponentProps } from '../../../utils/pageComponentsPropsGenerator';
import { opportunitiesPageConfig as pageConfig } from '../../../defaults';
import { opportunitiesPageMeta } from '../../../utils/metaTags';
import { SideBarList } from '../../sideBar/SideBarLists';
import { PagesView } from '../../pages';
import * as opportunitiesActions from '../../opportunities/actions';
import * as pageActions from '../../pages/actions';
import * as utils from '../../../utils/utils';

import { BlockCardContainer } from '../../blockCardContainer/BlockCardsContainer';

class OpportunitiesPageComponent extends React.Component {

  static fetchData({ dispatch, params = {}, query = {}, locale }) {
    return Promise.all(
      [opportunitiesActions.fetchWeeklyOpportunities, opportunitiesActions.fetchScholarships,
        opportunitiesActions.fetchSideBarSkills, opportunitiesActions.fetchSideBarWorkAreas,
         opportunitiesActions.fetchSideBarLocations, opportunitiesActions.fetchPages,
          opportunitiesActions.fetchCollaboration, opportunitiesActions.fetchCampusAmbassador,
           opportunitiesActions.fetchFellowships, opportunitiesActions.fetchPartTimeFreelance,
            opportunitiesActions.fetchFullTime, opportunitiesActions.fetchInternships,
            sliderActions.fetchOpportunitiesPrimarySliderContent].map(actionCreator => dispatch(actionCreator({ params, query, locale })))
    );
  }
  componentWillMount() {
    this.emptyComponents = {};
  }

  render() {
    // Utility function call to create page component props

    const componentProps = generateComponentProps(pageConfig, this.props.apiActions, this.emptyComponents);
    return (
      <DocumentMeta {...opportunitiesPageMeta}>
      <div>
      { utils.isServer() ? '' : <ServerErrorModal /> }
      <PageBody tabsUrl="opportunities">
      <PageHeaderText>
        <OpportunitiesMastHead {...componentProps.searchForm} searchMode={this.props.searchMode} />
      </PageHeaderText>

      { this.props.searchMode === false ?
        <PrimarySlider>
          <PrimaryContentSlider {...componentProps.primarySlider} apiActions={this.props.sliderActions.fetchOpportunitiesPrimarySliderContent} />
        </PrimarySlider> : null
      }
        <SideBar>
          <SideBarLoginSignup tabTitle="Login/Signup" computerOnly emptyState={this.props.isLoggedIn} />
          <PagesView {...componentProps.sideBarPages} tabTitle="Top Companies" computerOnly />
          <SideBarList {...componentProps.sideBarLocations} tabTitle="Top cities" computerOnly />
          <SideBarList {...componentProps.sideBarSkills} tabTitle="Top skills" computerOnly />
          <SideBarList {...componentProps.sideBarWorkAreas} tabTitle="Top work areas" computerOnly />
          <SideBarAdvertisement tabTitle="Advertisement Secondary" computerOnly />
        </SideBar>

        { this.props.searchMode && (this.props.searchLoader || this.props.searchQueryExecuted) ?
        <PrimaryContent>
          <SubContent {...componentProps.searchedOpportunities}>
              <OpportunitySearchResultsContainer {...componentProps.searchedOpportunities} />
          </SubContent>
        </PrimaryContent>
        :
        <PrimaryContent>
          <SubContent {...componentProps.weeklyOpportunities} showHeader tabTitle="Opportunities this week">
            <BlockCardContainer type="opportunities" pageName={componentProps.weeklyOpportunities.pageName} view={componentProps.weeklyOpportunities.view} apiActions={this.props.apiActions.fetchWeeklyOpportunities} />
          </SubContent>
          <SubContent {...componentProps.internships} showHeader tabTitle="Internships">
            <BlockCardContainer type="opportunities" pageName={componentProps.internships.pageName} view={componentProps.internships.view} apiActions={this.props.apiActions.fetchInternships} />
          </SubContent>
          <SubContent {...componentProps.fullTime} showHeader tabTitle="Full time">
            <BlockCardContainer type="opportunities" pageName={componentProps.fullTime.pageName} view={componentProps.fullTime.view} apiActions={this.props.apiActions.fetchFullTime} />
          </SubContent>
          <SubContent {...componentProps.partTimeFreelance} showHeader tabTitle="Part Time/Freelance">
            <BlockCardContainer type="opportunities" pageName={componentProps.partTimeFreelance.pageName} view={componentProps.partTimeFreelance.view} apiActions={this.props.apiActions.fetchPartTimeFreelance} />
          </SubContent>
          <SubContent {...componentProps.scholarships} showHeader tabTitle="Scholarships" >
            <BlockCardContainer type="opportunities" pageName={componentProps.scholarships.pageName} view={componentProps.scholarships.view} apiActions={this.props.apiActions.fetchScholarships} />
          </SubContent>
          <SubContent {...componentProps.fellowships} showHeader tabTitle="Fellowships">
            <BlockCardContainer type="opportunities" pageName={componentProps.fellowships.pageName} view={componentProps.fellowships.view} apiActions={this.props.apiActions.fetchFellowships} />
          </SubContent>
          <SubContent {...componentProps.campusAmbassador} showHeader tabTitle="Campus Ambassador">
            <BlockCardContainer type="opportunities" pageName={componentProps.campusAmbassador.pageName} view={componentProps.campusAmbassador.view} apiActions={this.props.apiActions.fetchCampusAmbassador} />
          </SubContent>
          <SubContent {...componentProps.collaboration} showHeader tabTitle="Collaboration">
            <BlockCardContainer type="opportunities" pageName={componentProps.collaboration.pageName} view={componentProps.collaboration.view} apiActions={this.props.apiActions.fetchCollaboration} />
          </SubContent>
        </PrimaryContent>
      }

      </PageBody>
        { /* <ProgressBar percent={percent} spinner={false} /> */}
        {!this.props.isTokenReceived ?
        <div className="ui active page dimmer">
          <div className="ui text loader custom-loader">
            <Icon className="header cd monogram logo loaderimage" />
          </div>
        </div> : null}
        </div>
      </DocumentMeta>
    );
  }
}

OpportunitiesPageComponent.PropTypes = {
  searchMode: PropTypes.bool,
  componentData: PropTypes.object,
  isLoggedIn: PropTypes.bool,
  isTokenReceived: PropTypes.bool,
  storyActions: PropTypes.onbject,
  pageActions: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    searchMode: state.get('opportunitySearchReducer').get('searchMode'),
    searchQueryExecuted: state.get('opportunitySearchReducer').get('searchQueryExecuted'),
    searchLoader: state.get('opportunitySearchReducer').get('searchLoader'),
    isLoggedIn: state.get('reducer').get('isLoggedIn'),
    isTokenReceived: state.get('reducer').get('isTokenReceived'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    apiActions: bindActionCreators(opportunitiesActions, dispatch),
    sliderActions: bindActionCreators(sliderActions, dispatch),
    pageActions: bindActionCreators(pageActions, dispatch),
  };
}

// Connects dispatch and props to component
export default connect(mapStateToProps, mapDispatchToProps)(OpportunitiesPageComponent);
