import firebaseDB from '../../firebase_request_handler'
import {universityPageCount} from '../../recordFetchCount'
/*
	count - number of records to be shown,
	if any record is not avialable (null check for the object)  the count is adjusted for resolve condition
*/
export function getUniversitySidebarEvents() {
	return new Promise((resolve, reject) => {
		let university_events = []
		let count = universityPageCount.eventsCount
		firebaseDB.child('views/university_finder_page/sb_events').orderByChild('weight').limitToLast(4).once('value', function(universitySnap) {
			let universityData = universitySnap.val();
			if (!universityData) {
				resolve([]);
			} else {
				let dbRecordsCount = Object.keys(universityData).length
				if (count > dbRecordsCount) {
					count = dbRecordsCount
				}
			}

			universitySnap.forEach(function(eventData) {
				let eventObject = {}
				let eventKey = eventData.key;
				firebaseDB.child('/resources/' + eventKey).once('value', function(eventSnap) {
					eventObject = eventSnap.val();
					if (eventObject === null) {
						--count
					} else {
						university_events.push(eventObject);

					}
					if (university_events.length === count) {
						resolve(university_events);
					}

				});

			})
		})
	})

}