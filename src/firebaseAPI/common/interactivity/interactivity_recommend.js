import firebaseDB from '../../firebase_request_handler'
/*
	Funcitonality to handle Recommend and remove recomment with repect to firebase
*/
export function updateFireBaseInteractivityRecommend(data,storyId,recommend_count,action) {

	if(action === 'RECOMMEND'){
		firebaseDB.child('relations/recommends/'+ storyId).once('value', function(savesSnap) {
			//conosle.log(savesSnap.val())
			firebaseDB.child('relations/recommends/'+storyId).child(data.id).update(
				data ,function(error){
					if(error){
						// handle error
					}
					else{
						let newCount = ++recommend_count
						firebaseDB.child('resources/'+storyId ).update({"recommend_count" : newCount})
					}
				})
		
		})
	}
	/*if saveId is not passed it is delete save action, data contains uuid of current user */
	else {
		firebaseDB.child('relations/recommends/'+storyId).child(data).remove(function(err){
			if(err){
				//handle error
			}
			else{
				let newCount = --recommend_count
				firebaseDB.child('resources/'+storyId ).update({"recommend_count" : newCount})
			}
		})
	}
	

}
