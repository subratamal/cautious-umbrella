import { Map } from 'immutable';
import { checkLoggedIn } from '../actions/checkLoggedIn';

const intialState = new Map();

function saveSuccess(state, action) {
  let newState = state;
  if (action.homeFeed) {
    newState = newState.setIn([action.component, 'data', action.storeIndex, 'object', ' data', '0', 'isSaving'], false);
    newState = newState.setIn([action.component, 'data', action.storeIndex, 'object', 'data', '0', 'saved'], action.entityId);
  }
  if (action.sliderDataIndex === undefined) {
    newState = newState.setIn([action.component, 'data', action.storeIndex, 'isSaving'], false);
    newState = newState.setIn([action.component, 'data', action.storeIndex, 'saved'], action.entityId);
  } else {
    newState = newState.setIn([action.component, 'data', action.sliderDataIndex, 'data', action.storeIndex, 'isSaving'], false);
    newState = newState.setIn([action.component, 'data', action.sliderDataIndex, 'data', action.storeIndex, 'saved'], action.entityId);
  }
  return newState;
}

function saveInProgress(state, action) {
  let newState = state;
  if (action.homeFeed) {
    newState = newState.setIn([action.component, 'data', action.storeIndex, 'object', 'data', '0', 'isSaving'], true);
  }
  if (action.sliderDataIndex === undefined) {
    newState = newState.setIn([action.component, 'data', action.storeIndex, 'isSaving'], true);
  } else {
    newState = newState.setIn([action.component, 'data', action.sliderDataIndex, 'data', action.storeIndex, 'isSaving'], true);
  }
  return newState;
}

function deleteSave(state, action) {
  let newState = state;
  if (action.homeFeed) {
    newState = newState.setIn([action.component, 'data', action.storeIndex, 'object', 'data', '0', 'isSaving'], false);
    newState = newState.setIn([action.component, 'data', action.storeIndex, 'object', 'data', '0', 'saved'], '0');
  }
  if (action.sliderDataIndex === undefined) {
    newState = newState.setIn([action.component, 'data', action.storeIndex, 'isSaving'], false);
    newState = newState.setIn([action.component, 'data', action.storeIndex, 'saved'], '0');
  } else {
    newState = newState.setIn([action.component, 'data', action.sliderDataIndex, 'data', action.storeIndex, 'isSaving'], false);
    newState = newState.setIn([action.component, 'data', action.sliderDataIndex, 'data', action.storeIndex, 'saved'], '0');
  }
  return newState;
}

/* Recommend */
function recommendSuccess(state, action) {
  let newState = state;
  if (action.homeFeed) {
    newState = newState.setIn([action.component, 'data', action.storeIndex, 'object', 'data', '0', 'isRecommending'], false);
    let count = newState.getIn([action.component, 'data', action.storeIndex, 'object', 'data', '0', 'recommend_count']);
    count++;
    newState = newState.setIn([action.component, 'data', action.storeIndex, 'object', 'data', '0', 'recommended'], action.entityId);
    newState = newState.setIn([action.component, 'data', action.storeIndex, 'object', 'data', '0', 'recommend_count'], count);
  }
  if (action.sliderDataIndex === undefined) {
    newState = newState.setIn([action.component, 'data', action.storeIndex, 'isRecommending'], false);
    let count = newState.getIn([action.component, 'data', action.storeIndex, 'recommend_count']);
    count++;
    newState = newState.setIn([action.component, 'data', action.storeIndex, 'recommended'], action.entityId);
    newState = newState.setIn([action.component, 'data', action.storeIndex, 'recommend_count'], count);
  } else {
    newState = newState.setIn([action.component, 'data', action.sliderDataIndex, 'data', action.storeIndex, 'isRecommending'], false);
    let count = newState.getIn([action.component, 'data', action.sliderDataIndex, 'data', action.storeIndex, 'recommend_count']);
    count++;
    newState = newState.setIn([action.component, 'data', action.sliderDataIndex, 'data', action.storeIndex, 'recommended'], action.entityId);
    newState = newState.setIn([action.component, 'data', action.sliderDataIndex, 'data', action.storeIndex, 'recommend_count'], count);
  }
  return newState;
}

function recommendInProgress(state, action) {
  let newState = state;
  if (action.homeFeed) {
    newState = newState.setIn([action.component, 'data', action.storeIndex, 'object', 'data', '0', 'isRecommending'], true);
  }
  if (action.sliderDataIndex === undefined) {
    newState = newState.setIn([action.component, 'data', action.storeIndex, 'isRecommending'], true);
  } else {
    newState = newState.setIn([action.component, 'data', action.sliderDataIndex, 'data', action.storeIndex, 'isRecommending'], true);
  }
  return newState;
}

function deleteRecommend(state, action) {
  let newState = state;
  if (action.homeFeed) {
    newState = newState.setIn([action.component, 'data', action.storeIndex, 'object', 'data', '0', 'isRecommending'], false);
    newState = newState.setIn([action.component, 'data', action.storeIndex, 'object', 'data', '0', 'recommended'], '0');
    let count = newState.getIn([action.component, 'data', action.storeIndex, 'object', 'data', '0', 'recommend_count']);
    count--;
    newState = newState.setIn([action.component, 'data', action.storeIndex, 'object', 'data', '0', 'recommend_count'], count);
  }
  if (action.sliderDataIndex === undefined) {
    newState = newState.setIn([action.component, 'data', action.storeIndex, 'isRecommending'], false);
    newState = newState.setIn([action.component, 'data', action.storeIndex, 'recommended'], '0');
    let count = newState.getIn([action.component, 'data', action.storeIndex, 'recommend_count']);
    count--;
    newState = newState.setIn([action.component, 'data', action.storeIndex, 'recommend_count'], count);
  } else {
    newState = newState.setIn([action.component, 'data', action.sliderDataIndex, 'data', action.storeIndex, 'isRecommending'], false);
    newState = newState.setIn([action.component, 'data', action.sliderDataIndex, 'data', action.storeIndex, 'recommended'], '0');
    let count = newState.getIn([action.component, 'data', action.sliderDataIndex, 'data', action.storeIndex, 'recommend_count']);
    count--;
    newState = newState.setIn([action.component, 'data', action.sliderDataIndex, 'data', action.storeIndex, 'recommend_count'], count);
  }
  return newState;
}
/* Follow */
function followSuccess(state, action) {
  let newState = state;
  if (action.sliderDataIndex === undefined) {
    if (action.entityType === 'page') {
      newState = newState.setIn([action.component, 'data', action.storeIndex, 'isFollowing'], false);
      newState = newState.setIn([action.component, 'data', action.storeIndex, 'following'], action.entityId);
    } else if (action.entityType === 'topic') {
      newState = newState.setIn([action.component, 'data', action.storeIndex, 'isFollowing'], false);
      newState = newState.setIn([action.component, 'data', action.storeIndex, 'subscribed'], action.entityId);
    }
  } else if (action.sliderDataIndex !== undefined && action.component === 'HomePageFeed') {
    if (action.entityType === 'page') {
      newState = newState.setIn([action.component, 'data', action.sliderDataIndex, 'objects', 'data', action.storeIndex, 'isFollowing'], false);
      newState = newState.setIn([action.component, 'data', action.sliderDataIndex, 'objects', 'data', action.storeIndex, 'following'], action.entityId);
    } else if (action.entityType === 'topic') {
      newState = newState.setIn([action.component, 'data', action.sliderDataIndex, 'objects', 'data', action.storeIndex, 'isFollowing'], false);
      newState = newState.setIn([action.component, 'data', action.sliderDataIndex, 'objects', 'data', action.storeIndex, 'subscribed'], action.entityId);
    }
  } else if (action.sliderDataIndex !== undefined) {
    if (action.entityType === 'page') {
      newState = newState.setIn([action.component, 'data', action.sliderDataIndex, 'data', action.storeIndex, 'isFollowing'], false);
      newState = newState.setIn([action.component, 'data', action.sliderDataIndex, 'data', action.storeIndex, 'following'], action.entityId);
    } else if (action.entityType === 'topic') {
      newState = newState.setIn([action.component, 'data', action.sliderDataIndex, 'data', action.storeIndex, 'isFollowing'], false);
      newState = newState.setIn([action.component, 'data', action.sliderDataIndex, 'data', action.storeIndex, 'subscribed'], action.entityId);
    }
  }
  return newState;
}

function followInProgress(state, action) {
  let newState = state;
  if (action.sliderDataIndex === undefined) {
    newState = newState.setIn([action.component, 'data', action.storeIndex, 'isFollowing'], true);
  } else if (action.sliderDataIndex !== undefined && action.component === 'HomePageFeed') {
    newState = newState.setIn([action.component, 'data', action.sliderDataIndex, 'objects', 'data', action.storeIndex, 'isFollowing'], true);
  } else {
    newState = newState.setIn([action.component, 'data', action.sliderDataIndex, 'data', action.storeIndex, 'isFollowing'], true);
  }
  return newState;
}

function deleteFollow(state, action) {
  let newState = state;
  if (action.sliderDataIndex === undefined) {
    if (action.entityType === 'page') {
      newState = newState.setIn([action.component, 'data', action.storeIndex, 'isFollowing'], false);
      newState = newState.setIn([action.component, 'data', action.storeIndex, 'following'], '0');
    } else if (action.entityType === 'topic') {
      newState = newState.setIn([action.component, 'data', action.storeIndex, 'isFollowing'], false);
      newState = newState.setIn([action.component, 'data', action.storeIndex, 'subscribed'], '0');
    }
  } else if (action.sliderDataIndex !== undefined && action.component === 'HomePageFeed') {
    if (action.entityType === 'page') {
      newState = newState.setIn([action.component, 'data', action.sliderDataIndex, 'objects', 'data', action.storeIndex, 'isFollowing'], false);
      newState = newState.setIn([action.component, 'data', action.sliderDataIndex, 'objects', 'data', action.storeIndex, 'following'], '0');
    } else if (action.entityType === 'topic') {
      newState = newState.setIn([action.component, 'data', action.sliderDataIndex, 'objects', 'data', action.storeIndex, 'isFollowing'], false);
      newState = newState.setIn([action.component, 'data', action.sliderDataIndex, 'objects', 'data', action.storeIndex, 'subscribed'], '0');
    }
  } else {
    if (action.entityType === 'page') {
      newState = newState.setIn([action.component, 'data', action.sliderDataIndex, 'data', action.storeIndex, 'isFollowing'], false);
      newState = newState.setIn([action.component, 'data', action.sliderDataIndex, 'data', action.storeIndex, 'following'], '0');
    } else if (action.entityType === 'topic') {
      newState = newState.setIn([action.component, 'data', action.sliderDataIndex, 'data', action.storeIndex, 'isFollowing'], false);
      newState = newState.setIn([action.component, 'data', action.sliderDataIndex, 'data', action.storeIndex, 'subscribed'], '0');
    }
  }
  return newState;
}

function connectInProgress(state, action) {
  let newState = state;
  if (action.sliderDataIndex === undefined) {
    newState = newState.setIn([action.component, 'data', action.storeIndex, 'isConnecting'], true);
  } else if (action.sliderDataIndex !== undefined && action.component === 'HomePageFeed') {
    newState = newState.setIn([action.component, 'data', action.sliderDataIndex, 'objects', 'data', action.storeIndex, 'isConnecting'], true);
  } else {
    newState = newState.setIn([action.component, 'data', action.sliderDataIndex, 'data', action.storeIndex, 'isConnecting'], true);
  }
  return newState;
}
/* Follow */
function connectSuccess(state, action) {
  let newState = state;
  if (action.sliderDataIndex === undefined) {
    newState = newState.setIn([action.component, 'data', action.storeIndex, 'isConnecting'], false);
    newState = newState.setIn([action.component, 'data', action.storeIndex, 'connectionId'], action.entityId);
    newState = newState.setIn([action.component, 'data', action.storeIndex, 'connected'], 'requested');
  } else if (action.sliderDataIndex !== undefined && action.component === 'HomePageFeed') {
    newState = newState.setIn([action.component, 'data', action.sliderDataIndex, 'objects', 'data', action.storeIndex, 'isConnecting'], false);
    newState = newState.setIn([action.component, 'data', action.sliderDataIndex, 'objects', 'data', action.storeIndex, 'connectionId'], action.entityId);
    newState = newState.setIn([action.component, 'data', action.sliderDataIndex, 'objects', 'data', action.storeIndex, 'connected'], 'requested');
  } else {
    newState = newState.setIn([action.component, 'data', action.sliderDataIndex, 'data', action.storeIndex, 'isConnecting'], false);
    newState = newState.setIn([action.component, 'data', action.sliderDataIndex, 'data', action.storeIndex, 'connectionId'], action.entityId);
    newState = newState.setIn([action.component, 'data', action.sliderDataIndex, 'data', action.storeIndex, 'connected'], 'requested');
  }
  return newState;
}

function approveConnect(state, action) {
  let newState = state;
  if (action.sliderDataIndex === undefined) {
    newState = newState.setIn([action.component, 'data', action.storeIndex, 'isConnecting'], false);
    newState = newState.setIn([action.component, 'data', action.storeIndex, 'connectionId'], action.entityId);
    newState = newState.setIn([action.component, 'data', action.storeIndex, 'connected'], 'yes');
  } else if (action.sliderDataIndex !== undefined && action.component === 'HomePageFeed') {
    newState = newState.setIn([action.component, 'data', action.sliderDataIndex, 'objects', 'data', action.storeIndex, 'isConnecting'], false);
    newState = newState.setIn([action.component, 'data', action.sliderDataIndex, 'objects', 'data', action.storeIndex, 'connectionId'], action.entityId);
    newState = newState.setIn([action.component, 'data', action.sliderDataIndex, 'objects', 'data', action.storeIndex, 'connected'], 'yes');
  } else {
    newState = newState.setIn([action.component, 'data', action.sliderDataIndex, 'data', action.storeIndex, 'isConnecting'], false);
    newState = newState.setIn([action.component, 'data', action.sliderDataIndex, 'data', action.storeIndex, 'connectionId'], action.entityId);
    newState = newState.setIn([action.component, 'data', action.sliderDataIndex, 'data', action.storeIndex, 'connected'], 'yes');
  }
  return newState;
}

function declineConnect(state, action) {
  let newState = state;
  if (action.sliderDataIndex === undefined) {
    newState = newState.setIn([action.component, 'data', action.storeIndex, 'isConnecting'], false);
    newState = newState.setIn([action.component, 'data', action.storeIndex, 'connected'], 'no');
    newState = newState.setIn([action.component, 'data', action.storeIndex, 'connectionId'], '0');
  } else if (action.sliderDataIndex !== undefined && action.component === 'HomePageFeed') {
    newState = newState.setIn([action.component, 'data', action.sliderDataIndex, 'objects', 'data', action.storeIndex, 'isConnecting'], false);
    newState = newState.setIn([action.component, 'data', action.sliderDataIndex, 'objects', 'data', action.storeIndex, 'connected'], 'no');
    newState = newState.setIn([action.component, 'data', action.sliderDataIndex, 'objects', 'data', action.storeIndex, 'connectionId'], '0');
  } else {
    newState = newState.setIn([action.component, 'data', action.sliderDataIndex, 'data', action.storeIndex, 'isConnecting'], false);
    newState = newState.setIn([action.component, 'data', action.sliderDataIndex, 'data', action.storeIndex, 'connected'], 'no');
    newState = newState.setIn([action.component, 'data', action.sliderDataIndex, 'data', action.storeIndex, 'connectionId'], '0');
  }
  return newState;
}
export default function (state = intialState, action) {
  if (checkLoggedIn(true)) {
    switch (action.subType) {
      case 'SAVE_SUCCESS':
        return saveSuccess(state, action);
      case 'SAVE_INPROGRESS':
        return saveInProgress(state, action);
      case 'DELETE_SAVE':
        return deleteSave(state, action);
      case 'RECOMMEND_SUCCESS':
        return recommendSuccess(state, action);
      case 'RECOMMEND_INPROGRESS':
        return recommendInProgress(state, action);
      case 'DELETE_RECOMMEND':
        return deleteRecommend(state, action);
      case 'FOLLOW_SUCCESS':
        return followSuccess(state, action);
      case 'FOLLOW_INPROGRESS':
        return followInProgress(state, action);
      case 'DELETE_FOLLOW':
        return deleteFollow(state, action);
      case 'CONNECT_INPROGRESS':
        return connectInProgress(state, action);
      case 'CONNECT_SUCCESS':
        return connectSuccess(state, action);
      case 'APPROVE_SUCCESS':
        return approveConnect(state, action);
      case 'DECLINE_SUCCESS':
        return declineConnect(state, action);
      default:
        return state;
    }
  } else {
    return state;
  }
}
