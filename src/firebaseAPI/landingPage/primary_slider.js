import firebaseDB from '../firebase_request_handler'
import {checkLoggedIn} from '../../actions/checkLoggedIn'
import {landingPageCount} from '../recordFetchCount'
/*
	count - number of records to be shown,
	if any record is not avialable (null check for the object)  the count is adjusted for resolve condition
*/
export function getLandingPrimarySliderData() {
	return new Promise((resolve, reject) => {
		let slider_stories = {
			data: []
		}
		let slider_events = {
			data: []
		}
		let uuid = checkLoggedIn(false);
		let count = landingPageCount.sliderCount
		firebaseDB.child('views/discover_page/primary_slider').orderByChild('weight').limitToLast(4).once('value', function(landingSnap) {
			let landingData = landingSnap.val();
			if (!landingData) {
				resolve([]);
			} else {
				let dbRecordsCount = Object.keys(landingData).length
				if (count > dbRecordsCount) {
					count = dbRecordsCount
				}
			}
			landingSnap.forEach(function(sliderData) {
				let sliderObject = {}
				let sliderKey = sliderData.key;
				firebaseDB.child('/resources/' + sliderKey).once('value', function(sliderSnap) {
					sliderObject = sliderSnap.val();
					if (sliderObject === null) {
						--count;
						if ((slider_stories.data.length + slider_events.data.length) === count) {
							slider_stories.cardType = 'stories'
							slider_events.cardType = 'events'
							slider_stories.sliderDataIndex = 0;
							slider_events.sliderDataIndex = 1;
							let result = [];
							result.push(slider_stories);
							result.push(slider_events)
							resolve(result)
						}
					}
					else{
						firebaseDB.child('/relations/author/' + sliderKey).once('value', function(authorSnap) {
						authorSnap.forEach(function(authorData) {
							firebaseDB.child('/resources/' + authorData.key).once('value', function(authorDetailsSnap) {
								sliderObject.author = {
									data: []
								}
								sliderObject.author.data[0] = authorDetailsSnap.val();
								firebaseDB.child('/relations/current_campus/' + authorData.key).orderByKey().once('value', function(campusSnap) {
									let campusData = campusSnap.val();
									if (campusData && campusData[0].type === 'string') {
										sliderObject.author.data[0].current_campus = {
											data: campusData
										}

									} else {
										sliderObject.author.data[0].current_campus = {
											data: []
										}
									}
									if (uuid) {
										firebaseDB.child('/relations/saves/' + sliderKey).orderByKey().equalTo(uuid).once('value', function(savesSnap) {
											if (savesSnap.val()) {

												sliderObject.saved = savesSnap.val()[uuid].rel_id
											} else {
												sliderObject.saved = "0"
											}
											// reccomends
											firebaseDB.child('/relations/recommends/' + sliderKey).orderByKey().equalTo(uuid).once('value', function(recommendsSnap) {
												if (recommendsSnap.val()) {
													sliderObject.recommended = recommendsSnap.val()[uuid].rel_id
												} else {
													sliderObject.recommended = "0"

												}
												if (sliderObject.type === 'story') {
													slider_stories.data.push(sliderObject);
												} else if (sliderObject.type === 'event') {
													slider_events.data.push(sliderObject);
												}


												if ((slider_stories.data.length + slider_events.data.length) === count) {

													slider_stories.cardType = 'stories'
													slider_events.cardType = 'events'
													slider_stories.sliderDataIndex = 0;
													slider_events.sliderDataIndex = 1;
													let result = [];
													result.push(slider_stories);
													result.push(slider_events)

													resolve(result)
												}



											});
										});
									} else {
										sliderObject.saved = "0"
										sliderObject.recommended = "0"
										if (sliderObject.type === 'story') {
											slider_stories.data.push(sliderObject);
										} else if (sliderObject.type === 'event') {
											slider_events.data.push(sliderObject);
										}
										if ((slider_stories.data.length + slider_events.data.length) === count) {

											slider_stories.cardType = 'stories'
											slider_events.cardType = 'events'
											slider_stories.sliderDataIndex = 0;
											slider_events.sliderDataIndex = 1;
											let result = [];
											result.push(slider_stories);
											result.push(slider_events)

											resolve(result)
										}
									}


								});
							})
						});

					});
					}


				})
			})
		})
	})
}
