import firebaseDB from '../../firebase_request_handler'
import { landingPageCount } from '../../recordFetchCount';
/*
	count - number of records to be shown,
	if any record is not avialable (null check for the object)  the count is adjusted for resolve condition
*/
export function getLandingSidebarProfiles() {
  return new Promise((resolve, reject) => {
    const landingProfiles = [];
    let count = landingPageCount.profilesCount;
    firebaseDB.child('views/discover_page/sb_profiles').orderByChild('weight').limitToLast(4).once('value', function(landingSnap) {
      const landingData = landingSnap.val();
      if (!landingData) {
        resolve([]);
      } else {
        const dbRecordsCount = Object.keys(landingData).length;
        if (count > dbRecordsCount) {
          count = dbRecordsCount;
        }
      }
      landingSnap.forEach((profileData) => {
        let profileOject = {};
        const profilekey = profileData.key;
        firebaseDB.child(`/resources/${profilekey}`).once('value', (profileSnap) => {
          profileOject = profileSnap.val();
          if (profileOject === null) {
            --count;
            if (landingProfiles.length === count) {
              resolve(landingProfiles);
            }
          } else {
            firebaseDB.child(`/relations/current_campus/${profilekey}`).orderByKey().once('value', (campusSnap) => {
              const campusData = campusSnap.val();
              if (campusData && campusData[0].type === 'string') {
                profileOject.current_campus = {
                  data: campusData,
                };
              } else {
                profileOject.current_campus = {
                  data: [],
                };
              }
							profileOject.connected = 'no';
              landingProfiles.push(profileOject);
              if (landingProfiles.length === count) {
                resolve(landingProfiles);
              }
            });
          }
        });
      });
    });
  });
}
