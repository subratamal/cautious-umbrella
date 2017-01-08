import firebaseDB from '../firebase_request_handler';
import { checkLoggedIn } from '../../actions/checkLoggedIn';
import { opportunitiesPageCount } from '../recordFetchCount';

/* eslint-disable */
export function getOpportunitiesPrimarySliderPages() {
/* eslint-enable */
  return new Promise((resolve, reject) => {
    firebaseDB.child('resources/').orderByChild('type').equalTo('opportunities').once('value')
    .then((opportunitiesSnap) => {
      const opportunitiesObject = opportunitiesSnap.val();
      const objectsArray = [];
      const finalPromiseArray = [];
      const uuid = checkLoggedIn(false);

      /* eslint-disable */
      for (const key in opportunitiesObject) {
      /* eslint-enable */
        if ({}.hasOwnProperty.call(opportunitiesObject, key)) {
          objectsArray.push(opportunitiesObject[key]);
        }
      }

      objectsArray.sort((a, b) => parseInt(b.updated_time, 10) - parseInt(a.updated_time, 10));
      let count = opportunitiesPageCount.sliderCount;
      if (objectsArray.length < count) {
        count = objectsArray.length;
      }

      const sliderOpportunitiesArray = objectsArray.slice(0, count);

      sliderOpportunitiesArray.forEach((opportunity) => {
        const opportunityId = opportunity.id;
        const opportunityAuthorPromise = firebaseDB.child(`relations/on_behalf_of/${opportunity.id}`).once('value').then((authorSnap) => {
          const author = authorSnap.val();
          const authorId = Object.keys(author)[0];
          const opportunityAuthorDataPromise = firebaseDB.child(`resources/${authorId}`).once('value').then((authorDetailsSnap) => {
            const authorData = authorDetailsSnap.val();
            /* eslint-disable */
            opportunity.author = authorData;
            /* eslint-enable */
            const savePromise = firebaseDB.child(`relations/saves/${opportunityId}`).once('value').then((saveSnap) => {
              if (uuid && saveSnap.val() && saveSnap.val()[uuid]) {
                /* eslint-disable */
                opportunity.saved = saveSnap.val()[uuid].rel_id;
              } else {
                opportunity.saved = '0';
                /* eslint-enable */
              }
              const recommendPromise = firebaseDB.child(`relations/recommend/${opportunityId}`).once('value').then((recommendSnap) => {
                if (uuid && recommendSnap.val() && recommendSnap.val()[uuid]) {
                  /* eslint-disable */
                  opportunity.recommended = recommendSnap.val()[uuid].rel_id;
                }
                else {
                  opportunity.recommended = '0';
                  /* eslint-enable */
                }
                return opportunity;
              }, err => Promise.reject(err));
              return Promise.resolve(recommendPromise);
            }, err => Promise.reject(err));
            return Promise.resolve(savePromise);
          }, err => Promise.reject(err));
          return opportunityAuthorDataPromise;
        }, err => Promise.reject(err));
        finalPromiseArray.push(opportunityAuthorPromise);
      });
      return Promise.all(finalPromiseArray);
    })
    .then((values) => {
      const tempObj = {};
      tempObj.data = values;
      tempObj.sliderDataIndex = 0;
      tempObj.cardType = 'opportunity';
      const tempArr = [tempObj];
      resolve(tempArr);
    }, err => reject(err));
  });
}
