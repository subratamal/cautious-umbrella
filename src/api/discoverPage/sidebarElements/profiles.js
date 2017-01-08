/*Api Call for fetching events*/
import request from '../../requestHandler';

export function getDiscoverSidebarProfiles(data) {
    return request.get('v1/profiles?fields=group_teaser&offset=0&limit=4');
}
