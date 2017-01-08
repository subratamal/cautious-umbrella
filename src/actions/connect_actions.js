import api from '../api/api';
import fireBaseApi from '../firebaseAPI/api';
import { checkLoggedIn } from './checkLoggedIn';

/*
	Actions for calling APIs for Follow button functionality
*/

export function connectAction(actionOptions) {
  return {
    type: `${actionOptions.parentComponent.toUpperCase()}_INTERACTIVITY_ACTION`,
    subType: actionOptions.subType,
    entityId: actionOptions.relId,
    component: actionOptions.componentName,
    storeIndex: actionOptions.storeIndex,
    sliderDataIndex: actionOptions.sliderDataIndex,
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
export function makeConnection(apiCallData) {
  return dispatch => {
    const currentUserId = checkLoggedIn(true);
    if (currentUserId) {
      const actionData = apiCallData;
      actionData.relId = null;
      actionData.subType = 'CONNECT_INPROGRESS';
      dispatch(connectAction(actionData));
      return api.saveConnect(apiCallData.type, apiCallData.entityId).then((result) => {
        if (result && result.data) {
          actionData.relId = result.data.rel_id;
          actionData.subType = 'CONNECT_SUCCESS';
          dispatch(connectAction(actionData));
          fireBaseApi.updateFireBaseConnect(result.data, currentUserId, 'CONNECT', apiCallData.type);
        }
      }).catch((err) => {
        dispatch(setErrorState(err));
      });
    }
    return null;
  };
}
export function approveRequest(apiCallData) {
  return dispatch => {
    const currentUserId = checkLoggedIn(true);
    if (currentUserId) {
      const actionData = apiCallData;
      actionData.relId = null;
      actionData.subType = 'CONNECT_INPROGRESS';
      dispatch(connectAction(actionData));
      return api.approveConnectRequest(apiCallData.entityId, apiCallData.connectionId).then((result) => {
        if (result && result.data) {
          const resposeData = result.data;
          actionData.relId = result.data.rel_id;
          actionData.subType = 'APPROVE_SUCCESS';
          dispatch(connectAction(actionData));
          fireBaseApi.updateFireBaseConnect(resposeData, currentUserId, 'APPROVE', apiCallData.type);
        }
      }).catch((err) => {
        dispatch(setErrorState(err));
      });
    }
    return null;
  };
}
export function declineRequest(apiCallData) {
  return dispatch => {
    const currentUserId = checkLoggedIn(true);
    if (currentUserId) {
      const actionData = apiCallData;
      actionData.relId = null;
      actionData.subType = 'CONNECT_INPROGRESS';
      dispatch(connectAction(actionData));
      return api.declineConnectRequest(currentUserId, apiCallData.connectionId).then(() => {
        actionData.relId = null;
        actionData.subType = 'DECLINE_SUCCESS';
        dispatch(connectAction(actionData));
        actionData.id = apiCallData.entityId;
        fireBaseApi.updateFireBaseConnect(actionData, currentUserId, 'DECLINE', apiCallData.type);
      }).catch((err) => {
        dispatch(setErrorState(err));
      });
    }
    return null;
  };
}
