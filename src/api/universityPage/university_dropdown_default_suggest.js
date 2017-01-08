import request from '../requestHandler';
/* @TODO change api */
export function getUniversityDropdownDefaultSuggest() {
    return request.get('/v1/pages?fields=group_teaser&limit=4&offset=0&subtype:in(page_university,page_institutions)');
}
