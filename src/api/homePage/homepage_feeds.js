/* Api Call for fetching Home Feeds*/
import request from '../requestHandler';

export function getHomePageFeeds(userId, offset, limit) {
  /*eslint-disable */
  return request.get(`v1/profiles/${userId}/home_feeds?fields=verb,updated_time,created_time,activity_count,actor_count,objects{fields=group_block},object{fields=group_block,subtitle,comments}&actors{fields=group_teaser}&offset=${offset}&limit=${limit}`);
  /*eslint-enable */
}

export function getHomePageTypeFeeds(userId, offset, limit, type) {
  /*eslint-disable */
  return request.get(`v1/profiles/${userId}/home_feeds?object.type=${type}&fields=verb,updated_time,created_time,activity_count,actor_count,object{fields=group_block,subtitle,comments}&actors{fields=group_teaser}&offset=${offset}&limit=${limit}`);
  /*eslint-enable */
}
