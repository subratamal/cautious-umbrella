/* Api Call for fetching events*/
import request from '../requestHandler';
import { env } from '../../../config';
import firebaseDB from '../../firebaseAPI/firebase_request_handler';
import { checkLoggedIn } from '../../actions/checkLoggedIn';

export function getUniversityPageSearchResults(locationFilter, searchText) {
  let query = '';

  if (locationFilter) {
    const locations = locationFilter.split(',');
    query += '&location.city=';
    query += locations.join(',');
  }

  if (searchText) {
    query += `&title=${searchText}`;
  }

  return request.get(`${env.ELASTICSEARCH_URL}/home/pages?limit=12&subtype=page_university,page_institution&offset=0&type=page${query}`);
}

export function fetchFollowers(pageKey, uuid) {
  return firebaseDB.child(`/relations/followers/${pageKey}`).orderByKey().equalTo(uuid).once('value');
}

export function getUniversityPageSearchResultsFromElastic(locationFilter, searchText) {
  let NUMBER_OF_RESULTS_PER_PAGE = 12;
  return new Promise((resolve) => {
    let searchPages = [];
    const uuid = checkLoggedIn(false);
    let dbRecordsCount;
    let discoverData;

    getUniversityPageSearchResults(locationFilter, searchText)
    .then((allPagesSnap) => {
      searchPages = allPagesSnap;
      discoverData = allPagesSnap.data;

      if (!discoverData) {
        resolve([]);
      } else {
        dbRecordsCount = Object.keys(discoverData).length;
        if (NUMBER_OF_RESULTS_PER_PAGE > dbRecordsCount) {
          NUMBER_OF_RESULTS_PER_PAGE = dbRecordsCount;
        }
      }

      // TODO: Standadize response structure and use response code for such evaluation.
      if ({}.hasOwnProperty.call(discoverData, 'Message')) {
        resolve(searchPages);
      } else {
        if (searchPages.data.length > 0) {
          searchPages.data = [];
        }
        discoverData.forEach((pageData) => {
          let pageObject = {};
          pageObject = pageData;
          const pageKey = pageData.id;

          pageObject.following = '0';
          if (uuid) { // get followers
            fetchFollowers(pageKey, uuid)
            .then((savesSnap) => {
              if (savesSnap.val()) {
                pageObject.following = savesSnap.val()[uuid].rel_id;
              } else {
                pageObject.following = '0';
              }

              searchPages.data.push(pageObject);
              if (searchPages.data.length === NUMBER_OF_RESULTS_PER_PAGE) {
                resolve(searchPages);
              }
            });
          } else {
            searchPages.data.push(pageObject);
            if (searchPages.data.length === NUMBER_OF_RESULTS_PER_PAGE) {
              resolve(searchPages);
            }
          }
        });
      }
    });
  });
}
