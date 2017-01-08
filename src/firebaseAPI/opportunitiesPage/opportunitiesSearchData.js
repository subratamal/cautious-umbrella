import firebaseDB from '../firebase_request_handler';
import { checkLoggedIn } from '../../actions/checkLoggedIn';

export function getOpportunitiesSearchData(opportunitiesArray) {
  return new Promise((resolve, reject) => {
    const uuid = checkLoggedIn(false);
    const finalPromiseArray = [];
    opportunitiesArray.forEach((opportunityObj) => {
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
            });

            return Promise.resolve(appliedPromise);
          }, err => Promise.reject(err));
          return Promise.resolve(savePromise);
        }, err => Promise.reject(err));
        return Promise.resolve(opportunityAuthorDataPromise);
      }, err => Promise.reject(err));
      finalPromiseArray.push(opportunityAuthorPromise);
    });
    resolve(Promise.all(finalPromiseArray));
  });
}
