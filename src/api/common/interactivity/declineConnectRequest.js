import request from '../../requestHandler';

export default function declineConnectRequest(currentUser, connectionId) {
  return request.post(`v1/profiles/${currentUser}/connections/${connectionId}/delete`);
}
