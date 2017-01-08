import firebaseDB from '../../firebase_request_handler';
import { checkLoggedIn } from '../../../actions/checkLoggedIn';
import { discoverPageCount } from '../../recordFetchCount';

/* TODO Convert callback structure to promise structure */

export function getDiscoverSidebarProfiles() {
  return new Promise((resolve, reject) => {
    const discoverProfiles = [];
    const uuid = checkLoggedIn(false);
    let count = discoverPageCount.profilesCount;
    firebaseDB.child('views/discover_page/sb_profiles').orderByChild('weight').limitToLast(4).once('value', (discoverSnap) => {
      const discoverData = discoverSnap.val();
      if (!discoverData) {
        resolve([]);
      } else {
        const dbRecordsCount = Object.keys(discoverData).length;
        if (count > dbRecordsCount) {
          count = dbRecordsCount;
        }
      }
      discoverSnap.forEach((profileData) => {
        let profileOject = {};
        const profilekey = profileData.key;
        firebaseDB.child(`/resources/${profilekey}`).once('value', (profileSnap) => {
          profileOject = profileSnap.val();
          if (profileOject === null) {
            --count;
            if (discoverProfiles.length === count) {
              resolve(discoverProfiles);
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
							if (uuid && (uuid === profilekey)) {
							  profileOject.connected = 'self';
								discoverProfiles.push(profileOject);
								if (discoverProfiles.length === count) {
									resolve(discoverProfiles);
								}
							} else if (uuid) {
                firebaseDB.child(`/relations/connections/${uuid}`).orderByKey().equalTo(profilekey).once('value', (connectSnap) => {
                  let connectionData = connectSnap.val();
                  if (connectionData) {
                    const relationStatus = connectionData[profilekey].rel_status;
                    profileOject.connected = relationStatus !== '0' ? 'yes' : 'requested';
                    profileOject.connectionId = connectionData[profilekey].rel_id;
                    discoverProfiles.push(profileOject);
                    if (discoverProfiles.length === count) {
                      resolve(discoverProfiles);
                    }
                  } else {
                    firebaseDB.child(`/relations/connections/${profilekey}`).orderByKey().equalTo(uuid).once('value', (profileConnectSnap) => {
                      connectionData = profileConnectSnap.val();
                      if (connectionData) {
                        profileOject.connected = 'request_received';
                        profileOject.connectionId = connectionData[uuid].rel_id;
                      } else {
                        profileOject.connected = 'no';
                        profileOject.connectionId = 'no';
                      }
                      discoverProfiles.push(profileOject);
                      if (discoverProfiles.length === count) {
                        resolve(discoverProfiles);
                      }
                    }, (err) => {
                      reject(err);
                    });
                  }
                }, (err) => {
                  reject(err);
                });
              } else {
                profileOject.connected = 'no';
                discoverProfiles.push(profileOject);
                if (discoverProfiles.length === count) {
                  resolve(discoverProfiles);
                }
              }
            }, (err) => {
              reject(err);
            });
          }
        });
      });
    }, (err) => {
      reject(err);
    });
  });
}
