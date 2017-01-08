import api from '../../api/api';
import fireBaseApi from '../../firebaseAPI/api';
import { checkLoggedIn } from '../../actions/checkLoggedIn';
 /*
 	Actions for calling APIs for Follow button functionality
 */
export function followAction(data) {
  return {
    type: `${data.type}s/${data.type.toUpperCase()}_FOLLOW_UPDATE`,
    subType: data.subType,
    relationId: data.relationId,
    entityType: data.type,
    entityId: data.entityId,
  };
}

export function follows(data) {
  return dispatch => {
    if (checkLoggedIn(true)) {
      const actionData = data;
      actionData.relId = null;
      actionData.subType = 'FOLLOW_INPROGRESS';
      dispatch(followAction(actionData));
      return api.saveFollow(data.type, data.entityId).then((result) => {
        actionData.relationId = result.data.rel_id;
        actionData.subType = 'FOLLOW_SUCCESS';
        dispatch(followAction(actionData));
        fireBaseApi.updateFireBaseFollow(result.data, data.entityId, 'FOLLOW', data.type);
      }).catch((err) => {
        // TODO Server error handling
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
      return api.deleteFollow(data.type, data.entityId, data.relationId).then(() => {
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
