import firebaseDB from '../../firebase_request_handler';
import {
checkLoggedIn,
} from '../../../actions/checkLoggedIn';
import { discoverPageCount } from '../../recordFetchCount';
/*
count - number of records to be shown,
if any record is not avialable (null check for the object)  the count is adjusted for resolve condition
*/
/* eslint no-console: ["error", { allow: ["log", "warn", "error"] }] */
export function getDiscoverSidebarTopics() {
  return new Promise((resolve, reject) => {
    const discover_topics = [];
    const uuid = checkLoggedIn(false);
    let count = discoverPageCount.topicsCount;
    firebaseDB.child('views/discover_page/sb_topics').orderByChild('weight').limitToLast(5).once('value', (discoverSnap) => {
      const discoverData = discoverSnap.val();
      if (!discoverData) {
        resolve([]);
      } else {
        const dbRecordsCount = Object.keys(discoverData).length;
        if (count > dbRecordsCount) {
          count = dbRecordsCount;
        }
      }
      discoverSnap.forEach((topicsData) => {
        let topicsObject = {};
        const topicskey = topicsData.key;
        firebaseDB.child('/resources/' + topicskey).once('value', (topicsSnap) => {
          if (discover_topics.length === count) {
            resolve(discover_topics);
          }

          topicsObject = topicsSnap.val();
          if (topicsObject === null) {
            count--;
          }
          else {
            if (uuid) {
            // follow relationship
              firebaseDB.child('/relations/subscribers/' + topicskey).orderByKey().equalTo(uuid).once('value', (followSnap) => {
                if (followSnap.val()) {
                  topicsObject.subscribed = followSnap.val()[uuid].rel_id;
                } else {
                  topicsObject.subscribed = '0';
                }
                discover_topics.push(topicsObject);
                if (discover_topics.length === count) {
                  resolve(discover_topics);
                }
              });
            } else {
              topicsObject.subscribed = '0';
              discover_topics.push(topicsObject);
              if (discover_topics.length === count) {
                resolve(discover_topics);
              }
            }
          }
        });
      });
    });
  });
}
