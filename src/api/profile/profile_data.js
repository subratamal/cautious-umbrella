import request from '../requestHandler';

export function fetchProfileInfo(userId) {
  let url = `/v1/profiles/${userId}?fields=current_campus`;
  return request.get(url)
}

export function updateProfile(profileId, data) {
  let url = `/v1/profiles/${profileId}`;
  return request.put(url, data)
}
