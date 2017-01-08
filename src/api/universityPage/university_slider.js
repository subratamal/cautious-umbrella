/*Api Call for fetching events*/
import request from '../requestHandler';

export function getUniversityPrimarySliderPages(data) {
    return request.get('/v1/pages?fields=group_teaser&limit=2&offset=0&subtype:in(page_university,page_institutions)');
}

