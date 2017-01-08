import { each } from 'underscore';
import api from '../api/api';
import { eventsPageConfig } from '../defaults';
import fireBaseApi from '../firebaseAPI/api';

export function setSuccessState(data, component) {
  return {
    type: 'EVENTSPAGE_SET_COMPONENT_STATE_SUCCESS',
    data,
    component,
  };
}
/* Error State*/
export function setErrorState(data, component) {
  return {
    type: 'SET_COMPONENT_STATE_ERROR',
    data,
    component,
  };
}
export function setResultHeader(status) {
  return {
    type: 'SET_RESULT_HEADER',
    status,
  };
}
export function startSearchProcessLoader(component) {
  return {
    type: 'START_SEARCH_PROCESS_LOADER',
    component,
  };
}
export function stopSearchProcessLoader(component) {
  return {
    type: 'STOP_SEARCH_PROCESS_LOADER',
    component,
  };
}
/* TO store and reload default university search results*/
export function storeDefaultPages(data) {
  return {
    type: 'STORE_DEFAULT_PAGES',
    data,
  };
}
export function reloadDefaultPages() {
  return {
    type: 'RELOAD_DEFAULT_PAGES',
  };
}
export function emptyBeforeReload() {
  return {
    type: 'EMPTY_BEFORE_RELOAD',
  };
}
export function eventInteractivity(data) {
  return {
    type: 'EVENTSPAGE_INTERACTIVITY_ACTION',
    data,
  };
}
export function searchOngoingStarted() {
  return {
    type: 'ONGOING_SEARCH_STARTED',
  };
}
export function searchOngoingEnded() {
  return {
    type: 'ONGOING_SEARCH_ENDED',
  };
}

export function setResultAvailableTrue() {
  return {
    type: 'SET_RESULT_AVAILABLE_TRUE',
  };
}

export function fetchProfiles() {
  return dispatch => fireBaseApi.getEventSidebarProfiles().then((result) => {
    result.reverse();
    dispatch(setSuccessState(result, eventsPageConfig.pageComponents.sideBarProfiles));
  }).catch((err) => {
    dispatch(setErrorState(err, eventsPageConfig.pageComponents.sideBarProfiles));
  });
}
export function fetchPages() {
  return dispatch => fireBaseApi.getEventSidebarPages().then((result) => {
    result.reverse();
    dispatch(setSuccessState(result, eventsPageConfig.pageComponents.sideBarPages));
  }).catch((err) => {
    dispatch(setErrorState(err, eventsPageConfig.pageComponents.sideBarPages));
  });
}
export function fetchTopics() {
  return dispatch => fireBaseApi.getEventSidebarTopics().then((result) => {
    result.reverse();
    dispatch(setSuccessState(result, eventsPageConfig.pageComponents.sideBarTopics));
  }).catch((err) => {
    dispatch(setErrorState(err, eventsPageConfig.pageComponents.sideBarTopics));
  });
}
export function fetchPrimarySliderContent() {
  return dispatch => fireBaseApi.getEventsPrimarySliderEvents().then((result) => {
    dispatch(setSuccessState(result, eventsPageConfig.pageComponents.primarySlider));
  }).catch((err) => {
    dispatch(setErrorState(err, eventsPageConfig.pageComponents.primarySlider));
  });
}
export function fetchUpcomingEvents() {
  return dispatch => fireBaseApi.getUpcomingEvents().then(result => {
    result.reverse();
    dispatch(setSuccessState(result, eventsPageConfig.pageComponents.eventsUpcoming));
  }).catch((err) => {
    dispatch(setErrorState(err, eventsPageConfig.pageComponents.eventsUpcoming));
  });
}
export function getDefaultDropdownEvents() {
  return dispatch => api.getEventsDropdownDefaultSuggest().then(result => {
    dispatch(setSuccessState(result, eventsPageConfig.pageComponents.searchForm));
  });
}
export function fetchPastEvents() {
  return dispatch => fireBaseApi.getPastEvents().then(result => {
    result.reverse();
    dispatch(setSuccessState(result, eventsPageConfig.pageComponents.eventsPast));
  }).catch((err) => {
    dispatch(setErrorState(err, eventsPageConfig.pageComponents.eventsPast));
  });
}
export function searchTextSync(text) {
  return {
    type: 'SEARCH_TEXT_SYNC',
    text,
  };
}
export function setResultAvailableFalse() {
  return {
    type: 'SET_RESULT_AVAILABLE_FALSE',
  };
}

export function processEventSearch(locationFilter, searchText, subtypeFilter) {
  return (dispatch) => {
    dispatch(startSearchProcessLoader(eventsPageConfig.pageComponents.eventSearch));
    return api.getEventsPageSearchResults(locationFilter, searchText, subtypeFilter)
		.then((result) => {
  const data = result.data;
  if (!data.Message) {
    each(data, (record) => {
      if (!record.following) {
				/* eslint-disable */
				record.following = '0';
	    /* eslint-enable */
      }
    });
  }
  dispatch(setSuccessState(result.data, eventsPageConfig.pageComponents.eventSearch));
  dispatch(setResultAvailableTrue()); // results are available hence set flag
  dispatch(stopSearchProcessLoader(eventsPageConfig.pageComponents.eventSearch));
}).catch((err) => {
  dispatch(setErrorState(err, eventsPageConfig.pageComponents.events));
});
  };
}

export function processEventSearchFromElastic(locationFilter, searchText, subtypeFilter) {
  return (dispatch) => {
    dispatch(startSearchProcessLoader(eventsPageConfig.pageComponents.eventSearch));
    return api.getEventsPageSearchResultsFromElastic(locationFilter, searchText, subtypeFilter)
		.then((result) => {
  const data = result.data;
  if (!data.Message) {
    each(data, (record) => {
      if (!record.following) {
				/* eslint-disable */
				record.following = '0';
	    /* eslint-enable */
      }
    });
  }
  dispatch(setSuccessState(result.data, eventsPageConfig.pageComponents.eventSearch));
  dispatch(setResultAvailableTrue()); // results are available hence set flag
  dispatch(stopSearchProcessLoader(eventsPageConfig.pageComponents.eventSearch));
}).catch((err) => {
  dispatch(setErrorState(err, eventsPageConfig.pageComponents.events));
});
  };
}
