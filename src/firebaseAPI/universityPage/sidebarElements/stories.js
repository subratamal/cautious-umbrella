import firebaseDB from '../../firebase_request_handler'
import {universityPageCount} from '../../recordFetchCount'
/*
	count - number of records to be shown,
	if any record is not avialable (null check for the object)  the count is adjusted for resolve condition
*/
export function getUniversitySidebarStories() {
	return new Promise((resolve, reject) => {
		let university_stories = []
		let count = universityPageCount.storiesCount
		firebaseDB.child('views/university_finder_page/sb_stories').orderByChild('weight').limitToLast(4).once('value', function(universitySnap) {
			let universityData = universitySnap.val();
			if (!universityData) {
				resolve([]);
			} else {
				let dbRecordsCount = Object.keys(universityData).length
				if (count > dbRecordsCount) {
					count = dbRecordsCount
				}
			}
			universitySnap.forEach(function(storyData) {
				let storyObject = {}
				let storyKey = storyData.key;
				firebaseDB.child('/resources/' + storyKey).once('value', function(storySnap) {
					storyObject = storySnap.val();
					if (storyObject === null) {
						--count

					} else {
						university_stories.push(storyObject);
					}
					if (university_stories.length === count) {
						resolve(university_stories);
					}

				});

			})
		})
	})

}

