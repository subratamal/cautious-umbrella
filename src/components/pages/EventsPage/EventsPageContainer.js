import React, { Component, PrfaceopTypes } from 'react';
import { connect } from 'react-redux';
import { Button, Segment, Icon } from 'react-semantify';
import { bindActionCreators } from 'redux';
import { each } from 'underscore';
import ProgressBar from 'react-progress-bar-plus';
import DocumentMeta from 'react-document-meta';
// Layout Components
import { PageBody } from '../../views/PageBody';
import { PageHeaderText } from '../../views/PageHeaderText';
import { PrimarySlider } from '../../views/PrimarySlider';
import { PrimaryContent } from '../../views/PrimaryContent';
import { SubContent } from '../../views/SubContent';
import { SideBar } from '../../views/SideBar';
import { ServerErrorModal } from '../../elements/ServerErrorModal';
// Page Specific Components
import { BlockCardContainer } from '../../views/cards/BlockCardContainer';
import { PrimaryContentSlider } from '../../views/PrimaryContentSlider';
// Sidebar components-topics,pages and profiles
import { SideBarTopics } from '../../views/SideBarComponents/SideBarTopics';
import { SideBarPages } from '../../views/SideBarComponents/SideBarPages';
import { SideBarProfiles } from '../../views/SideBarComponents/SideBarProfiles';
import SideBarAdvertisement from '../../views/SideBarComponents/SideBarAdvertisement';
import SideBarLoginSignup from '../../views/SideBarComponents/SideBarLoginSignup';
import EventHead from './EventsHead';
// Utils
import { generateComponentProps } from '../../../utils/pageComponentsPropsGenerator';
import { eventsPageConfig as pageConfig } from '../../../defaults';
import * as eventsPageActions from '../../../actions/eventsPage_actions';
import { fetchProfiles, fetchPages, fetchTopics, fetchPrimarySliderContent, fetchUpcomingEvents, getDefaultDropdownEvents, fetchPastEvents } from '../../../actions/eventsPage_actions';

import * as utils from '../../../utils/utils';

// @TODO change to event page meta
import { eventsPageMeta } from '../../../utils/metaTags';

class EventsPageComponent extends React.Component {
  static fetchData({ dispatch, params = {}, query = {}, locale }) {
    return Promise.all(
      [fetchProfiles, fetchPages, fetchTopics, fetchPrimarySliderContent, fetchUpcomingEvents, fetchPastEvents].map(actionCreator => dispatch(actionCreator({ params, query, locale })))
    );
  }

  componentWillMount() {
    this.emptyComponents = {};
  }

  componentDidMount() {
    this.props.apiActions.getDefaultDropdownEvents();
  }

  componentWillUpdate(nextProps, nextState) {
    this.emptyComponents = nextProps.componentData.get('emptyComponents').toJS();
    if (nextProps.componentData.get('pageError')) {
      $('.ui.modal.serverError')
      .modal('setting', 'closable', false)
      .modal('show');
    }
  }

  render() {
    // Utility function call to create page component props
    const successListLength = this.props.componentData.get('successComponents').size;
    let percent;
    if (successListLength)
      percent = (successListLength / pageConfig.totalComponents) * 100;
    else
      percent = 10;

    const componentProps = generateComponentProps(pageConfig, this.props.apiActions, this.emptyComponents);
    return (
      // @TODO replace with event page meta
      <DocumentMeta {...eventsPageMeta}>
      { utils.isServer() ? '' : <ServerErrorModal></ServerErrorModal> }
      <PageBody tabsUrl="events">
      <PageHeaderText>
        <EventHead {...componentProps.searchForm} />
      </PageHeaderText>
      { this.props.resultHeader === false ?

        <PrimarySlider>
          <PrimaryContentSlider {...componentProps.primarySlider} />
        </PrimarySlider> : null
      }

      { /* If resultHeader is true and results have been fetched from api(isResultAvailable is true), show results.
          If resultHeader is false or results have not been fetched(isResultAvailable is true),
            show searchBar with MastHead and show upcoming and past events feed
        */
        this.props.resultHeader && (this.props.isResultAvailable || (this.props.searchLoader && this.props.searchLoader.get('loader')))
        ?
        <PrimaryContent>
          <SubContent showHeader={false} tabTitle="Search Results">
            <BlockCardContainer {...componentProps.eventSearch} ></BlockCardContainer>
          </SubContent>
        </PrimaryContent>
        :
      <PrimaryContent>
        <SubContent showHeader tabTitle="Upcoming Events">
          <BlockCardContainer {...componentProps.eventsUpcoming} ></BlockCardContainer>
        </SubContent>
        <SubContent showHeader tabTitle="Past Events">
          <BlockCardContainer {...componentProps.eventsPast} ></BlockCardContainer>
        </SubContent>
      </PrimaryContent>
      }

        <SideBar>
          <SideBarLoginSignup tabTitle="Login/Signup" computerOnly emptyState={this.props.isLoggedIn} />
          <SideBarPages {...componentProps.sideBarPages}></SideBarPages>
          <SideBarProfiles {...componentProps.sideBarProfiles}></SideBarProfiles>
          <SideBarTopics {...componentProps.sideBarTopics}></SideBarTopics>
        </SideBar>

      </PageBody>
        <ProgressBar percent={percent} spinner={false} />
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

function mapStateToProps(state) {
  return {
    resultHeader: state.get(pageConfig.reducerName).get('resultHeader'),
    componentData: state.get(pageConfig.reducerName).get(pageConfig.parentComponent),
    isLoggedIn: state.get('reducer').get('isLoggedIn'),
    isTokenReceived: state.get('reducer').get('isTokenReceived'),
    searchText: state.get(pageConfig.reducerName).get('searchText'),
    isResultAvailable: state.get(pageConfig.reducerName).get('isResultAvailable'),
    searchLoader: state.get(pageConfig.reducerName).get(pageConfig.pageComponents.eventSearch),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    apiActions: bindActionCreators(eventsPageActions, dispatch),

  };
}

// Connects dispatch and props to component
export default connect(mapStateToProps, mapDispatchToProps)(EventsPageComponent);
