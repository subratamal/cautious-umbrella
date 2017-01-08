import firebaseDB from '../../firebase_request_handler'
import {
	checkLoggedIn
} from '../../../actions/checkLoggedIn'
import {
	landingPageCount
} from '../../recordFetchCount'
/*
	count - number of records to be shown,
	if any record is not avialable (null check for the object)  the count is adjusted for resolve condition
*/
export function getLandingSidebarPages() {
	return new Promise((resolve, reject) => {
		let landing_pages = []
		let uuid = checkLoggedIn(false);
		let count = landingPageCount.pagesCount;
		firebaseDB.child('views/discover_page/sb_pages').orderByChild('weight').limitToLast(4).once('value', function(landingSnap) {
			let landingData = landingSnap.val();
			if (!landingData) {
				resolve([]);
			} else {
				let dbRecordsCount = Object.keys(landingData).length
				if (count > dbRecordsCount) {
					count = dbRecordsCount
				}
			}

			landingSnap.forEach(function(pageData) {
				let pageObject = {}
				let pageKey = pageData.key;
				firebaseDB.child('/resources/' + pageKey).once('value', function(pageSnap) {
	        pageObject = pageSnap.val();
	        if (pageObject === null) {
	          --count
	        } else {
	          if (uuid) {
	            //follow relationship
	            firebaseDB.child('/relations/followers/' + pageKey).orderByKey().equalTo(uuid).once('value', function(followSnap) {
	              if (followSnap.val()) {
	                pageObject.following = followSnap.val()[uuid].rel_id
	              } else {
	                pageObject.following = "0"
	              }
	              landing_pages.push(pageObject);
	              if (landing_pages.length === count) {
	                resolve(landing_pages);
	              }
	            });
	          } else {
	            pageObject.following = "0"
	            landing_pages.push(pageObject);
	            if (landing_pages.length === count) {
	              resolve(landing_pages)
	            }
	          }

	        }

				});

			})
		})
	})

}
