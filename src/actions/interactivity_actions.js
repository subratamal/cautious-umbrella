import api from '../api/api';
import fireBaseApi from '../firebaseAPI/api';
import { checkLoggedIn } from './checkLoggedIn';

/*
Actions for calling APIs for Interactivity card

/*
Universal action type for all interactivity functionalities
Action is also passed with a 'subType' which helos decide the operation
Include this action in the reducer of the page to make it working , See discoverPage_reducer
*/
// entityId, subType, component, storeIndex, sliderDataIndex, parentComponent, homeFeed
export function interActivityAction(entityId, subType, params) {
  return {
    type: `${params.parentComponent.toUpperCase()}_INTERACTIVITY_ACTION`,
    subType,
    entityId,
    component: params.componentName,
    storeIndex: params.storeIndex,
    sliderDataIndex: params.sliderDataIndex,
    homeFeed: params.homeFeed,

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


/*
COBINED COMMENT :
All actions first set a in progress state to true
once action is complete 'interactivity_reducer' sets this state to false
*/


export function saves(params) {
  return dispatch => {
    if (checkLoggedIn(true)) {
      dispatch(interActivityAction(null, 'SAVE_INPROGRESS', params));
      const storyId = params.entityId;
      return api.postInteractivitySave(params.type, params.entityId).then(function (result) {
        dispatch(interActivityAction(result.data.rel_id, 'SAVE_SUCCESS', params));
        fireBaseApi.updateFireBaseInteractivitySave(result.data, storyId, 'SAVE');
      }).catch(function (err) {
        dispatch(setErrorState(err));
      });
    }
    else {
      return;
    }
  };
}


export function removeSave(params, saveId) {
  return dispatch => {
    const uuid = checkLoggedIn(true);
    if (uuid) {
      dispatch(interActivityAction(null, 'SAVE_INPROGRESS', params));
      return api.deleteSavesFlag(params.type, params.entityId, saveId).then(function (result) {
        dispatch(interActivityAction(null, 'DELETE_SAVE', params));
        fireBaseApi.updateFireBaseInteractivitySave(uuid, params.entityId, 'DELETE');
      }).catch(function (err) {
        dispatch(setErrorState(err));
      });
    }
    else {
      return;
    }
  };
}

// type,
// entityId,
// storeIndex,
// sliderDataIndex,
// componentName,
// parentComponent,
// homeFeed

export function recommend(params, recommend_count) {
  return dispatch => {
    if (checkLoggedIn(true)) {
      dispatch(interActivityAction(null, 'RECOMMEND_INPROGRESS', params));
      return api.postInteractivityRecommend(params.type, params.entityId).then(function (result) {
        dispatch(interActivityAction(result.data.rel_id, 'RECOMMEND_SUCCESS', params));
        fireBaseApi.updateFireBaseInteractivityRecommend(result.data, params.entityId, recommend_count, 'RECOMMEND');
      }).catch(function (err) {
        dispatch(setErrorState(err));
      });
    }
    else {
      return;
    }
  };
}

export function removeRecommend(params, recommendId, recommend_count) {
  return dispatch => {
    const uuid = checkLoggedIn(true);
    if (uuid) {
      dispatch(interActivityAction(null, 'RECOMMEND_INPROGRESS', params));
      return api.deleteRecommendFlag(params.type, params.entityId, recommendId).then(function (result) {
        dispatch(interActivityAction(null, 'DELETE_RECOMMEND', params));
        fireBaseApi.updateFireBaseInteractivityRecommend(uuid, params.entityId, recommend_count, 'DELETE');
      }).catch(function (err) {
        dispatch(setErrorState(err));
      });
    }
    else {
      return;
    }
  };
}
