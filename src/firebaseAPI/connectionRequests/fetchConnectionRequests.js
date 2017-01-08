import firebaseDB from '../firebase_request_handler';
import { checkLoggedIn } from '../../actions/checkLoggedIn';
import getProfilesWithCampus from '../firebaseHelpers/profileFetchHelpers/getProfilesWithCampus';

/* TODO Convert callback structure to promise structure */

export function fetchConnectionRequests(callback) {
  return new Promise((resolve, reject) => {
    const uuid = checkLoggedIn(false);
    if (uuid) {
      firebaseDB.child(`/relations/connections_requests/${uuid}`).on('value', (connectioRequestsSnap) => {
        const profilePromisesArray = [];
        let requestMetadata = {};
        connectioRequestsSnap.forEach((connectoinRequestRecord) => {
          const profileKey = connectoinRequestRecord.key;
          if (profileKey !== 'metadata') {
            const connectionRelation = connectoinRequestRecord.val();
            profilePromisesArray.push(getProfilesWithCampus(profileKey, connectionRelation.rel_id));
          } else if (profileKey === 'metadata'){
            requestMetadata = connectoinRequestRecord.val();
          }
        });
        Promise.all(profilePromisesArray).then((profileRecords) => {
          profileRecords.map((profileRecord) => {
            profileRecord.connectionStatus = 'request_received';
          })
          const connectionRequestData = {
            metadata: requestMetadata,
            records: profileRecords,
          }
          callback(connectionRequestData);
          resolve(connectionRequestData);
        });
      }, (err) => {
        reject(err);
      });
    }
  });
}
