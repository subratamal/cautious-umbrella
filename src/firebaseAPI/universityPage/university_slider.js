import firebaseDB from '../firebase_request_handler'
import {
	checkLoggedIn
} from '../../actions/checkLoggedIn'
import {
	universityPageCount
} from '../recordFetchCount'
/*
	count - number of records to be shown,
	if any record is not avialable (null check for the object)  the count is adjusted for resolve condition
*/

export function getUniversityPrimarySliderPages(data) {
	return new Promise((resolve, reject) => {
		let slider_array = []
		let university_slider_pages = {
			data: []
		}
		let count = universityPageCount.sliderCount
		let uuid = checkLoggedIn(false);

		firebaseDB.child('views/university_finder_page/primary_slider').orderByChild('weight').limitToLast(4).once('value', function(universitySnap) {
			let universityData = universitySnap.val();
			if (!universityData) {
				resolve([]);
			} else {
				let dbRecordsCount = Object.keys(universityData).length
				if (count > dbRecordsCount) {
					count = dbRecordsCount
				}
			}
			universitySnap.forEach(function(sliderData) {
				let sliderObject = {}
				let sliderKey = sliderData.key;
				firebaseDB.child('/resources/' + sliderKey).once('value', function(sliderSnap) {
					sliderObject = sliderSnap.val();
					if (sliderObject === null) {
						--count
					} else {
						if (uuid) {
							//follow relationship
							firebaseDB.child('/relations/followers/' + sliderKey).orderByKey().equalTo(uuid).once('value', function(followSnap) {
								if (followSnap.val()) {
									sliderObject.following = followSnap.val()[uuid].rel_id
								} else {
									sliderObject.following = "0"
								}
								university_slider_pages.data.push(sliderObject);
								if (university_slider_pages.data.length === count) {
									university_slider_pages.cardType = 'page';
									university_slider_pages.sliderDataIndex = 0;

									slider_array.push(university_slider_pages);
									resolve(slider_array);
								}
							});
						} else {
							sliderObject.following = "0"
							university_slider_pages.data.push(sliderObject);
							if (university_slider_pages.data.length === count) {
								university_slider_pages.cardType = 'page';
								university_slider_pages.sliderDataIndex = 0;

								slider_array.push(university_slider_pages);
								resolve(slider_array);
							}
						}
					}


				});

			})
		})
	})
}
