import firebaseDB from '../firebase_request_handler'
import {
	checkLoggedIn
} from '../../actions/checkLoggedIn'
import {
	eventsPageCount
} from '../recordFetchCount'

export function getEventsPrimarySliderEvents(data) {
	return new Promise((resolve, reject) => {
		let slider_promises_array = []
		let event_slider_pages = {
			data: []
		}
		// let count = eventsPageCount.sliderCount
		// let uuid = checkLoggedIn(false);

	firebaseDB.child('views/events_page/primary_slider').orderByChild('weight').limitToLast(3).once('value').then(function(eventListSnap) {

			eventListSnap.forEach(function(sliderEvent){
				var sliderKey=sliderEvent.key
				var sliderObjectDataPromise=firebaseDB.child('/resources/' + sliderKey).once('value').then(function(sliderSnap) {
					var sliderObject=sliderSnap.val()

						var authorRelationPromise=firebaseDB.child('/relations/author/' + sliderKey).once('value').then(function(authorSnap){
							var authorObject_promises=[]
							authorSnap.forEach(function(authorData) {

								var authorResourcePromise = firebaseDB.child('/resources/' + authorData.key).once('value').then(function(authorDetailsSnap) {
									sliderObject.author = {
										data: []
									}
									sliderObject.author.data[0] = authorDetailsSnap.val();

									var campusPromise= firebaseDB.child('/relations/current_campus/' + authorData.key).orderByKey().once('value').then(function(campusSnap) {
										let campusData = campusSnap.val();
										if (campusData && campusData[0].type === 'page') {
											sliderObject.author.data[0].current_campus = {
												data: campusData
											}
										} else {
											sliderObject.author.data[0].current_campus = {
												data: []
											}
										}

										return sliderObject

									})
									return Promise.resolve(campusPromise)
								})

							authorObject_promises.push(authorResourcePromise)
						})

					return Promise.all(authorObject_promises)
				})
					return Promise.resolve(authorRelationPromise)
				})
				slider_promises_array.push(sliderObjectDataPromise)

			})

			return Promise.all(slider_promises_array)
		}).then(function(values){


			values.forEach(function(sliderPage){
				sliderPage.forEach(function(data){
				event_slider_pages.data.push(data)
				})
			})
			event_slider_pages.cardType="events"
			event_slider_pages.sliderDataIndex=0
			var eventObject=[event_slider_pages]

			resolve(eventObject)
		})
})

}
