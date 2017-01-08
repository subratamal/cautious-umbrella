import fireBaseApi from '../firebaseAPI/api';
import { landingPageConfig } from '../defaults';

const parentComponent = landingPageConfig.parentComponent;
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
  return dispatch => fireBaseApi.getLandingSidebarTopics().then((result) => {
    result.reverse();
    dispatch(setSuccessState(result, landingPageConfig.pageComponents.sideBarTopics));
  }).catch((err) => {
    dispatch(setErrorState(err, landingPageConfig.pageComponents.sideBarTopics));
  });
}
export function fetchProfiles() {
  return dispatch => fireBaseApi.getLandingSidebarProfiles().then((result) => {
    result.reverse();
    dispatch(setSuccessState(result, landingPageConfig.pageComponents.sideBarProfiles));
  }).catch((err) => {
    dispatch(setErrorState(err, landingPageConfig.pageComponents.sideBarProfiles));
  });
}
export function fetchPages() {
  return dispatch => fireBaseApi.getLandingSidebarPages().then((result) => {
    result.reverse();
    dispatch(setSuccessState(result, landingPageConfig.pageComponents.sideBarPages));
  }).catch((err) => {
    dispatch(setErrorState(err, landingPageConfig.pageComponents.sideBarPages));
  });
}
export function fetchBodyStories() {
  return dispatch => fireBaseApi.getLandingStories().then(result => {
    result.reverse();
    dispatch(setSuccessState(result, landingPageConfig.pageComponents.stories));
  }).catch((err) => {
    dispatch(setErrorState(err, landingPageConfig.pageComponents.stories));
  });
}
export function fetchBodyEvents() {
  return dispatch => fireBaseApi.getLandingEvents().then(result => {
    result.reverse();
    dispatch(setSuccessState(result, landingPageConfig.pageComponents.events));
  }).catch((err) => {
    dispatch(setErrorState(err, landingPageConfig.pageComponents.events));
  });
}
export function fetchPrimarySliderContent() {
  return dispatch => fireBaseApi.getLandingPrimarySliderData().then((result) => {
    dispatch(setSuccessState(result, landingPageConfig.pageComponents.primarySlider));
  }).catch((err) => {
    dispatch(setErrorState(err, landingPageConfig.pageComponents.primarySlider));
  });
}
