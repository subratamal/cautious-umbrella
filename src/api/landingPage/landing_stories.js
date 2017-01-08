/*Api Call for Login by using request handler*/
import request from '../requestHandler';

export function getLandingStories(data) {
    return request.get('/v1/stories?fields=trending_weight,group_block&sort=-trending_weight&offset=0&limit=3');
}
