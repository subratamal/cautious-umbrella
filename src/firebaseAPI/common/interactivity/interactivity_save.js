import firebaseDB from '../../firebase_request_handler'
/*
	Funcitonality to handle Save and remove Save with repect to firebase
*/
export function updateFireBaseInteractivitySave(data,storyId,action) {
	if(action === 'SAVE'){
		firebaseDB.child('relations/saves/'+ storyId).once('value', function(savesSnap) {
			firebaseDB.child('relations/saves/'+storyId).child(data.id).update(
				data  
			)
		
	})
	}
	/*if saveId is not passed it is delete save action, data contains uuid of current user */
	else {
		firebaseDB.child('relations/saves/'+storyId).child(data).remove(function(err){
			
		})
	}
	

}
