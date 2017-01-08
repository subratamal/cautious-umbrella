import firebaseDB from '../../firebase_request_handler';
import { eventsPageCount } from '../../recordFetchCount';
import { checkLoggedIn } from '../../../actions/checkLoggedIn';

export function getEventSidebarPages() {
  return new Promise((resolve, reject) => {
    const uuid = checkLoggedIn(false);
    const eventPagesPromises = [];
    const count = eventsPageCount.pagesCount;
    firebaseDB.child('views/events_page/sb_pages').orderByChild('weight').limitToLast(count).once('value')
    .then((eventSnap) => {
      eventSnap.forEach((pageData) => {
        let pageObject = {};
        const pagekey = pageData.key;
        const pageResource = firebaseDB.child(`/resources/${pagekey}`).once('value').then((pageSnap) => {
          pageObject = pageSnap.val();
          const followPromise = firebaseDB.child(`relations/followers/${pageObject.key}`).once('value').then((followSnap) => {
            if (followSnap.val() && typeof (followSnap.val()[uuid]) !== 'undefined') {
              pageObject.following = followSnap.val()[uuid].rel_id;
            } else {
              pageObject.following = '0';
            }
            return pageObject;
          });
          return Promise.resolve(followPromise);
        });
        eventPagesPromises.push(pageResource);
      });
      return Promise.all(eventPagesPromises);
    })
    .then((values) => {
      resolve(values);
    });
  });
}
