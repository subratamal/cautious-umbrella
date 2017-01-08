import request from '../requestHandler';
/* @TODO change api */
export function getEventsDropdownDefaultSuggest() {
    return request.get('/v1/events?fields=group_teaser,location&limit=4&offset=0');
}
