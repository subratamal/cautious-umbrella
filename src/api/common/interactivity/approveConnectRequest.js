import request from '../../requestHandler';

export default function approveConnectRequest(currentUser, connectionId) {
  return request.post(`v1/profiles/${currentUser}/connections/${connectionId}/approve`);
}
