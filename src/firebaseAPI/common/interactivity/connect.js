import firebaseDB from '../../firebase_request_handler';
/*
	Funcitonality to handle Save and remove Save with repect to firebase
*/

const onComplete = (error) => {
  if (error) {
    return false;
  }
  return true;
};

export function updateFireBaseConnect(data, id, action, type) {
  return new Promise((resolve, reject) => {
    const dataToRequested = Object.assign({}, data);
    const dataToRequester = Object.assign({}, data);
    const updateArray = {};

    if (action === 'CONNECT') {
      dataToRequested.id = id;
      updateArray[`relations/connections/${id}/${data.id}`] = dataToRequester;
      updateArray[`relations/connections_requests/${data.id}/${id}`] = dataToRequested;
      firebaseDB.child(`relations/connections_requests/${data.id}/metadata/unseen`).once('value').then((countSnap) => {
        const count = countSnap.val();
        firebaseDB.child(`relations/connections_requests/${data.id}/metadata`).update({ unseen: count > 0 ? count + 1 : 0 }, onComplete);
      });
    } else if (action === 'APPROVE') {
      dataToRequested.rel_status = '1';
      updateArray[`relations/connections/${data.id}/${id}/rel_status`] = '1';
      updateArray[`relations/connections/${data.id}/${id}/rel_id`] = data.rel_id;
      updateArray[`relations/connections/${id}/${data.id}`] = dataToRequested;
      updateArray[`relations/connections_requests/${id}/${data.id}`] = null;
      firebaseDB.child(`relations/connections_requests/${id}/metadata/unseen`).once('value').then((countSnap) => {
        const count = countSnap.val();
        firebaseDB.child(`relations/connections_requests/${id}/metadata`).update({ unseen: count > 0 ? count - 1 : 0 }, onComplete);
      });
    } else if (action === 'DECLINE') {
      updateArray[`relations/connections/${id}/${data.id}`] = null;
      updateArray[`relations/connections/${data.id}/${id}`] = null;
      updateArray[`relations/connections_requests/${id}/${data.id}`] = null;
      firebaseDB.child(`relations/connections_requests/${id}/metadata/unseen`).once('value').then((countSnap) => {
        const count = countSnap.val();
        firebaseDB.child(`relations/connections_requests/${id}/metadata`).update({ unseen: count > 0 ? count - 1 : 0 }, onComplete);
      });
    } else {
      return;
    }
    const updateSuccess = firebaseDB.update(updateArray, onComplete);
    if (updateSuccess) {
      resolve();
    } else {
      reject();
    }
  });
}
