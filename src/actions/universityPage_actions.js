import { each } from 'underscore';
import api from '../api/api';
import { universityPageConfig } from '../defaults';
import fireBaseApi from '../firebaseAPI/api';
import {
  ADD_STORY_RECORDS_WITH_META_DATA,
} from '../modules/story/actionTypes';

export function setSuccessState(data, component) {
  return {
    type: 'SET_COMPONENT_STATE_SUCCESS',
    data,
    component,
  };
}
/* Error State */
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
/* TO store and reload default university search results */
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



export function fetchSideBarStories() {
  return dispatch => fireBaseApi.getUniversitySidebarStories().then((result) => {
    result.reverse();
    const recordIdsArray = [];
    result.map((record) => recordIdsArray.push(record.id));
    dispatch({ type: ADD_STORY_RECORDS_WITH_META_DATA, records: result, recordIdsArray, metaPropName: 'universityPageSideBarStories' });
    dispatch(setSuccessState(result, universityPageConfig.pageComponents.sideBarStories));
  }).catch((err) => {
    dispatch(setErrorState(err, universityPageConfig.pageComponents.sideBarStories));
  });
}
export function fetchSideBarEvents() {
  return dispatch => fireBaseApi.getUniversitySidebarEvents().then((result) => {
    result.reverse();
    dispatch(setSuccessState(result, universityPageConfig.pageComponents.sideBarEvents));
  }).catch((err) => {
    dispatch(setErrorState(err, universityPageConfig.pageComponents.sideBarEvents));
  });
}
export function fetchPrimarySliderContent() {
  return dispatch => fireBaseApi.getUniversityPrimarySliderPages().then((result) => {
    if (result && result[0] && result[0].data) {
      result[0].data.reverse();
    }
    dispatch(setSuccessState(result, universityPageConfig.pageComponents.primarySlider));
  }).catch((err) => {
    dispatch(setErrorState(err, universityPageConfig.pageComponents.primarySlider));
  });
}
export function processUniversitySearch(locationFilter, searchText) {
  return (dispatch) => {
    dispatch(startSearchProcessLoader(universityPageConfig.pageComponents.pages));
    return api.getUniversityPageSearchResultsFromElastic(locationFilter, searchText).then((result) => {
      const data = result.data;
      if (!data.Message) {
        each(data, (record) => {
          if (!record.following) {
            record.following = '0';
          }
        });
      }
      dispatch(setSuccessState(result.data, universityPageConfig.pageComponents.pages));
      dispatch(stopSearchProcessLoader(universityPageConfig.pageComponents.pages));
    }).catch((err) => {
      dispatch(setErrorState(err, universityPageConfig.pageComponents.pages));
    });
  };
}
export function fetchPageBlock() {
  return dispatch => fireBaseApi.getUniversityPageBlockCard().then((result) => {
    result.reverse();
    dispatch(setSuccessState(result, universityPageConfig.pageComponents.pages));
    dispatch(storeDefaultPages(result, universityPageConfig.pageComponents.pages));
    dispatch(setSuccessState(result, universityPageConfig.pageComponents.searchForm));
  }).catch((err) => {
    dispatch(setErrorState(err, universityPageConfig.pageComponents.pages));
  });
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
