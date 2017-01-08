import api from '../api/api';
import fireBaseApi from '../firebaseAPI/api';
import { checkLoggedIn } from './checkLoggedIn';
/*
	Actions for calling APIs for Follow button functionality
*/
export function followAction(data) {
  return {
    type: `${data.parentComponent.toUpperCase()}_INTERACTIVITY_ACTION`,
    subType: data.subType,
    entityId: data.relId,
    component: data.componentName,
    storeIndex: data.storeIndex,
    sliderDataIndex: data.sliderDataIndex,
    entityType: data.type,
  };
}
/* Error State */
export function setErrorState(data) {
  return {
    type: 'SET_COMPONENT_STATE_ERROR',
    data,
  };
}
/*
	COBINED COMMENT :
	follow button action: add follow and remove follow api call
*/
export function follows(data) {
  return dispatch => {
    if (checkLoggedIn(true)) {
      const actionData = data;
      actionData.relId = null;
      actionData.subType = 'FOLLOW_INPROGRESS';
      dispatch(followAction(actionData));
      return api.saveFollow(data.type, data.entityId).then((result) => {
        actionData.relId = result.data.rel_id;
        actionData.subType = 'FOLLOW_SUCCESS';
        dispatch(followAction(actionData));
        fireBaseApi.updateFireBaseFollow(result.data, data.entityId, 'FOLLOW', data.type);
      }).catch((err) => {
        dispatch(setErrorState(err));
      });
    }
    return null;
  };
}
export function removeFollow(data) {
  return dispatch => {
    const uuid = checkLoggedIn(true);
    if (uuid) {
      const actionData = data;
      actionData.relId = null;
      actionData.subType = 'FOLLOW_INPROGRESS';
      dispatch(followAction(actionData));
      return api.deleteFollow(data.type, data.entityId, data.followId).then(() => {
        actionData.subType = 'DELETE_FOLLOW';
        dispatch(followAction(actionData));
        fireBaseApi.updateFireBaseFollow(uuid, data.entityId, 'DELETE', data.type);
      }).catch((err) => {
        dispatch(setErrorState(err));
      });
    }
    return null;
  };
}
