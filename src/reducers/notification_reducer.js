import { fromJS } from 'immutable';
import {
  NOTIFICATION_SUCCESS,
  NOTIFICATION_FEEDTOKEN,
  NOTIFICATION_ERROR,
  SHOW_MORE_NOTIFICATION_LOADER,
  SHOW_MORE_NOTIFICATION_BUTTON,
} from '../constants/actions';

const intitialState = fromJS(Object.assign({
  notificationData: null,
  showMoreNotificationBtn: true,
  notificationCount: 0,
  feedToken: null,
  emptyNotification: false,
  notificationLoader: false,
}));
export default function (state = intitialState, action) {
  switch (action.type) {
    case NOTIFICATION_SUCCESS : {
      const { notifications, notificationCount, status, loaderStatus } = action.notificationsData;
      return state.set('notificationData', notifications)
                  .set('notificationCount', notificationCount)
                  .set('emptyNotification', status)
                  .set('notificationLoader', loaderStatus);
    }
    case NOTIFICATION_FEEDTOKEN :
      return state.set('feedToken', action.token);
    case NOTIFICATION_ERROR: {
      const { errorStatus, status } = action.notificationsData;
      return state.set('emptyNotification', errorStatus)
                  .set('notificationLoader', status);
    }
    case SHOW_MORE_NOTIFICATION_LOADER:
      return state.set('notificationLoader', action.status);
    case SHOW_MORE_NOTIFICATION_BUTTON:
      return state.set('showMoreNotificationBtn', action.status);
    default:
      return state;
  }
}
