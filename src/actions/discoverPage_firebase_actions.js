import fireBaseApi from '../firebaseAPI/api';
import { discoverPageConfig } from '../defaults';

const parentComponent = discoverPageConfig.parentComponent;
export function setSuccessState(data, component) {
  return {
    type: `${parentComponent.toUpperCase()}_SET_COMPONENT_STATE_SUCCESS`,
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
export function fetchTopics() {
  return dispatch => fireBaseApi.getDiscoverSidebarTopics().then((result) => {
    result.reverse();
    dispatch(setSuccessState(result, discoverPageConfig.pageComponents.sideBarTopics));
  }).catch((err) => {
    dispatch(setErrorState(err, discoverPageConfig.pageComponents.sideBarTopics));
  });
}
export function fetchProfiles() {
  return dispatch => fireBaseApi.getDiscoverSidebarProfiles().then((result) => {
    result.reverse();
    dispatch(setSuccessState(result, discoverPageConfig.pageComponents.sideBarProfiles));
  }).catch((err) => {
    dispatch(setErrorState(err, discoverPageConfig.pageComponents.sideBarProfiles));
  });
}
export function fetchPages() {
  return dispatch => fireBaseApi.getDiscoverSidebarPages().then((result) => {
    result.reverse();
    dispatch(setSuccessState(result, discoverPageConfig.pageComponents.sideBarPages));
  }).catch((err) => {
    dispatch(setErrorState(err, discoverPageConfig.pageComponents.sideBarPages));
  });
}
export function fetchBodyStories() {
  return dispatch => fireBaseApi.getDiscoverStories().then(result => {
    result.reverse();
    dispatch(setSuccessState(result, discoverPageConfig.pageComponents.stories));
  }).catch((err) => {
    dispatch(setErrorState(err, discoverPageConfig.pageComponents.stories));
  });
}
export function fetchBodyEvents() {
  return dispatch => fireBaseApi.getDiscoverEvents().then(result => {
    dispatch(setSuccessState(result, discoverPageConfig.pageComponents.events));
  }).catch((err) => {
    dispatch(setErrorState(err, discoverPageConfig.pageComponents.events));
  });
}
export function fetchPrimarySliderContent() {
  return dispatch => fireBaseApi.getDiscoverPrimarySliderData().then((result) => {
    dispatch(setSuccessState(result, discoverPageConfig.pageComponents.primarySlider));
  }).catch((err) => {
    dispatch(setErrorState(err, discoverPageConfig.pageComponents.primarySlider));
  });
}
