/* Utilities for genrating array of block cards props from data*/
import _ from 'underscore';
import { createEntityNavigationUrl } from '../createNavigationUrl';
import { createEventDateFormat } from '../formatDate';
import createLocationString from '../createLocationString';
/*
@params array of stories recieved from api
@return array of StoryBlockCards
*/
export const generateStoryCardsProps = function (stories, reducerName, componentName, parentComponent) {
  const storyCardsArray = [];
  _.each(stories, (story, index) => {
/* Get author info from each object
TODO - Get user prfile url to navigate to
 */
    let author = {};
    if (story && story.author && story.author.data) {
      author = story.author.data[0];
    }
    const urlId = author.id ? author.id : null;
    const urlType = author.type ? author.type : null;
/* Create navigation url for user image and name click*/
    const authorProfileUrl = createEntityNavigationUrl(urlId, urlType);
// Props for profile mini teaser
    const authorMiniTeaserData = {
      imageOnClickLink: authorProfileUrl,
      imageSource: author.display_picture ? author.display_picture.image_100_100 : null,
      primaryTextOnClickLink: authorProfileUrl,
      primaryText: author.name ? author.name : '',
      secondaryText: (author.current_campus && author.current_campus.data[0] ? author.current_campus.data[0].rel_value : ''),
    };

    const interactivityCardData = {
      reducerName,
      componentName,
      parentComponent,
      storeIndex: index,
      type: story.type ? story.type : null,
      entityId: story.id ? story.id : null,
    };

    const storyBlockCardProps = {
      imageSource: (story.cover_picture ? story.cover_picture.cover_explore : null),
      imageOnClickLink: createEntityNavigationUrl(story.id, story.type),
      primaryTextOnClickLink: createEntityNavigationUrl(story.id, story.type),
      primaryText: story.title ? story.title : '',
      secondaryText: story.updated_time ? story.updated_time : '',
      profileMiniTeaserCardContent: authorMiniTeaserData,
      interactivityCardContent: interactivityCardData,
    };

    storyCardsArray.push(storyBlockCardProps);
  });
  return storyCardsArray;
};
/*
@params array of events recieved from api
@return array of EventBlockCards
*/
export const generateEventCardsProps = function (events, reducerName, componentName, parentComponent) {
  const eventCardsArray = [];
  _.each(events, (eventData, index) => {
/* Get author info from each object
TODO - Get user prfile url to navigate to
 */
    const author = eventData.author.data[0];
    let eventSubType = '';
    if(eventData.subtype !== undefined && eventData.subtype !== ''){
      eventSubType = eventData.subtype;
    } else {
      eventSubType = '';
    }
/* Create navigation url for user image and name click*/
    const authorProfileUrl = createEntityNavigationUrl(author.id, author.type);
// Props for profile mini teaser
    const authorMiniTeaserData = {
      imageOnClickLink: authorProfileUrl,
      imageSource: author.display_picture.image_100_100,
      primaryTextOnClickLink: authorProfileUrl,
      primaryText: author.name,
      secondaryText: (author.current_campus.data[0] ? author.current_campus.data[0].rel_value : ''),
    };

    const interactivityCardData = {
      reducerName,
      parentComponent,
      storeIndex: index,
      componentName,
      type: eventData.type,
      entityId: eventData.id,
    };
/* Create secondary text to show eventData start time and end time*/
    const eventTimeSpan = createEventDateFormat(eventData.start_time) + ' - ' + createEventDateFormat(eventData.end_time);
    const event = {
      imageSource: (eventData.cover_picture ? eventData.cover_picture.cover_explore : null),
      primaryText: eventData.title,
      secondaryText: eventTimeSpan,
      imageOnClickLink: createEntityNavigationUrl(eventData.id, eventData.type),
      primaryTextOnClickLink: createEntityNavigationUrl(eventData.id, eventData.type),
      subtype:eventSubType
    };
    const eventBlockCardProps = {
      event,
      profileMiniTeaserCardContent: authorMiniTeaserData,
      interactivityCardContent: interactivityCardData,
    };
    eventCardsArray.push(eventBlockCardProps);
  });
  return eventCardsArray;
};
export const generatePageBlockCards = function (pages, reducerName, componentName, parentComponent) {
  const tempBlockArray = [];
  _.each(pages, (obj, index) => {
    const pageUrl = createEntityNavigationUrl(obj.id, obj.type);
    const location = createLocationString(obj.location);
    const followButtonData = {
      reducerName,
      parentComponent,
      storeIndex: index,
      componentName,
      type: obj.type,
      entityId: obj.id,
    };
    const blockData = {
      imageOnClickLink: pageUrl,
      imageSource: obj.cover_picture ? obj.cover_picture.cover_explore : null,
      primaryTextOnClickLink: pageUrl,
      primaryText: obj.title,
      secondaryImageSource: obj.display_picture ? obj.display_picture.image_100_100 : null,
      secondaryTextOnClickLink: pageUrl,
      secondaryText: location,
      cardClasses: [],
      followButtonData,
    };
    tempBlockArray.push(blockData);
  });
  return tempBlockArray;
};
