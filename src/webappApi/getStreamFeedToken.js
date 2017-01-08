/* Api call to get getStream feed user token */
import request from './requestHandler';

export function getStreamNotificationFeedToken(data) {
  return request.post('getStreamNotificationFeedToken', data);
}

export function getStreamActivityFeedToken(data) {
  // Path does not exist now.
  return request.post('getStreamActivityFeedToken', data);
}
