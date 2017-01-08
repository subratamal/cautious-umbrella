import firebaseDB from '../../firebase_request_handler';
import {
checkLoggedIn,
} from '../../../actions/checkLoggedIn';
import { discoverPageCount } from '../../recordFetchCount';
/*
count - number of records to be shown,
if any record is not avialable (null check for the object)  the count is adjusted for resolve condition
*/
export function getDiscoverSidebarPages() {
  return new Promise((resolve, reject) => {
    const discover_pages = [];
    const uuid = checkLoggedIn(false);
    let count = discoverPageCount.pagesCount;
    firebaseDB.child('views/discover_page/sb_pages').orderByChild('weight').limitToLast(4).once('value', (discoverSnap) => {
      const discoverData = discoverSnap.val();
      if (!discoverData) {
        resolve([]);
      } else {
        const dbRecordsCount = Object.keys(discoverData).length;
        if (count > dbRecordsCount) {
          count = dbRecordsCount;
        }
      }
      discoverSnap.forEach((pageData) => {
        let pageObject = {};
        const pageKey = pageData.key;
        firebaseDB.child('/resources/' + pageKey).once('value', (pageSnap) => {
          pageObject = pageSnap.val();
          if (pageObject === null) {
            --count;
          } else {
            if (uuid) {
            // follow relationship
              firebaseDB.child('/relations/followers/' + pageKey).once('value', (followSnap) => {
                if (followSnap.val() && followSnap.val()[uuid]) {
                  pageObject.following = followSnap.val()[uuid].rel_id;
                } else {
                  pageObject.following = '0';
                }
                discover_pages.push(pageObject);
                if (discover_pages.length === count) {
                  resolve(discover_pages);
                }
              });
            } else {
              pageObject.following = '0';
              discover_pages.push(pageObject);
              if (discover_pages.length === count) {
                resolve(discover_pages);
              }
            }
          }
        });
      });
    });
  });
}
