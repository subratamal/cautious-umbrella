import firebaseDB from '../../firebase_request_handler';


export default function getProfilesWithCampus(profileKey, connectRelationId) {
  return firebaseDB.child(`/resources/${profileKey}`).once('value').then((profileResourceSnap) => {
    const profileObject = profileResourceSnap.val();
    if (connectRelationId) {
      profileObject.connectionId = connectRelationId;
    }
    const campusPromise = firebaseDB.child(`/relations/current_campus/${profileKey}`).orderByKey().once('value').then((campusSnap) => {
      profileObject.current_campus = {
        data: [],
      };
      if (campusSnap.val()) {
        profileObject.current_campus.data = campusSnap.val();
      }
      return profileObject;
    });
    return Promise.resolve(campusPromise);
  }).then((profileValues) => profileValues);
}
