import firebaseDB from '../../firebase_request_handler'

export function updateFireBaseApply(data,entityId,action) {
  	if(action === 'APPLY')
    {
      firebaseDB.child('relations/applicants/'+ entityId).once('value', function(applicantSnap) {
        firebaseDB.child('relations/applicants/'+ entityId).child(data.id).update(
          data
        )
      })
    }
    else
    {
      firebaseDB.child('relations/applicants/'+entityId).child(data).remove(function(err){

  		})
    }

}
