import firebaseDB from '../../firebase_request_handler';
import {
checkLoggedIn,
} from '../../../actions/checkLoggedIn';
import { eventsPageCount } from '../../recordFetchCount';
/*
count - number of records to be shown,
if any record is not avialable (null check for the object)  the count is adjusted for resolve condition
*/
/* eslint no-console: ["error", { allow: ["log", "warn", "error"] }] */
export function getEventSidebarTopics() {
  return new Promise((resolve, reject) => {
    const event_topics = [];
    const uuid = checkLoggedIn(false);
    let count = eventsPageCount.topicsCount;

    firebaseDB.child('views/events_page/sb_topics').orderByChild('weight').limitToLast(5).once('value', function (eventSnap) {
      const eventData = eventSnap.val();
      if (!eventData) {
        resolve([]);
      } else {
        const dbRecordsCount = Object.keys(eventData).length;
        if (count > dbRecordsCount) {
          count = dbRecordsCount;
        }
      }
      eventSnap.forEach(function (topicsData) {
        let topicsObject = {};
        const topicskey = topicsData.key;
        firebaseDB.child('/resources/' + topicskey).once('value', function (topicsSnap) {
          if (event_topics.length === count) {
            resolve(event_topics);
          }

          topicsObject = topicsSnap.val();
          if (topicsObject === null) {
            count--;
          }
          else {
            if (uuid) {
            // follow relationship
              firebaseDB.child('/relations/subscribers/' + topicskey).orderByKey().equalTo(uuid).once('value', function (followSnap) {
                if (followSnap.val()) {
                  topicsObject.subscribed = followSnap.val()[uuid].rel_id;
                } else {
                  topicsObject.subscribed = '0';
                }
                event_topics.push(topicsObject);
                if (event_topics.length === count) {
                  resolve(event_topics);
                }
              });
            } else {
              topicsObject.subscribed = '0';
              event_topics.push(topicsObject);
              if (event_topics.length === count) {
                resolve(event_topics);
              }
            }
          }
        });
      });
    });
  });
}
