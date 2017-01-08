/*Api Call for fetching events*/
import request from '../../requestHandler';

export function getUniversitySidebarEvents(data) {
    return request.get('/v1/events?fields=trending_weight,group_block&sort=-trending_weight&offset=0&limit=4');
}
