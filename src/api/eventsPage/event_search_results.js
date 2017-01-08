/* Api Call for fetching events*/
import { isEmpty, each } from 'underscore';
import request from '../requestHandler';
import { env } from '../../../config';
import firebaseDB from '../../firebaseAPI/firebase_request_handler';
import { checkLoggedIn } from '../../actions/checkLoggedIn';


export function getEventsPageSearchResults(locationFilter, searchText, subtypeFilter) { // eslint-disable-line
  let query = '';
// locationFilters is comma saperated list of strings
  if (locationFilter) {
    const locations = locationFilter.split(',');
    // query += '&location.city:in(';
    query += '&location.city=';
    each(locations, (city) => {
      query += `${city},`;
    });
    // query = query.slice(0, -1) + ')'; // remove last comma and add braces
    query = query.slice(0, -1); // remove last comma and add braces
  }
  if (!isEmpty(searchText)) {
    // query += '&title:like' + searchText + '%';
    query += `&title=${searchText}`;
  }
  if (subtypeFilter) {
    const subtype = subtypeFilter.split(',');
    // query += '&subtype:in(';
    query += '&subtype=';
    each(subtype, (type) => {
      query += `${type},`;
    });
    // query = query.slice(0, -1) + ')'; // remove last comma and add braces
    query = query.slice(0, -1); // remove last comma and add braces
  }
  // return request.get('/v1/events?fields=group_block&limit=4&offset=0' + query);
  return request.get(`${env.ELASTICSEARCH_URL}/home/events?limit=12&offset=0&type=event${query}`); /* eslint max-len: ["error", 200]*/
}

export function getEventsPageSearchResultsFromElastic(locationFilter, searchText, subtypeFilter) {
  return new Promise((resolve) => {
    let searchEvents = [];
    const uuid = checkLoggedIn(false);
    let count = 12;
    getEventsPageSearchResults(locationFilter, searchText, subtypeFilter).then((allEventSnap) => {
      searchEvents = allEventSnap;
      const discoverData = allEventSnap.data;
      if (!discoverData) {
        resolve([]);
      } else {
        const dbRecordsCount = Object.keys(discoverData).length;
        if (count > dbRecordsCount) {
          count = dbRecordsCount;
        }
      }
      if ({}.hasOwnProperty.call(discoverData, 'Message')) {
        resolve(searchEvents);
      } else {
        discoverData.forEach((eventData) => {
          if (searchEvents.data.length > 0) {
            searchEvents.data = [];
          }
          let eventsObject = {};
          const eventKey = eventData.id;
          firebaseDB.child(`/resources/${eventKey}`).once('value', (eventSnap) => {
            eventsObject = eventSnap.val();
            if (eventsObject === null) {
              --count;
              if (searchEvents.length === count) {
                resolve(searchEvents);
              }
            } else {
                // debugger;
              firebaseDB.child(`/relations/author/${eventKey}`).once('value', (authorSnap) => {
                authorSnap.forEach((authorData) => {
                  firebaseDB.child(`/resources/${authorData.key}`).once('value', (authorDetailsSnap) => {
                    eventsObject.author = {
                      data: [],
                    };
                    eventsObject.author.data[0] = authorDetailsSnap.val();
                    firebaseDB.child(`/relations/current_campus/${authorData.key}`).orderByKey().once('value', (campusSnap) => {
                      const campusData = campusSnap.val();
                      if (campusData && campusData[0].type === 'string') {
                        eventsObject.author.data[0].current_campus = {
                          data: campusData,
                        };
                      } else {
                        eventsObject.author.data[0].current_campus = {
                          data: [],
                        };
                      }
                      if (uuid) { // saves relationship
                        firebaseDB.child(`/relations/saves/${eventKey}`).orderByKey().equalTo(uuid).once('value', (savesSnap) => {
                          if (savesSnap.val()) {
                            eventsObject.saved = savesSnap.val()[uuid].rel_id;
                          } else {
                            eventsObject.saved = '0';
                          }
    // reccomends
                          firebaseDB.child(`/relations/recommends/${eventKey}`).orderByKey().equalTo(uuid).once('value', (recommendsSnap) => {
                            if (recommendsSnap.val()) {
                              eventsObject.recommended = recommendsSnap.val()[uuid].rel_id;
                            } else {
                              eventsObject.recommended = '0';
                            }

                            searchEvents.data.push(eventsObject);
                            if (searchEvents.data.length === count) {
                              resolve(searchEvents);
                            }
                          });
                        });
                      } else {
                        eventsObject.saved = '0';
                        eventsObject.recommended = '0';
                        searchEvents.data.push(eventsObject);

                        if (searchEvents.data.length === count) {
                          resolve(searchEvents);
                        }
                      }
                    });
                  });
                });
              });
            }
          });
        });
      }
    });
  });
}
