import firebaseDB from '../firebase_request_handler';
/*
Funcitonality to get notification data
*/
export function getUserDetail(userId) {
  return new Promise((resolve, reject) => {
    firebaseDB.child(`resources/${userId}`).once('value', (userSnap) => {
      resolve(userSnap.val());
    }).catch((error) => {
      // console.log(error);
      reject(error);
    });
  });
}

export function getUserProfileDetail(userId) {
  return new Promise((resolve, reject) => {
    firebaseDB.child(`relations/profile/${userId}`).once('value', (userSnap) => {
      if (userSnap.val() && typeof userSnap.val() === 'object') {
        const id = Object.keys(userSnap.val());
        firebaseDB.child(`resources/${id[0]}`).once('value', (profileSnap) => {
          resolve(profileSnap.val());
        }, (error) => {
          resolve(error);
        })
        .catch((error) => {
          // console.log(error);
          reject(error);
        });
      } else {
        resolve(true);
      }
    }, (error) => {
      reject(error);
    })
    .catch((error) => {
      // console.log(error);
      reject(error);
    });
  });
}
