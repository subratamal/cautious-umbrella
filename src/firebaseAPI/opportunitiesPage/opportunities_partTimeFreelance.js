import firebaseDB from '../firebase_request_handler';
import { opportunitiesPageCount } from '../recordFetchCount';
import { checkLoggedIn } from '../../actions/checkLoggedIn';

/* eslint-disable */
export function getOpportunitiesPartTimeFreelance() {
/* eslint-enable */
  return new Promise((resolve, reject) => {
    firebaseDB.child('resources/').orderByChild('subtype').equalTo('Part time/Freelance').once('value')
    .then((opportunitiesSnap) => {
      const opportunitiesObject = opportunitiesSnap.val();
      const objectsArray = [];
      const uuid = checkLoggedIn(false);
      let partTimeFreelanceArray = [];
      const finalPromiseArray = [];
      /* eslint-disable */
      for (const key in opportunitiesObject) {
      /* eslint-enable */
        if ({}.hasOwnProperty.call(opportunitiesObject, key) && opportunitiesObject[key].subtype === 'Part time/Freelance') {
          objectsArray.push(opportunitiesObject[key]);
        }
      }

      objectsArray.sort((a, b) => parseInt(b.updated_time, 10) - parseInt(a.updated_time, 10));
      let count = opportunitiesPageCount.partTimeFreelanceCount;
      if (objectsArray.length < opportunitiesPageCount.partTimeFreelanceCount) {
        count = objectsArray.length;
      }
      partTimeFreelanceArray = objectsArray.slice(0, count);

      partTimeFreelanceArray.forEach((opportunityObj) => {
        const opportunityId = opportunityObj.id;
        const opportunity = opportunityObj;
        const opportunityAuthorPromise = firebaseDB.child(`relations/on_behalf_of/${opportunityId}`).once('value').then((authorSnap) => {
          const author = authorSnap.val();
          const authorId = Object.keys(author)[0];
          const opportunityAuthorDataPromise = firebaseDB.child(`resources/${authorId}`).once('value').then((authorDetailsSnap) => {
            const authorData = authorDetailsSnap.val();
            opportunity.author = authorData;
            const savePromise = firebaseDB.child(`relations/saves/${opportunityId}`).once('value').then((saveSnap) => {
              if (saveSnap.val() && saveSnap.val()[uuid]) {
                opportunity.saved = saveSnap.val()[uuid].rel_id;
              } else {
                opportunity.saved = 0;
              }
              const appliedPromise = firebaseDB.child(`relations/applicants/${opportunityId}`).once('value').then((applicantSnap) => {
                if (uuid && applicantSnap.val() && applicantSnap.val()[uuid]) {
                  opportunity.applied = applicantSnap.val()[uuid].rel_id;
                } else {
                  opportunity.applied = 0;
                }
                return opportunity;
              }, err => Promise.reject(err));
              return Promise.resolve(appliedPromise);
            }, err => Promise.reject(err));
            return Promise.resolve(savePromise);
          }, err => Promise.reject(err));
          return Promise.resolve(opportunityAuthorDataPromise);
        }, err => Promise.reject(err));
        finalPromiseArray.push(opportunityAuthorPromise);
      }, err => Promise.reject(err));
      return Promise.all(finalPromiseArray);
    }, err => Promise.reject(err))
    .then((values) => {
      resolve(values);
    }, err => reject(err));
  });
}
