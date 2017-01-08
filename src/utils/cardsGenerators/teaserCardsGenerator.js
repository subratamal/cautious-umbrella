/* Utilities for genrating array of mini teaser cards cards Props from data*/
import { createEntityNavigationUrl } from '../createNavigationUrl';
import _ from 'underscore';
import { createGeneralDateFormat, createEventDateFormat } from '../formatDate';

/*
Page teasers
@params teasers - array
@return array of teasers
*/
export const generatePageTeaserCards = function (teasers, mobileFlag, reducerName, componentName, parentComponent) {
  const tempTeasersArray = [];
  _.each(teasers, (obj, index) => {
    const followButtonData = {
      reducerName,
      parentComponent,
      storeIndex: index,
      componentName,
      type: obj.type,
      entityId: obj.id,
    };
    const pageUrl = createEntityNavigationUrl(obj.id, obj.type);
    const teaserData = {
      imageOnClickLink: pageUrl,
      imageSource: obj.display_picture ? obj.display_picture.image_100_100 : '',
      primaryTextOnClickLink: pageUrl,
      primaryText: obj.title,
      secondaryTextOnClickLink: pageUrl,
      secondaryText: (obj.location ? obj.location.city : ''),
      isWrapped: mobileFlag,
      followButtonData,
    };
    tempTeasersArray.push(teaserData);
  });
  return tempTeasersArray;
};

export const generateAuthorTeaserCards = function (teasers, mobileFlag, reducerName, componentName, parentComponent) {
  const tempTeasersArray = [];
  _.each(teasers, (obj, index) => {
    const followButtonData = {
      reducerName,
      parentComponent,
      storeIndex: index,
      componentName,
      type: obj.type,
      entityId: obj.id,
    };
    const pageUrl = createEntityNavigationUrl(obj.id, obj.type);
    const teaserData = {
      imageOnClickLink: pageUrl,
      imageSource: obj.display_picture.image_100_100,
      primaryTextOnClickLink: pageUrl,
      primaryText: obj.title,
      secondaryTextOnClickLink: pageUrl,
      secondaryText: (obj.location ? obj.location.city : ''),
      isWrapped: mobileFlag,
      followButtonData,
    };
    tempTeasersArray.push(teaserData);
  });
  return tempTeasersArray;
};


export const generateTopicTeaserCards = function (teasers, mobileFlag, reducerName, componentName, parentComponent) {
  const tempTeasersArray = [];
  _.each(teasers, (obj, index) => {
    const followButtonData = {
      reducerName,
      parentComponent,
      storeIndex: index,
      componentName,
      type: obj.type,
      entityId: obj.id,
    };
    const topicUrl = createEntityNavigationUrl(obj.id, obj.type);
    const teaserData = {
      topicText: obj.name,
      topicUrl,
      topicCoverPicture: obj.cover_picture,

      isWrapped: mobileFlag,
      followButtonData,
    };
    tempTeasersArray.push(teaserData);
  });
  return tempTeasersArray;
};

/*
Profile Mini Teasers
@params teasers - array
@return array of mini teasers props fop ProfileMiniteaser
*/
export const generateProfileTeaserCards = function (teasers, mobileFlag, reducerName, componentName, parentComponent) {
  const tempTeasersArray = [];
  _.each(teasers, (obj, index) => {
    const connectButtonData = {
      reducerName,
      parentComponent,
      storeIndex: index,
      componentName,
      type: obj.type,
      entityId: obj.id,
    };

    const userProfielUrl = createEntityNavigationUrl(obj.id, obj.type);
// Props for profile mini teaser
    const miniTeaserData = {
      imageOnClickLink: userProfielUrl,
      imageSource: obj.display_picture ? obj.display_picture.image_100_100 : null,
      primaryTextOnClickLink: userProfielUrl,
      primaryText: obj.name,
      secondaryText: obj.current_campus ? (obj.current_campus.data[0] ? obj.current_campus.data[0].rel_value : '') : null,
      isWrapped: mobileFlag,
      connectButtonData,
    };
    tempTeasersArray.push(miniTeaserData);
  });
  return tempTeasersArray;
};
