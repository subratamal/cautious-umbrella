import firebaseDB from '../../firebase_request_handler'
import {
	homePageCount
} from '../../recordFetchCount'
import {
	checkLoggedIn
} from '../../../actions/checkLoggedIn'

export function getHomeSidebarSliderEvents() {
  return new Promise((resolve, reject) => {
    const homeFeedSidebarSlider = [];
    const recordPromises = [];
    const uuid = checkLoggedIn(false);
    const count = homePageCount.sidebarSliderCount;
    firebaseDB.child('resources').orderByChild('featured').equalTo('yes').once('value')
.then((homeFeedSnap) => {
  homeFeedSnap.forEach((sidebarSliderData) => {
    const sidebarSliderObject = sidebarSliderData.val();
    const sidebarSliderkey = sidebarSliderData.key;
    if (sidebarSliderObject != null && sidebarSliderObject.type === 'event') {
      const authorPromise = firebaseDB.child(`/relations/author/${sidebarSliderkey}`).once('value').then((authorSnap) => {
        const authorObjectPromises = [];
        authorSnap.forEach((authorData) => {
          const authorObject = {
            data: [],
          };
          const authorDetailsPromise = firebaseDB.child(`/resources/${authorData.key}`).once('value').then((authorDetailsSnap) => {
            authorObject.data[0] = authorDetailsSnap.val();
            const campusPromise = firebaseDB.child('/relations/current_campus/' + authorDetailsSnap.key).orderByKey().once('value').then(function(campusSnap) {
              authorObject.data[0].current_campus = {
                data: [],
              };
              if (campusSnap.val()) {
                authorObject.data[0].current_campus.data = campusSnap.val();
              }
              return authorObject;
            }).catch((err) => {
						  reject(err);
						});
            return Promise.resolve(authorObject);
          }).catch((err) => {
					  reject(err);
					}).then((values) => Promise.resolve(values));
          authorObjectPromises.push(authorDetailsPromise);
        });
        return Promise.all(authorObjectPromises);
      }).then((authorValues) => {
        sidebarSliderObject.author = authorValues[0];
        return sidebarSliderObject;
      });
      recordPromises.push(authorPromise);
    }
  });
  if (!recordPromises.length) {
    resolve([]);
  }
  return Promise.all(recordPromises);
	  // When all promises are resolved.
})
.catch((err) => {
  reject(err);
})
.then((sliderObjectArray) => {
  for (let i = sliderObjectArray.length - 1; i >= 0; i--) {
    const interactivityPromise = firebaseDB.child('/relations/saves/' + sliderObjectArray[i].id).orderByKey().equalTo(uuid).once('value').then(function(savesSnap) {
      if (savesSnap.val()) {
			 sliderObjectArray[i].saved = savesSnap.val()[uuid].rel_id;
      } else {
       sliderObjectArray[i].saved = "0";
      }
      const recommendPromise = firebaseDB.child('/relations/recommends/' + sliderObjectArray[i].id).orderByKey().equalTo(uuid).once('value').then(function(recommendsSnap) {
        if (recommendsSnap.val()) {
          sliderObjectArray[i].recommended = recommendsSnap.val()[uuid].rel_id;
        } else {
          sliderObjectArray[i].recommended = "0";
        }
        return sliderObjectArray[i];
      }).catch((err) => {
			  reject(err);
			});
      return Promise.resolve(recommendPromise);
    }).catch((err) => {
		  reject(err);
		})
.then((value) => Promise.resolve(value));
    homeFeedSidebarSlider.push(interactivityPromise);
  }
  return Promise.all(homeFeedSidebarSlider);
})
.then((sliderEventsArray) => {
  if (sliderEventsArray.length <= count) {
    resolve(sliderEventsArray);
  } else {
    resolve(sliderEventsArray.slice(0, count - 1));
  }
});
  });
}
