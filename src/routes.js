import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import { scrollToTop } from './utils/domManipulationUtils';
import DiscoverPageContainer from './components/pages/DiscoverPage/DiscoverPageContainer';
import UniversityPageContainer from './modules/pageViewModules/universityFinderPage/UniversityPageContainer';
import HomePage from './components/pages/HomePage/HomePage';
import EventsPageContainer from './components/pages/EventsPage/EventsPageContainer';
import routeUrls from './constants/routeURLConstants';
import OpportunityViewPageContainer from './modules/pageViewModules/opportunityViewPage/OpportunityViewPageContainer';
import OpportunitiesPageContainer from './modules/pageViewModules/opportunitiesLandingPage/OpportunitiesPageContainer';

function lazyLoadComponent(lazyModule) {
  return (location, cb) => {
    if ($('.ui.page.dimmer.first-load').length !== 0) {
      $('.ui.page.dimmer.first-load')[0].style.display = "block";
      $('.ui.page.dimmer.first-load')[0].style.opacity = "0.6";
    }
    lazyModule(module => {
      cb(null, module);
      if ($('.ui.page.dimmer.first-load').length !== 0) {
        $('.ui.page.dimmer.first-load')[0].style.display = "none";
        $('.ui.page.dimmer.first-load')[0].style.opacity = "0";
      }
    });
  };
}

function loadComponent(module) {
  return __CLIENT__
    ? lazyLoadComponent(module)
    : (location, cb) => cb(null, module);
}

export default function getRoutes() {
  return (
    <Route path="/" component={App}>
      <IndexRoute getComponent={loadComponent(HomePage)} />
      <Route path={routeUrls.discoverLandingPage} getComponent={loadComponent(DiscoverPageContainer)} />
      <Route path={routeUrls.universityLandingPage} getComponent={loadComponent(UniversityPageContainer)} />
      <Route path={routeUrls.eventsLandingPage} getComponent={loadComponent(EventsPageContainer)} />
      <Route path={routeUrls.opportunityLandingPage} getComponent={loadComponent(OpportunitiesPageContainer)} />
      <Route path={`${routeUrls.opportunityViewPage}/:opportunityId`} onEnter={scrollToTop} getComponent={loadComponent(OpportunityViewPageContainer)} />
    </Route>
  );
}
