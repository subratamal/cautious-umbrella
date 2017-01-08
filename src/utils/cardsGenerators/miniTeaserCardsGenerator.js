/* Utilities for genrating array of mini teaser cards cards Props from data*/
import { createEntityNavigationUrl } from '../createNavigationUrl';
import _ from 'underscore';
import { createGeneralDateFormat, createEventDateFormat } from '../formatDate';
import createLocationString from '../createLocationString';

/*
Page Mini teasers
@params teasers - array
@return array of mini teasers
*/
export const generatePageMiniTeaserCards = function (teasers, mobileFlag) {
  const tempTeasersArray = [];
  _.each(teasers, (obj) => {
    const pageUrl = createEntityNavigationUrl(obj.id, obj.type);
    const location = createLocationString(obj.location);

    const miniTeaserData = {
      imageOnClickLink: pageUrl,
      imageSource: obj.display_picture ? obj.display_picture.image_100_100 : '',
      primaryTextOnClickLink: pageUrl,
      primaryText: obj.title,
      secondaryTextOnClickLink: pageUrl,
      secondaryText: location,
      isWrapped: mobileFlag,
    };
    tempTeasersArray.push(miniTeaserData);
  });
  return tempTeasersArray;
};


/*
Profile Mini Teasers
@params teasers - array
@return array of mini teasers props fop ProfileMiniteaser
*/
export const generateProfileMiniTeaserCards = function (teasers, mobileFlag) {
  const tempTeasersArray = [];
  _.each(teasers, (obj) => {
    const userProfielUrl = createEntityNavigationUrl(obj.id, obj.type);
// Props for profile mini teaser

    const miniTeaserData = {
      imageOnClickLink: userProfielUrl,
      imageSource: obj.display_picture.image_100_100,
      primaryTextOnClickLink: userProfielUrl,
      primaryText: obj.name,
      secondaryText: (obj.current_campus.data[0] ? obj.current_campus.data[0].rel_value : ''),
      isWrapped: mobileFlag,
    };
    tempTeasersArray.push(miniTeaserData);
  });
  return tempTeasersArray;
};

/*
Story Mini Teasers
@params teasers - array
@return array of mini teasers
*/
export const generateStoryMiniTeaserCards = function (teasers, mobileFlag) {
  const tempTeasersArray = [];
  _.each(teasers, (obj) => {
    const storyUrl = createEntityNavigationUrl(obj.id, obj.type);
    const storyTimeStamp = createGeneralDateFormat(obj.updated_time);

    const miniTeaserData = {
      imageOnClickLink: storyUrl,
      imageSource: (obj.cover_picture ? obj.cover_picture.image_100_100 : null),
      primaryTextOnClickLink: storyUrl,
      primaryText: obj.title,
      secondaryTextOnClickLink: storyUrl,
      secondaryText: storyTimeStamp,
      isWrapped: mobileFlag,
    };
    tempTeasersArray.push(miniTeaserData);
  });
  return tempTeasersArray;
};


/*
Events Mini Teasers
@params teasers - array
@return array of mini teasers
*/
export const generateEventMiniTeaserCards = function (teasers, mobileFlag) {
  const tempTeasersArray = [];
  _.each(teasers, (obj) => {
    const eventUrl = createEntityNavigationUrl(obj.id, obj.type);
    const eventTimeStamp = createEventDateFormat(obj.start_time);

    const miniTeaserData = {
      imageOnClickLink: eventUrl,
      imageSource: (obj.cover_picture ? obj.cover_picture.image_100_100 : null),
      primaryTextOnClickLink: eventUrl,
      primaryText: obj.title,
      secondaryTextOnClickLink: eventUrl,
      secondaryText: eventTimeStamp,
      isWrapped: mobileFlag,
    };
    tempTeasersArray.push(miniTeaserData);
  });
  return tempTeasersArray;
};


/*
Mini teaser cased in trending stories
*/

export const generateTrendingMiniTeaserCards = function (teasers, mobileFlag) {
  const tempTeasersArray = [];
  _.each(teasers, (obj) => {
    const entityUrl = createEntityNavigationUrl(obj.id, obj.type);
    let entityTimeStamp;
    if (obj.type === 'event') {
      entityTimeStamp = createEventDateFormat(obj.start_time);
    }
    else {
      entityTimeStamp = createGeneralDateFormat(obj.updated_time);
    }

    const miniTeaserData = {
      imageOnClickLink: entityUrl,
      imageSource: (obj.cover_picture ? obj.cover_picture.image_100_100 : null),
      primaryTextOnClickLink: entityUrl,
      primaryText: obj.title,
      secondaryTextOnClickLink: entityUrl,
      secondaryText: entityTimeStamp,
      isWrapped: mobileFlag,
    };
    tempTeasersArray.push(miniTeaserData);
  });
  return tempTeasersArray;
};
