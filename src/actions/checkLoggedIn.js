import api from '../api/api';
import { getPropertyByName } from '../utils/utils';

export function checkLoggedIn(showModal) {
  try {
    if (getPropertyByName('isLoggedIn') === '1') {
      if (getPropertyByName('isAccountVerified') === '1') {
        return getPropertyByName('profileId');
      } else if (showModal) {
        $('.ui.modal.auth-modal').modal('show');
        return false;
      }
      return false;
    } else if (showModal) {
      $('.ui.modal.auth-modal').modal('show');
      return false;
    }
    return false;
  } catch (exp) {
    // TODO: As localStorage is getting used for user authentication purpose it will break in server.
    // 			 Server side implementation for user authentication needed.
    return false;
  }
}
