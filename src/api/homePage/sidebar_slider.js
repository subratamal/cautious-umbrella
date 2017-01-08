import request from '../requestHandler';

export function getHomeSidebarSliderEvents(data) {
    return request.get('/v1/events?fields=group_block&sort=-trending_weight&offset=0&limit=3');
}