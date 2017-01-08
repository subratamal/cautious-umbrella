import request from '../requestHandler';
import { checkLoggedIn } from '../../actions/checkLoggedIn';

export function resetUnseenCount() {
  const uuid = checkLoggedIn(false);
  return request.post(`/v1/profiles/${uuid}/connections_requests/reset_unseen`, {});
}
