import request from '../requestHandler';

export function getCSRFToken() {
  const url = "/services/session/token";
  return request.post(url, {}, {
    withCredentials: true
  })
}
