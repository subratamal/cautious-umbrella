import firebaseDB from '../firebase_request_handler'
import {checkLoggedIn} from '../../actions/checkLoggedIn'
import {landingPageCount} from '../recordFetchCount'
/*
	count - number of records to be shown,
	if any record is not avialable (null check for the object)  the count is adjusted for resolve condition
*/
export function getLandingEvents() {
	return new Promise((resolve, reject) => {
		let landing_events = []
		let uuid = checkLoggedIn(false);
		let count = landingPageCount.eventsCount;
		firebaseDB.child('views/discover_page/body_events').orderByChild('weight').limitToLast(3).once('value', function(landingSnap) {
			let landingData = landingSnap.val();
			if (!landingData) {
				resolve([]);
			} else {
				let dbRecordsCount = Object.keys(landingData).length
				if (count > dbRecordsCount) {
					count = dbRecordsCount
				}
			}
			landingSnap.forEach(function(eventData) {
				let eventsObject = {}
				let eventKey = eventData.key;
				firebaseDB.child('/resources/' + eventKey).once('value', function(eventSnap) {
					eventsObject = eventSnap.val();
					// get author of the event
					if (eventsObject === null) {
						--count;
						if (landing_events.length === count) {
							resolve(landing_events)
						}
					} else {
						firebaseDB.child('/relations/author/' + eventKey).once('value', function(authorSnap) {
							authorSnap.forEach(function(authorData) {
								firebaseDB.child('/resources/' + authorData.key).once('value', function(authorDetailsSnap) {
									eventsObject.author = {
										data: []
									}
									eventsObject.author.data[0] = authorDetailsSnap.val();
									firebaseDB.child('/relations/current_campus/' + authorData.key).orderByKey().once('value', function(campusSnap) {
										let campusData = campusSnap.val();
										if (campusData && campusData[0].type === 'string') {
											eventsObject.author.data[0].current_campus = {
												data: campusData
											}

										} else {
											eventsObject.author.data[0].current_campus = {
												data: []
											}
										}
										if (uuid) { //saves relationship
											firebaseDB.child('/relations/saves/' + eventKey).orderByKey().equalTo(uuid).once('value', function(savesSnap) {
												if (savesSnap.val()) {
													eventsObject.saved = savesSnap.val()[uuid].rel_id
												} else {
													eventsObject.saved = "0"
												}
												// reccomends
												firebaseDB.child('/relations/recommends/' + eventKey).orderByKey().equalTo(uuid).once('value', function(recommendsSnap) {
													if (recommendsSnap.val()) {
														eventsObject.recommended = recommendsSnap.val()[uuid].rel_id
													} else {
														eventsObject.recommended = "0"

													}
													landing_events.push(eventsObject);

													if (landing_events.length === count) {
														resolve(landing_events)
													}



												});
											});
										} else {
											eventsObject.saved = "0"
											eventsObject.recommended = "0"
											landing_events.push(eventsObject);

											if (landing_events.length === count) {
												resolve(landing_events)
											}
										}

									})


								});
							})
						});
					}


				});

			})
		})
	})

}
