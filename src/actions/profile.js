import { isEmpty } from 'underscore';
import { updateProfile } from '../api/profile/profile_data';
import {
  IS_REQUESTING_FOR_PROFILE_UPDATE,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAILED,
  SYNC_PROFILE_DATA,
} from '../constants/actions';

function updateFailed(error, dispatch) {
  if (error) {
    if (!isEmpty(error)) {
      if (error && error.data && error.data[0]) {
        error = error.data[0];
      } else if (typeof error.data === 'string') {
        error = error.data;
      }
    }
    dispatch({
      type: PROFILE_UPDATE_FAILED,
    });
  }
}

export function update(profileId, data, fields) {
  return (dispatch) => {
    dispatch({
      type: IS_REQUESTING_FOR_PROFILE_UPDATE,
    });
    return updateProfile(profileId, data).then((response) => {
      if (response) {
        dispatch({
          type: SYNC_PROFILE_DATA,
          profile: response.data,
        });
      }
    }).then(() => {
      dispatch({
        type: PROFILE_UPDATE_SUCCESS,
        fields,
      });
    }).catch((err) => {
      updateFailed(err, dispatch);
    });
  };
}
