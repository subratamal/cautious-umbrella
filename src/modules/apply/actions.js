import fireBaseApi from '../../firebaseAPI/api';
import { checkLoggedIn } from '../../actions/checkLoggedIn';
import { SET_INTERACTIVITY_STATE } from '../opportunities/actionTypes';
import api from '../../api/api';

export function apply(opportunityId) {
  return dispatch => {
    const uuid = checkLoggedIn(true);
    if (uuid) {
      dispatch({ type: SET_INTERACTIVITY_STATE, id: opportunityId, interactivityKey: 'applied', data: true });
      return api.applyForOpportunity(opportunityId)
      .then((result) => {
        dispatch({ type: SET_INTERACTIVITY_STATE, id: opportunityId, interactivityKey: 'applied', data: result.data.rel_id });
        fireBaseApi.updateFireBaseApply(result.data, opportunityId, 'APPLY');
      }).catch((err) => {
        console.log(err);
      });
    }
    return {};
  };
}

export function unApply(opportunityId, relId) {
  return dispatch => {
    const uuid = checkLoggedIn(true);
    if (uuid) {
      dispatch({ type: SET_INTERACTIVITY_STATE, id: opportunityId, interactivityKey: 'applied', data: false });
      return api.cancelOpportunityApplication(opportunityId, relId)
      .then(() => {
        fireBaseApi.updateFireBaseApply(uuid, opportunityId, 'DELETE');
      }).catch((err) => {
        console.log(err);
      });
    }
    return {};
  };
}
