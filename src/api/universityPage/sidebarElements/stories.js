
import request from '../../requestHandler';

export function getUniversitySidebarStories(data) {
    return request.get('/v1/stories?fields=trending_weight,group_block&sort=-trending_weight&offset=0&limit=4');
}
