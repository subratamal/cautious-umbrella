import firebaseDB from '../firebase_request_handler';
import {
checkLoggedIn,
} from '../../actions/checkLoggedIn';
import { universityPageCount } from '../recordFetchCount';
/*
count - number of records to be shown,
if any record is not avialable (null check for the object)  the count is adjusted for resolve condition
*/
export function getUniversityPrimaryContentPages(data) {
  return new Promise((resolve, reject) => {
    const university_pages = [];
    const uuid = checkLoggedIn(false);

    let count = universityPageCount.pagesCount;
    firebaseDB.child('views/university_finder_page/body_pages').orderByChild('weight').limitToLast(6).once('value', (universitySnap) => {
      const universityData = universitySnap.val();
      if (!universityData) {
        resolve([]);
      } else {
        const dbRecordsCount = Object.keys(universityData).length;
        if (count > dbRecordsCount) {
          count = dbRecordsCount;
        }
      }
      universitySnap.forEach((pageData) => {
        let pageObject = {};
        const pageKey = pageData.key;
        firebaseDB.child('/resources/' + pageKey).once('value', (pageSnap) => {
          pageObject = pageSnap.val();
          if (pageObject === null) {
            --count;
          } else {
            if (uuid) {
// follow relationship
              firebaseDB.child('/relations/followers/' + pageKey).orderByKey().equalTo(uuid).once('value', (followSnap) => {
                if (followSnap.val()) {
                  pageObject.following = followSnap.val()[uuid].rel_id;
                } else {
                  pageObject.following = '0';
                }
                university_pages.push(pageObject);
                if (university_pages.length === count) {
                  resolve(university_pages);
                }
              });
            } else {
              pageObject.following = '0';
              university_pages.push(pageObject);
              if (university_pages.length === count) {
                resolve(university_pages);
              }
            }
          }
        });
      });
    });
  });
}
