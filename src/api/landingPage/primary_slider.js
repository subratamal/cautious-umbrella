/*Api Call for Login by using request handler*/
import request from '../requestHandler';

export function getLandingPrimarySliderStories(data) {
    return request.get('/v1/stories?fields=group_block&sort=-trending_weight&offset=0&limit=2');
}


export function getLandingPrimarySliderEvents(data) {
    return request.get('/v1/events?fields=group_block&sort=-trending_weight&offset=0&limit=2');
}
