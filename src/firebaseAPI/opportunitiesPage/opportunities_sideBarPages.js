import firebaseDB from '../firebase_request_handler';
import { opportunitiesPageCount } from '../recordFetchCount';
import { checkLoggedIn } from '../../actions/checkLoggedIn';

/* eslint-disable */
export function getOpportunitiesSideBarPages() {
/* eslint-enable */
  return new Promise((resolve, reject) => {
    firebaseDB.child('resources/').orderByChild('type').equalTo('opportunities').once('value')
    .then((opportunitiesSnap) => {
      const opportunitiesObject = opportunitiesSnap.val();
      const objectsArray = [];
      const uuid = checkLoggedIn(false);
      let opportunitiesArray = [];
      const finalPromiseArray = [];

      /* eslint-disable */
      for (const key in opportunitiesObject) {
      /* eslint-enable */
        if ({}.hasOwnProperty.call(opportunitiesObject, key)) {
          objectsArray.push(opportunitiesObject[key]);
        }
      }
      objectsArray.sort((a, b) => parseInt(b.updated_time, 10) - parseInt(a.updated_time, 10));
      opportunitiesArray = objectsArray;

      opportunitiesArray.forEach((opportunity) => {
        const opportunityAuthorPromise = firebaseDB.child(`relations/on_behalf_of/${opportunity.id}`).once('value').then((authorSnap) => {
          const author = authorSnap.val();
          const authorId = Object.keys(author)[0];
          const opportunityAuthorDataPromise = firebaseDB.child(`resources/${authorId}`).once('value').then((authorDetailsSnap) => {
            const authorData = authorDetailsSnap.val();
            const followPromise = firebaseDB.child(`relations/followers/${authorData.id}`).once('value').then((followSnap) => {
              const followData = followSnap.val();
              if (uuid && followData && followData[uuid]) {
                authorData.following = followData[uuid].rel_id;
              } else {
                authorData.following = '0';
              }
              return authorData;
            }, err => Promise.reject(err));
            return Promise.resolve(followPromise);
          }, err => Promise.reject(err));
          return opportunityAuthorDataPromise;
        }, err => Promise.reject(err));
        finalPromiseArray.push(opportunityAuthorPromise);
      });
      return Promise.all(finalPromiseArray);
    }, err => Promise.reject(err))
    .then((values) => {
      const refObject = {};
      let pageCount = opportunitiesPageCount.sideBarCompaniesCount;
      const ultimatePagesArray = [];
      for (let i = 0; i < values.length; i++) {
        if (pageCount === 0) {
          break;
        }
        if (typeof (refObject[values[i].id]) === 'undefined') {
          pageCount--;
          ultimatePagesArray.push(values[i]);
          refObject[values[i].id] = values[i];
        }
      }
      resolve(ultimatePagesArray);
    }, err => reject(err));
  });
}
