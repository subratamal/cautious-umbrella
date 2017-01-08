import { each } from 'underscore';
import api from '../api/api';
import { opportunitiesPageConfig } from '../defaults';
import fireBaseApi from '../firebaseAPI/api';

export function setSuccessState(data, component) {
  return {
    type: 'SET_COMPONENT_STATE_SUCCESS',
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

export function searchTextSync(text) {
  return {
    type: 'SEARCH_TEXT_SYNC',
    text,
  };
}

export function resetSearchText() {
  return {
    type: 'RESET_SEARCH_TEXT',
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

export function emptyBeforeReload() {
  return {
    type: 'EMPTY_BEFORE_RELOAD',
  };
}

export function setSearchResult(status) {
  return {
    type: 'SET_SEARCH_RESULT',
    status,
  };
}

export function reloadDefaultPages() {
  return {
    type: 'RELOAD_DEFAULT_PAGES',
  };
}

export function fetchPrimarySliderContent() {
  return dispatch => {
    fireBaseApi.getOpportunitiesPrimarySliderPages().then((result) => {
      dispatch(setSuccessState(result, opportunitiesPageConfig.pageComponents.primarySlider));
    }).catch((err) => {
      dispatch(setErrorState(err, opportunitiesPageConfig.pageComponents.primarySlider));
    });
  };
}

export function fetchWeeklyOpportunities() {
  return dispatch => {
    fireBaseApi.getWeeklyOpportunities().then((result) => {
      dispatch(setSuccessState(result, opportunitiesPageConfig.pageComponents.weeklyOpportunities));
    }).catch((err) => {
      dispatch(setErrorState(err, opportunitiesPageConfig.pageComponents.weeklyOpportunities));
    });
  };
}

export function fetchScholarships() {
  return dispatch => {
    fireBaseApi.getOpportunitiesScholarships().then((result) => {
      dispatch(setSuccessState(result, opportunitiesPageConfig.pageComponents.scholarships));
    }).catch((err) => {
      dispatch(setErrorState(err, opportunitiesPageConfig.pageComponents.scholarships));
    });
  };
}

export function fetchSideBarSkills() {
  return dispatch => {
    fireBaseApi.getOpportunitiesSideBarSkills().then((result) => {
      dispatch(setSuccessState(result, opportunitiesPageConfig.pageComponents.sideBarSkills));
    }).catch((err) => {
      dispatch(setErrorState(err, opportunitiesPageConfig.pageComponents.sideBarSkills));
    });
  };
}

export function fetchSideBarWorkAreas() {
  return dispatch => {
    fireBaseApi.getOpportunitiesSideBarWorkAreas().then((result) => {
      dispatch(setSuccessState(result, opportunitiesPageConfig.pageComponents.sideBarWorkAreas));
    }).catch((err) => {
      dispatch(setErrorState(err, opportunitiesPageConfig.pageComponents.sideBarWorkAreas));
    });
  };
}

export function fetchSideBarLocations() {
  return dispatch => {
    fireBaseApi.getOpportunitiesSideBarLocations().then((result) => {
      dispatch(setSuccessState(result, opportunitiesPageConfig.pageComponents.sideBarLocations));
    }).catch((err) => {
      dispatch(setErrorState(err, opportunitiesPageConfig.pageComponents.sideBarLocations));
    });
  };
}

export function fetchPages() {
  return dispatch => {
    fireBaseApi.getOpportunitiesSideBarCompanies().then((result) => {
      dispatch(setSuccessState(result, opportunitiesPageConfig.pageComponents.sideBarCompanies));
    }).catch((err) => {
      dispatch(setErrorState(err, opportunitiesPageConfig.pageComponents.sideBarCompanies));
    });
  };
}

export function fetchCollaboration() {
  return dispatch => {
    fireBaseApi.getOpportunitiesCollaborations().then((result) => {
      dispatch(setSuccessState(result, opportunitiesPageConfig.pageComponents.collaboration));
    }).catch((err) => {
      dispatch(setErrorState(err, opportunitiesPageConfig.pageComponents.collaboration));
    });
  };
}

export function fetchCampusAmbassador() {
  return dispatch => {
    fireBaseApi.getOpportunitiesCampusAmbassador().then((result) => {
      dispatch(setSuccessState(result, opportunitiesPageConfig.pageComponents.campusAmbassador));
    }).catch((err) => {
      dispatch(setErrorState(err, opportunitiesPageConfig.pageComponents.campusAmbassador));
    });
  };
}

export function fetchFellowships() {
  return dispatch => {
    fireBaseApi.getOpportunitiesFellowships().then((result) => {
      dispatch(setSuccessState(result, opportunitiesPageConfig.pageComponents.fellowships));
    }).catch((err) => {
      dispatch(setErrorState(err, opportunitiesPageConfig.pageComponents.fellowships));
    });
  };
}

export function fetchPartTimeFreelance() {
  return dispatch => {
    fireBaseApi.getOpportunitiesPartTimeFreelance().then((result) => {
      dispatch(setSuccessState(result, opportunitiesPageConfig.pageComponents.partTimeFreelance));
    }).catch((err) => {
      dispatch(setErrorState(err, opportunitiesPageConfig.pageComponents.partTimeFreelance));
    });
  };
}

export function fetchFullTime() {
  return dispatch => {
    fireBaseApi.getOpportunitiesFullTime().then((result) => {
      dispatch(setSuccessState(result, opportunitiesPageConfig.pageComponents.fullTime));
    }).catch((err) => {
      dispatch(setErrorState(err, opportunitiesPageConfig.pageComponents.fullTime));
    });
  };
}

export function fetchInternships() {
  return dispatch => {
    fireBaseApi.getOpportunitiesInternship().then((result) => {
      dispatch(setSuccessState(result, opportunitiesPageConfig.pageComponents.internships));
    }).catch((err) => {
      dispatch(setErrorState(err, opportunitiesPageConfig.pageComponents.internships));
    });
  };
}

export function processOpportunitiesSearch(locationFilter, searchText) {
  return (dispatch) => {
    dispatch(startSearchProcessLoader(opportunitiesPageConfig.pageComponents.pages));
    return api.getOpportunitiesSearchResults(locationFilter, searchText).then((result) => {
      const data = result.data;
      if (!data.Message) {
        each(data, (record) => {
          if (!record.following) {
            record.following = '0';
          }
        });
      }
      dispatch(setSearchResult(true));
      dispatch(setSuccessState(result.data, opportunitiesPageConfig.pageComponents.searchedOpportunities));
      dispatch(stopSearchProcessLoader(opportunitiesPageConfig.pageComponents.pages));
    }).catch((err) => {
      dispatch(setErrorState(err, opportunitiesPageConfig.pageComponents.searchedOpportunities));
    });
  };
}
