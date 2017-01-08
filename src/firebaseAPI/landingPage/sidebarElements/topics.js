import firebaseDB from '../../firebase_request_handler'
import {landingPageCount} from '../../recordFetchCount'
/*
	count - number of records to be shown,
	if any record is not avialable (null check for the object)  the count is adjusted for resolve condition
*/
export function getLandingSidebarTopics() {
    return new Promise((resolve, reject) => {
    	let landing_topics = []
    	let count = landingPageCount.topicsCount;
	firebaseDB.child('views/discover_page/sb_topics').orderByChild('weight').limitToLast(5).once('value', function(landingSnap) {
		let landingData = landingSnap.val();
		if (!landingData) {
			resolve([]);
		} else {
			let dbRecordsCount = Object.keys(landingData).length
			if (count > dbRecordsCount) {
				count = dbRecordsCount
			}
		}
		landingSnap.forEach(function(topicsData) {
			let topicsObject = {}
			let topicskey = topicsData.key;
			firebaseDB.child('/resources/' + topicskey).once('value', function(topicsSnap) {
				topicsObject = topicsSnap.val();
				if(topicsObject === null){
					count--;
				}
				else{
					landing_topics.push(topicsObject);
				}

				if(landing_topics.length === count){
					resolve(landing_topics);
				}
			});

		})
	})
})

}
