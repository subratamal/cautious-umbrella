import { each } from 'underscore';
import firebaseDB from '../firebase_request_handler';
import { opportunitiesPageCount } from '../recordFetchCount';

/* eslint-disable */
export function getOpportunitiesSideBarWorkAreas() {
/* eslint-enable */
  return new Promise((resolve, reject) => {
    firebaseDB.child('resources/').orderByChild('type').equalTo('opportunities').once('value')
    .then((opportunitiesSnap) => {
      const opportunitiesObject = opportunitiesSnap.val();
      const objectsArray = [];
      const objectsPromiseArray = [];
      const workAreasArray = [];
      /* eslint-disable */
      for (const key in opportunitiesObject) {
      /* eslint-enable */
        if ({}.hasOwnProperty.call(opportunitiesObject, key)) {
          objectsArray.push(opportunitiesObject[key]);
        }
      }

      objectsArray.sort((a, b) =>
        parseInt(b.updated_time, 10) - parseInt(a.updated_time, 10)
      );

      objectsArray.forEach((opportunity) => {
        const workAreaPromise = firebaseDB.child(`relations/work_areas/${opportunity.id}`).once('value').then((opportunitySnap) => {
          const workAreasMasterObject = opportunitySnap.val();
          each(workAreasMasterObject, (workArea) => {
            const workAreaDataPromise = firebaseDB.child(`resources/${workArea.id}`).once('value').then((workAreaSnap) => {
              const workAreaData = workAreaSnap.val();
              return workAreaData;
            }, err => Promise.reject(err));
            workAreasArray.push(workAreaDataPromise);
          });
          return Promise.all(workAreasArray);
        }, err => Promise.reject(err));
        objectsPromiseArray.push(workAreaPromise);
      });

      return Promise.all(objectsPromiseArray);
    }, err => Promise.reject(err))
    .then((values) => {
      const refObject = {};
      let locationsCount = opportunitiesPageCount.sideBarWorkAreasCount;
      let penUltimateAreasArray = [];
      const ultimateAreasArray = [];
      values.forEach((area) => {
        const arr = area;
        penUltimateAreasArray = penUltimateAreasArray.concat(arr);
      });
      penUltimateAreasArray.forEach((locat) => {
        const native = locat;
        if (!refObject[native.name] && locationsCount > 0) {
          ultimateAreasArray.push(locat);
          refObject[native.name] = native;
          locationsCount--;
        }
      });
      resolve(ultimateAreasArray);
    }, err => reject(err));
  });
}
