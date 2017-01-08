import generateNotificationProps from '../utils/notificationPropsGenerator';
import { getStreamNotificationFeedToken } from '../webappApi/api';

import {
  NOTIFICATION_SUCCESS,
  NOTIFICATION_FEEDTOKEN,
  NOTIFICATION_ERROR,
  SHOW_MORE_NOTIFICATION_LOADER,
  SHOW_MORE_NOTIFICATION_BUTTON,
} from '../constants/actions';

import client from '../getStreamApi';
import getStreamConfig from '../../config/getStream';

let updateCount = getStreamConfig.initialLimit;
/*eslint-disable */
export function getAllNotification(id, count) {
/*eslint-enable */
  return (dispatch) => {
    const requestObject = {
      accountId: id,
    };
    let limit = getStreamConfig.initialLimit;
    if (count !== undefined) {
      dispatch({
        type: SHOW_MORE_NOTIFICATION_LOADER,
        status: true,
      });
      limit += limit * count;
      updateCount = limit;
    }
    // creating a feed token server side
    getStreamNotificationFeedToken(requestObject).then((res) => {
      if (res.data) {
        const token = res.data;
        dispatch({
          type: NOTIFICATION_FEEDTOKEN,
          token,
        });
        const userFeeds = client.feed('notification', id, token);
        let totalLength = 0;
        const tLimit = limit + 1;
        userFeeds.get({ limit: tLimit, offset: 0 }).then((response) => {
          totalLength = response.results.length;
          return totalLength;
        })
       .then((value) => {
         userFeeds.get({ limit, offset: 0 })
       .then((response) => {
         if (response.results.length === value) {
           dispatch({
             type: SHOW_MORE_NOTIFICATION_BUTTON,
             status: false,
           });
         }
         generateNotificationProps(response.results)
         .then((values) => {
           if (values !== '') {
             const notificationCount = response.unseen;
             dispatch({
               type: NOTIFICATION_SUCCESS,
               notificationsData: {
                 notifications: values,
                 notificationCount,
                 status: false,
                 loaderStatus: false,
               },
             });
           } else {
             dispatch({
               type: NOTIFICATION_ERROR,
               notificationsData: {
                 errorStatus: true,
                 status: false,
               },
             });
           }
         })
         .catch(() => {
           dispatch({
             type: SHOW_MORE_NOTIFICATION_LOADER,
             status: false,
           });
         });
       })
       .catch(() => {
         dispatch({
           type: SHOW_MORE_NOTIFICATION_LOADER,
           status: false,
         });
       });
       });

        function callback(data) {
          if (data.new !== undefined) {
            let newLimit = updateCount;
            newLimit += data.new.length;
            limit = newLimit;
            let totalResultLength = 0;
            const callbackLimit = newLimit + 1;
            userFeeds.get({ limit: callbackLimit, offset: 0 }).then((response) => {
              totalResultLength = response.results.length;
              return totalResultLength;
            })
           .then((value) => {
             userFeeds.get({ limit: newLimit, offset: 0 })
           .then((response) => {
             if (response.results.length === value) {
               dispatch({
                 type: SHOW_MORE_NOTIFICATION_BUTTON,
                 status: false,
               });
             } else {
               dispatch({
                 type: SHOW_MORE_NOTIFICATION_BUTTON,
                 status: true,
               });
             }
             generateNotificationProps(response.results)
          .then((values) => {
            if (values !== '') {
              const notificationCount = response.unseen;
              dispatch({
                type: NOTIFICATION_SUCCESS,
                notificationsData: {
                  notifications: values,
                  notificationCount,
                  status: false,
                },
              });
            } else {
              dispatch({
                type: NOTIFICATION_ERROR,
                status: true,
              });
            }
          })
          .catch(() => {
            dispatch({
              type: NOTIFICATION_ERROR,
              status: true,
            });
          });
           })
         .catch(() => {
           dispatch({
             type: NOTIFICATION_ERROR,
             status: true,
           });
         });
           });
          }
        }
        if (count === undefined) {
          userFeeds.subscribe(callback);
        }
      } else {
        dispatch({
          type: NOTIFICATION_ERROR,
          status: true,
        });
      }
    }, () => {
    });
  };
}
