import firebaseDB from '../firebase_request_handler';
import {
checkLoggedIn,
} from '../../actions/checkLoggedIn';
import { eventsPageCount } from '../recordFetchCount';
/*
count - number of records to be shown,
if any record is not avialable (null check for the object)  the count is adjusted for resolve condition
*/
export function getPastEvents() {
  return new Promise((resolve, reject) => {
    const uuid = checkLoggedIn(false);
    firebaseDB.child('views/events_page/body_past_events').orderByChild('weight').limitToLast(3).once('value').then(function (eventListSnap) {
      const pastEvents_promises = [];
      eventListSnap.forEach(function (individualEvent) {
        const eventKey = individualEvent.key;
        const pastEventpromise = firebaseDB.child('/resources/' + eventKey).once('value').then(function (eventSnap) {
          const eventObject = eventSnap.val();
          if (eventObject != null && eventObject.type === 'event') {
            var authorRelationPromise = firebaseDB.child('/relations/author/' + eventKey).once('value').then(function (authorRelationSnap) {
              const authorObjectPromises = [];
              authorRelationSnap.forEach(function (authorData) {
                const authorObject = {
                  data: [],
                };
                const authorDetailsPromise = firebaseDB.child('/resources/' + authorData.key).once('value').then(function (authorDetailsSnap) {
                  authorObject.data[0] = authorDetailsSnap.val();
                  const campusPromise = firebaseDB.child('/relations/current_campus/' + authorDetailsSnap.key).orderByKey().once('value').then(function (campusSnap) {
                    authorObject.data[0].current_campus = {
                      data: [],
                    };
                    if (campusSnap.val()) {
                      authorObject.data[0].current_campus.data = campusSnap.val();
                    }
                    return authorObject;
                  });
                  return Promise.resolve(campusPromise);
                }).then(function (values) {
                  return Promise.resolve(values);
                });
                authorObjectPromises.push(authorDetailsPromise);
              });
              return Promise.all(authorObjectPromises);
            }).then(function (authorValues) {
              eventObject.author = authorValues[0];
              return eventObject;
            });
            var recommendPromise = firebaseDB.child('/relations/recommends/' + eventKey + '/' + uuid).once('value').then(function (recommendsSnap) {
              if (recommendsSnap.val()) {
                return recommendsSnap.val().rel_id;
              } else {
                return '0';
              }
            });
            var savedpromise = firebaseDB.child('/relations/saves/' + eventKey + '/' + uuid).once('value').then(function (savesSnap) {
              if (savesSnap.val()) {
                return savesSnap.val().rel_id;
              } else {
                return '0';
              }
            });
          }
          return Promise.all([authorRelationPromise, recommendPromise, savedpromise]);
        }).then(function (values) {
          const eventObject = values[0];
          eventObject.recommended = values[1];
          eventObject.saved = values[2];
          return eventObject;
        });
        pastEvents_promises.push(pastEventpromise);
      });
      return Promise.all(pastEvents_promises);
    }).then(function (values) {
      resolve(values);
    });
  });
}
