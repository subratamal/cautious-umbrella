import fireBaseApi from '../../firebaseAPI/api';
import { checkLoggedIn } from '../../actions/checkLoggedIn';
import { SET_INTERACTIVITY_STATE } from '../opportunities/actionTypes';
import api from '../../api/api';

export function save(type, id) {
  return dispatch => {
    if (checkLoggedIn(true)) {
      dispatch({ type: SET_INTERACTIVITY_STATE, id, interactivityKey: 'saved', data: true });
      const opportunityId = id;
      return api.postInteractivitySave(type, opportunityId).then((result) => {
        dispatch({ type: SET_INTERACTIVITY_STATE, id, interactivityKey: 'saved', data: result.data.rel_id });
        fireBaseApi.updateFireBaseInteractivitySave(result.data, opportunityId, 'SAVE');
      }).catch((err) => {
        throw (err);
      });
    }
    return null;
  };
}

export function removeSave(type, entityId, saveId) {
  return dispatch => {
    const uuid = checkLoggedIn(true);
    if (uuid) {
      dispatch({ type: SET_INTERACTIVITY_STATE, id: entityId, interactivityKey: 'saved', data: false });
      return api.deleteSavesFlag(type, entityId, saveId).then((result) => {
        fireBaseApi.updateFireBaseInteractivitySave(uuid, entityId, 'DELETE');
      }).catch((err) => {
        console.log(err);
      });
    }
    return null;
  };
}
