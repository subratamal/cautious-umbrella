/*Api Call for fetching events*/
import request from '../../requestHandler';

export function getDiscoverSidebarTopics(data) {
    return request.get('v1/topics?fields=name,subscriber_count&sort=-subscriber_count&offset=0&limit=5');
}
