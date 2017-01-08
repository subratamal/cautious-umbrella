/* Api Call for fetching events*/
import { isEmpty, each } from 'underscore';
import { env } from '../../../config';
import request from '../requestHandler';

export function getOpportunityPageSearchResults(searchText, subtypeFilter) {
  let query = '';
  if (!isEmpty(searchText)) {
    query += `&title=${searchText}`;
  }
  if (subtypeFilter) {
    const subtype = subtypeFilter.split(',');
    query += '&subtype=';
    each(subtype, (type) => {
      query += `${type},`;
    });
    query = query.slice(0, -1); // remove last comma and add braces
  }

  return request.get(`${env.ELASTICSEARCH_URL}/home/opportunities?limit=12&offset=0&type=opportunities${query}`);
}
