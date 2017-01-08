/* Utilities for genrating array of feed cards Props from data*/
import _ from 'underscore';
import { createEntityNavigationUrl } from '../createNavigationUrl';
import { createGeneralDateFormat, createEventDateFormat } from '../formatDate';
import { pageThumbnail } from '../../defaults';

/*
Page Feed Card
@params block - array
@return array of block
*/
export const generatePageFeedCards =
(block, reducerName, componentName, parentComponent, offset) => {
  const tempBlockArray = [];
  let objectData = '';
  let actorData = '';
  let authorData = '';
  _.each(block, (obj, index) => {
    if(obj.object) {
      objectData = obj.object.data[0];
      if(objectData !== undefined &&
      objectData !== '' &&
      objectData.author !== undefined &&
      objectData.author.data[0] !== undefined) {
        authorData = objectData.author.data[0];
      }
    }
    if(obj.actors !== undefined &&
    obj.actors.data[0] !== undefined) {
      actorData = obj.actors.data[0];
    }
    if (objectData) {
      const pageUrl = createEntityNavigationUrl(objectData.id, objectData.type);
      let authorUrl = '';
      if (typeof objectData.author !== 'undefined'
&& objectData.author !== undefined) {
        authorUrl = createEntityNavigationUrl(authorData.id,
authorData.type);
      } else {
        authorUrl = '';
      }
      let actorUrl = '';
      if (typeof actorData !== 'undefined'
&& actorData !== undefined) {
        actorUrl = createEntityNavigationUrl(actorData.id, actorData.type);
      } else {
        actorUrl = '';
      }
      let primaryTextData = '';
      let actorName = '';
      let secondaryActor = '';
      let secondaryActorUrl = '';
      let storyAddedVerbLink = '';
      let storyAddedData = {};
      if (obj.verb === 'comment') {
        if (objectData.type === 'event') {
          primaryTextData = `commented on an ${objectData.type}`;
        } else {
          primaryTextData = `commented on a ${objectData.type}`;
        }
        actorName = actorData.name;
      } else if (obj.verb === 'recommend') {
        if (objectData.type === 'event') {
          primaryTextData = ` recommended an ${objectData.type}`;
        } else {
          primaryTextData = ` recommended a ${objectData.type}`;
        }
        actorName = actorData.name;
      } else if (obj.verb === 'story_added') {
        if (objectData.type === 'story') {
          storyAddedVerbLink = createEntityNavigationUrl(objectData.id,
          objectData.type);
          if (actorData !== undefined &&
            actorData.type === 'page') {
            primaryTextData = ' added in ';
            storyAddedData = {
              'type':'Story ',
              'title':objectData.title,
              'link':storyAddedVerbLink
            }
            actorName = actorData.title;
          } else {
            primaryTextData = ' added to topic ';
            storyAddedData = {
              'type':'Story ',
              'title':objectData.title,
              'link':storyAddedVerbLink
            }
            actorName = actorData.name;
          }
        } else if (objectData.type === 'event') {
          storyAddedVerbLink = createEntityNavigationUrl(objectData.id,
          objectData.type);
          if(actorData !== undefined &&
            actorData.type === 'page') {
            primaryTextData = ' added in ';
            storyAddedData = {
              'type':'Event ',
              'title':objectData.title,
              'link':storyAddedVerbLink
            }
            actorName = actorData.title;
          } else {
            primaryTextData = ' added to topic ';
            storyAddedData = {
              'type':'Event ',
              'title':objectData.title,
              'link':storyAddedVerbLink
            }
            actorName = actorData.name;
          }
        }
      } else if (obj.verb === 'publish' &&
    actorData !== undefined) {
        if (objectData.type === 'event') {
          primaryTextData = ` published an ${objectData.type}`;
        } else {
          primaryTextData = ` published a ${objectData.type}`;
        }
        actorName = actorData.name;
      } else if (obj.verb === 'attending' &&
    actorData !== undefined) {
        if (obj.actors.data.length > 2) {
          primaryTextData = ` and
${obj.actors.data.length - 1} others are attending an Event`;
          secondaryActor = actorData.name;
          secondaryActorUrl = createEntityNavigationUrl(actorData.id,
  actorData.type);
} else if (obj.actors.data.length === 2) {
          primaryTextData = ' are attending an Event';
          secondaryActor = actorData.name;
          secondaryActorUrl = createEntityNavigationUrl(actorData.id,
            actorData.type);
        } else {
          primaryTextData = ' is attending an Event';
        }
        actorName = actorData.name;
      }
      let dateDetail = '';
      if (objectData.type === 'story') {
        dateDetail = createGeneralDateFormat(objectData.updated_time);
      } else if (objectData.type === 'event') {
        dateDetail = `${createEventDateFormat(objectData.start_time)} -
${createEventDateFormat(objectData.end_time)}`;
      }
      const interactivityCardData = {
        reducerName,
        componentName,
        parentComponent,
        storeIndex: index + offset,
        type: objectData.type,
        homeFeed: true,
        entityId: objectData.id,
      };
      const blockData = {
        actors: {
          imageSource: typeof actorData.display_picture !== 'undefined' ?
actorData.display_picture.image_100_100 : pageThumbnail,
          primaryText: primaryTextData,
          primaryTextOnClickLink: actorUrl,
          imageOnClickLink: actorUrl,
          actorName,
          secondaryActor,
          secondaryActorUrl,
          secondaryText: createGeneralDateFormat(actorData.rel_created_time),
          verb: obj.verb,
          storyAddedData,
        },
        body: {
          imageOnClickLink: pageUrl,
          imageSource: typeof objectData.cover_picture !== 'undefined' ?
objectData.cover_picture.cover_explore : '',
          primaryTextOnClickLink: pageUrl,
          primaryText: objectData.title,
          secondaryTextOnClickLink: pageUrl,
          secondaryText: objectData.subtitle,
          updatedTime: dateDetail,
          recommendCount: objectData.recommend_count,
          commentCount: objectData.comment_count,
          type: objectData.type,
          verb: obj.verb,
          interactivityCardData,
        },
        feedProfile: {
          primaryText: typeof objectData.author !== 'undefined' ?
authorData.name : '',
          imageSource: typeof objectData.author !== 'undefined' ?
authorData.display_picture.image_100_100 : '',
          imageOnClickLink: authorUrl,
          primaryTextOnClickLink: authorUrl,
          secondaryText: typeof objectData.author !== 'undefined' &&
typeof authorData.current_campus.data[0] !== 'undefined' ?
authorData.current_campus.data[0].rel_value : '',
        },
      };
      tempBlockArray.push(blockData);
    }
    if (obj.objects !== undefined && obj.objects.data !== undefined
     && obj.objects.data.length > 0
    && (obj.verb === 'connected' || obj.verb === 'topic_follow')) {
      const peopleData = {
        verb: obj.verb,
        actor: actorData,
        peopleList: obj.objects.data,
        connection_time: createGeneralDateFormat(actorData.rel_created_time),
      };
      tempBlockArray.push(peopleData);
    }
  });
  return tempBlockArray;
};

export const generateProfile = (obj) => {
  const tempBlockArray = [];
  let blockData = {};
  if (obj.data !== null) {
    let secondaryText;
    let secondaryTextLink;
    if (obj.data.current_campus !== undefined && obj.data.current_campus.data[0] !== undefined) {
      secondaryText = obj.data.current_campus.data[0].rel_value;
      secondaryTextLink = createEntityNavigationUrl(obj.data.current_campus.data[0].id,
obj.data.current_campus.data[0].type);
    } else {
      secondaryText = '';
      secondaryTextLink = '';
    }
    const pageUrl = createEntityNavigationUrl(obj.data.id, obj.data.type);
    blockData = {
      imageSource: (obj.data.display_picture ? obj.data.display_picture.image_100_100 : null),
      imageOnClickLink: pageUrl,
      primaryText: obj.data.name,
      primaryTextOnClickLink: pageUrl,
      secondaryText,
      secondaryTextOnClickLink: secondaryTextLink,
    };
  } else {
    const pageUrl = '#';
    blockData = {
      imageSource: '',
      imageOnClickLink: pageUrl,
      primaryText: '',
      primaryTextOnClickLink: '#',
      secondaryText: '',
      secondaryTextOnClickLink: '',

    };
  }
  tempBlockArray.push(blockData);
  return tempBlockArray;
};
