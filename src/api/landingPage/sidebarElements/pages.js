/*Api Call for fetching events*/
import request from '../../requestHandler';

export function getLandingSidebarPages(data) {
    return request.get('/v1/pages?fields=group_teaser&limit=4&offset=0');
}
