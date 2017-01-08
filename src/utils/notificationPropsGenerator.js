/* Utilities for genrating array of feed cards Props from data*/
import _ from 'underscore';
import { createEventDateFormat } from './formatDate';
import fireBaseApi from '../firebaseAPI/api';
/*
Notification Props
@params block - array
@return array of block
*/
const getNotificationsUser = (data, functionCall) => {
  return fireBaseApi[functionCall](data.uuid).then((result) => {
    if (result !== null) {
      if (result.name !== undefined) {
        const id = result.id;
        const type = result.type;
        let username = result.name;
        if (result.title === 'page') {
          username = result.title;
        }
        const userDetail = {
          id,
          type,
          name: username,
        };
        return userDetail;
      }
      if (result.title !== undefined) {
        const id = result.id;
        const type = result.type;
        const username = result.title;
        const userDetail = {
          id,
          type,
          name: username,
        };
        return userDetail;
      }
    }
    return true;
  });
};

const generateNotificationProps = (resultData) => {
  const notificationPromises = [];
  let pr1 = Promise.resolve(true);
  let pr2 = Promise.resolve(true);
  let pr3 = Promise.resolve(true);
  let pr4 = Promise.resolve(true);

  _.each(resultData, (obj) => {
    const actorCount = obj.actor_count;
    const createAt = obj.created_at;
    const isRead = obj.is_read;

    const notificationActivity = [];
    const uuids = [];

    const verb = obj.verb;
    const activityId = obj.id;

    let prevTime = 0;
    let currentTime = 0;
    obj.activities.map((item) => {
      const ids = (item.actor).split(':');
      let uuid = ids[1];
      if (uuid === undefined) {
        uuid = ids[0];
      }

      let objDetail = (item.object).split(':');
      objDetail = objDetail[1];

      let targetId = item.target;
      if (targetId !== null) {
        targetId = targetId.split(':');
        targetId = targetId[1];
      }

      const timeOrder = new Date(item.time).getTime();
      currentTime = timeOrder;
      // Check if uuid and object is not repeating.
      if (uuids.indexOf(uuid) < 0) {
        uuids.push(uuid);
        if (prevTime > currentTime) {
          notificationActivity.push({
            uuid,
            objects: objDetail,
            time: currentTime,
            targetId,
          });
        } else {
          notificationActivity.unshift({
            uuid,
            objects: objDetail,
            time: currentTime,
            targetId,
          });
        }
        prevTime = currentTime;
      }
      return true;
    });
    if (notificationActivity.length >= 1) {
      pr1 = new Promise((resolve, reject) => {
        let functionCall = '';
        if (obj.verb === 'added_to_page' ||
        obj.verb === 'story_added' ||
        obj.verb === 'added_to_topic') {
          functionCall = 'getUserDetail';
        } else {
          functionCall = 'getUserProfileDetail';
        }
        const userDetailPromise = [];
        let count = 0;
        notificationActivity.map((item) => {
          count++;
          if (count <= 2) {
            const userPromise = getNotificationsUser(item, functionCall).then((result) => {
              return result;
            }).catch((error) => {
              reject(error);
            });
            userDetailPromise.push(userPromise);
          } else {
            return true;
          }
          return true;
        });
        Promise.all(userDetailPromise).then((values) => {
          resolve(values);
        }, reason => {
          reject(reason);
        });
      }).catch(() => {
      });
    }
    if (notificationActivity.length >= 1) {
      pr2 = new Promise((resolve, reject) => {
        return fireBaseApi.getUserDetail(notificationActivity[0].objects).then((result) => {
          if (result !== null) {
            return result;
          }
          return true;
        }).then((values) => {
          resolve(values);
        }).catch((reason) => {
          reject(reason);
        });
      }).catch(() => {
      });
    }
    if (notificationActivity[0].targetId !== undefined &&
    notificationActivity[0].targetId !== null && notificationActivity.length >= 1) {
      pr3 = new Promise((resolve, reject) => {
        return fireBaseApi.getUserDetail(notificationActivity[0].targetId).then((result) => {
          if (result !== null) {
            return result;
          }
          return true;
        }).then((value) => {
          resolve(value);
        }).catch((reason) => {
          reject(reason);
        });
      });
    }

    pr4 = Promise.resolve({
      createdAt: createAt !== '' ?
      createEventDateFormat(createAt) : '',
      actorCount,
      verb,
      is_read: isRead,
      activity_id: activityId,
    });

    /* eslint arrow-body-style: ["error", "always"] */
    const eachNotificationPromise = Promise.all([pr1, pr2, pr3, pr4]).then(value => {
      return value;
    }, reason => {
      return reason;
    });

    notificationPromises.push(eachNotificationPromise);
  });

  return Promise.all(notificationPromises)
  .then((values) => {
    return values;
  });
};

export { generateNotificationProps as default };
