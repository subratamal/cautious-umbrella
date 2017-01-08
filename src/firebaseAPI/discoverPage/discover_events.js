import firebaseDB from '../firebase_request_handler';
import {
checkLoggedIn,
} from '../../actions/checkLoggedIn';
import { discoverPageCount } from '../recordFetchCount';
import { sortDescending } from '../../utils/sort';
/*
count - number of records to be shown,
if any record is not avialable (null check for the object)  the count is adjusted for resolve condition
*/
export function getDiscoverEvents() {
  return new Promise((resolve, reject) => {
    const discoverEvents = [];
    const uuid = checkLoggedIn(false);
    let count = discoverPageCount.eventsCount;
    firebaseDB.child('views/discover_page/body_events').orderByChild('weight').limitToLast(3).once('value', (discoverSnap) => {
      const discoverData = discoverSnap.val();
      if (!discoverData) {
        resolve([]);
      } else {
        const dbRecordsCount = Object.keys(discoverData).length;
        if (count > dbRecordsCount) {
          count = dbRecordsCount;
        }
      }
      discoverSnap.forEach((eventData) => {
        let eventsObject = { weight: eventData.val().weight };
        const eventKey = eventData.key;
        firebaseDB.child(`/resources/${eventKey}`).once('value', (eventSnap) => {
          const weight = eventsObject.weight;
          eventsObject = eventSnap.val();
          eventsObject.weight = weight;
          if (eventsObject === null) {
            --count;
            if (discoverEvents.length === count) {
              resolve(discoverEvents);
            }
          } else {
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
                    if (uuid) {
                      firebaseDB.child(`/relations/saves/${eventKey}`).orderByKey().equalTo(uuid).once('value', (savesSnap) => {
                        if (savesSnap.val()) {
                          eventsObject.saved = savesSnap.val()[uuid].rel_id;
                        } else {
                          eventsObject.saved = '0';
                        }
                        firebaseDB.child(`/relations/recommends/${eventKey}`).orderByKey().equalTo(uuid).once('value', (recommendsSnap) => {
                          if (recommendsSnap.val()) {
                            eventsObject.recommended = recommendsSnap.val()[uuid].rel_id;
                          } else {
                            eventsObject.recommended = '0';
                          }
                          discoverEvents.push(eventsObject);
                          if (discoverEvents.length === count) {
                            sortDescending(discoverEvents, 'weight');
                            resolve(discoverEvents);
                          }
                        });
                      });
                    } else {
                      eventsObject.saved = '0';
                      eventsObject.recommended = '0';
                      discoverEvents.push(eventsObject);
                      if (discoverEvents.length === count) {
                        sortDescending(discoverEvents, 'weights');
                        resolve(discoverEvents);
                      }
                    }
                  });
                });
              });
            });
          }
        });
      });
    });
  });
}
