import firebaseDB from '../firebase_request_handler';
import { opportunitiesPageCount } from '../recordFetchCount';

/* eslint-disable */
export function getOpportunitiesSideBarLocations() {
/* eslint-enable */
  return new Promise((resolve, reject) => {
    firebaseDB.child('resources/').orderByChild('type').equalTo('opportunities').once('value')
    .then((opportunitiesSnap) => {
      const opportunitiesObject = opportunitiesSnap.val();
      const objectsArray = [];
      /* eslint-disable */
      for (const key in opportunitiesObject) {
      /* eslint-enable */
        if ({}.hasOwnProperty.call(opportunitiesObject, key)) {
          objectsArray.push(opportunitiesObject[key]);
        }
      }

      objectsArray.sort((a, b) => parseInt(b.updated_time, 10) - parseInt(a.updated_time, 10));
      const opportunitiesWithLocations = [];
      objectsArray.forEach(object => {
        if (object.locations && object.locations.length > 0) {
          opportunitiesWithLocations.push(object);
        }
      });

      return Promise.all(opportunitiesWithLocations);
    }, err => Promise.reject(err))
    .then((values) => {
      const refObject = {};
      let locationsCount = opportunitiesPageCount.sideBarLocationsCount;
      const penUltimateLocationsArray = [];
      const ultimateLocationsArray = [];
      values.forEach((opportunity) => {
        const arr = opportunity.locations;
        arr.forEach(location => {
          if (location.city) {
            penUltimateLocationsArray.push(location);
          }
        });
      });
      penUltimateLocationsArray.forEach((locat) => {
        const native = locat.city;
        if (!refObject[native] && locationsCount > 0) {
          ultimateLocationsArray.push(locat.city);
          refObject.native = native;
          locationsCount--;
        }
      });
      resolve(ultimateLocationsArray);
    }, err => reject(err));
  });
}
