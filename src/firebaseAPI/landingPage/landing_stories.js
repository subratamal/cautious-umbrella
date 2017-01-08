import firebaseDB from '../firebase_request_handler'
import {checkLoggedIn} from '../../actions/checkLoggedIn'
import {landingPageCount} from '../recordFetchCount'
/*
	count - number of records to be shown,
	if any record is not avialable (null check for the object)  the count is adjusted for resolve condition
*/
export function getLandingStories() {

	return new Promise((resolve, reject) => {
		let landing_stories = []
		let uuid = checkLoggedIn(false);
		let count = landingPageCount.storiesCount
		firebaseDB.child('views/discover_page/body_stories').orderByChild('weight').limitToLast(3).once('value', function(landingSnap) {
			let landingData = landingSnap.val();
			if (!landingData) {
				resolve([]);
			} else {
				let dbRecordsCount = Object.keys(landingData).length
				if (count > dbRecordsCount) {
					count = dbRecordsCount
				}
			}
			landingSnap.forEach(function(storydata) {
				let storyObject = {}
				let storyKey = storydata.key;
				firebaseDB.child('/resources/' + storyKey).once('value', function(storySnap) {
					storyObject = storySnap.val();
					if (storyObject === null) {
						--count
						if (landing_stories.length === count) {
							resolve(landing_stories)
						}
					} else {
						firebaseDB.child('/relations/author/' + storyKey).once('value', function(authorSnap) {
							authorSnap.forEach(function(authorData) {
								firebaseDB.child('/resources/' + authorData.key).once('value', function(authorDetailsSnap) {
									storyObject.author = {
										data: []
									}
									storyObject.author.data[0] = authorDetailsSnap.val();

									firebaseDB.child('/relations/current_campus/' + authorData.key).orderByKey().once('value', function(campusSnap) {
										let campusData = campusSnap.val();
										if (campusData && campusData[0].type === 'string') {
											storyObject.author.data[0].current_campus = {
												data: campusData
											}
										} else {
											storyObject.author.data[0].current_campus = {
												data: []
											}
										}
										if (uuid) {
											//saves relationship
											firebaseDB.child('/relations/saves/' + storyKey).orderByKey().equalTo(uuid).once('value', function(savesSnap) {
												if (savesSnap.val()) {
													storyObject.saved = savesSnap.val()[uuid].rel_id
												} else {
													storyObject.saved = "0"
												}
												// reccomends
												firebaseDB.child('/relations/recommends/' + storyKey).orderByKey().equalTo(uuid).once('value', function(recommendsSnap) {
													if (recommendsSnap.val()) {
														storyObject.recommended = recommendsSnap.val()[uuid].rel_id
													} else {
														storyObject.recommended = "0"

													}
													landing_stories.push(storyObject);

													if (landing_stories.length === count) {
														resolve(landing_stories)
													}
												});
											});
										} else {
											storyObject.saved = "0"
											storyObject.recommended = "0"
											landing_stories.push(storyObject);
											if (landing_stories.length === count) {
												resolve(landing_stories)
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
