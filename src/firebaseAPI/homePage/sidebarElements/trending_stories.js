import firebaseDB from '../../firebase_request_handler'
import {homePageCount} from '../../recordFetchCount'

export function getHomePageTrendingStories() {
  return new Promise((resolve, reject) => {
    const count = homePageCount.trendingCount;
    // limitToLast 30 is a guess number.
    // As the results have both stories and events,
    // and as we need both in trending, this limit has to be such that,
    // it has atleast 2 stories and 2 events.
    firebaseDB.child('views/trending/').orderByChild('weight').limitToLast(30).once('value').then(function(trendingSnap) {
      const trendingStories = []
      trendingSnap.forEach((trendingData) => {
        const trendingkey = trendingData.key;
        const trendingWeight = trendingData.val().weight;
        // Create promise for each element in forEach.
        const promise = firebaseDB.child(`/resources/${trendingkey}`).once('value').then((trendingRecordSnap) => {
          const trendingObject = trendingRecordSnap.val();
          if (trendingObject != null && (trendingObject.type === 'story' || trendingObject.type === 'event')) {
            trendingObject.weight = trendingWeight;
            return trendingObject;
          }
        });
            // Store the promise in array.
        trendingStories.push(promise);
      });
        // When all promises are resolved.
      return Promise.all(trendingStories);
    })
.then((values) => {
  let trendingStories = [];
        // Count to keeo tab of number of trending stories found.
  let storycount = 0;
    // Count to keeo tab of number of trending events found.
  let eventcount = 0;
    // Loop from the end of the array.
  for (let i = values.length; i > 0; --i) {
    if (values[i] !== undefined) {
      // Make sure half ot total are stories.
      if (values[i].type === 'story' && storycount < count / 2) {
        trendingStories.push(values[i]);
        storycount++;
      } else if (values[i].type === 'event' && eventcount < count / 2) {
        trendingStories.push(values[i]);
        eventcount++;
      }
    }
    // If total is equal to count, break as no further processing required.
    if (trendingStories.length === count) {
      break;
    }
  }
  // Resolve.
  resolve(trendingStories);
});
  });
}
