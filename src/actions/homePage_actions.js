import api from '../api/api';
import { homePageConfig } from '../defaults';
import fireBaseApi from '../firebaseAPI/api';


/*
Actions for calling APIs for Home Page
*/


/* Success State*/
// this action will reset landing page and home page feed redux state on login state change
export function resetHomePage() {
  return dispatch => {
    dispatch({
      type: 'RESET_HOME_PAGE',
    });
  };
}
export function setSuccessState(data, component, append) {
  return {
    type: homePageConfig.parentComponent.toUpperCase() + '_SET_COMPONENT_STATE_SUCCESS',
    data,
    component,
    append,
  };
}

/* Error State*/
export function setErrorState(data, component) {
  return {
    type: homePageConfig.parentComponent.toUpperCase() + '_SET_COMPONENT_STATE_ERROR',
    data,
    component,
  };
}

export function fetchTrendingStories() {
  return dispatch => {
    return fireBaseApi.getHomePageTrendingStories().then((result) => {
      result.reverse();
      dispatch(setSuccessState(result, homePageConfig.pageComponents.sideBarTrendingStories));
    }).catch((err) => {
      dispatch(setErrorState(err, homePageConfig.pageComponents.sideBarTrendingStories));
    });
  };
}

export function fetchSidebarSliderData() {
  return dispatch => {
    return fireBaseApi.getHomeSidebarSliderPages().then((result) => {
      result.reverse();
      dispatch(setSuccessState(result, homePageConfig.pageComponents.sideBarSlider));
    }).catch((err) => {
      dispatch(setErrorState(err, homePageConfig.pageComponents.sideBarSlider));
    });
  };
}
export function fetchHomeFeedData(userid, offset, limit) {
  return dispatch => {
    return api.getHomePageFeeds(userid, offset, limit).then((result) => {
      if (result.data.Message !== undefined && result.data.Message === 'No records found.') {
        dispatch(setSuccessState(result.data, homePageConfig.pageComponents.HomePageFeed, true));
        dispatch(setHasMoreFeedData(false));
      } else {
        dispatch(setSuccessState(result.data, homePageConfig.pageComponents.HomePageFeed, true));// passing true as aapend flag
        dispatch(setHasMoreFeedData(true));
      }
    }).catch((err) => {
      dispatch(setHasMoreFeedData(false));
      dispatch(setErrorState(err, homePageConfig.pageComponents.HomePageFeed));
    });
  };
}

export function setIncrementStoryFeedCount(status) {
  return {
    type: 'FEED_STORY_TYPE_INCREMENT_COUNTER',
    status,
  };
}

export function setIncrementEventFeedCount(status) {
  return {
    type: 'FEED_EVENT_TYPE_INCREMENT_COUNTER',
    status,
  };
}

export function setFeedShareData(data) {
  return {
    type: 'FEED_SHARE_DATA',
    data,
  };
}

export function setHasMoreFeedData(status) {
  return {
    type: 'FEED_MORE_DATA',
    status,
  };
}

export function setHasMoreStoryFeedData(status) {
  return {
    type: 'STORY_FEED_MORE_DATA',
    status,
  };
}

export function setHasMoreEventFeedData(status) {
  return {
    type: 'EVENT_FEED_MORE_DATA',
    status,
  };
}

export function fetchHomeFeedEventData(userid, offset, limit, type) {
  return dispatch => {
    return api.getHomePageTypeFeeds(userid, offset, limit, type).then((result) => {
      if (result.data.Message !== undefined && result.data.Message == 'No records found.') {
        dispatch(setSuccessState(result.data, homePageConfig.pageComponents.HomePageFeedEvent, true));
        dispatch(setHasMoreEventFeedData(false));
      }
      else {
        dispatch(setSuccessState(result.data, homePageConfig.pageComponents.HomePageFeedEvent, true));
        dispatch(setHasMoreEventFeedData(true));
      }
    }).catch((err) => {
      dispatch(setHasMoreEventFeedData(false));
      dispatch(setErrorState(err, homePageConfig.pageComponents.HomePageFeedEvent));
    });
  };
}

export function fetchHomeFeedStoryData(userid, offset, limit, type) {
  return dispatch => {
    return api.getHomePageTypeFeeds(userid, offset, limit, type).then((result) => {
      if (result.data.Message !== undefined && result.data.Message == 'No records found.') {
        dispatch(setSuccessState(result.data, homePageConfig.pageComponents.HomePageFeedStory, true));
        dispatch(setHasMoreStoryFeedData(false));
      }
      else {
        dispatch(setSuccessState(result.data, homePageConfig.pageComponents.HomePageFeedStory, true));
        dispatch(setHasMoreStoryFeedData(true));
      }
    }).catch((err) => {
      dispatch(setHasMoreStoryFeedData(false));
      dispatch(setErrorState(err, homePageConfig.pageComponents.HomePageFeedStory));
    });
  };
}
