import _ from 'underscore';
import { createEntityNavigationUrl } from '../../utils/createNavigationUrl';
import createLocationString from '../../utils/createLocationString';
import { blockCardCoverImage } from '../../defaults';


export const generatePageBlockCardsProps = function (pages) {
  const tempBlockArray = [];
  _.each(pages, (obj) => {
    const pageUrl = createEntityNavigationUrl(obj.id, obj.type);
    const location = createLocationString(obj.location);
    const followButtonData = {
      type: obj.type,
      entityId: obj.id,
      relationId: obj.following,
      followInProgress: obj.followInProgress,
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

export const generatePageTeaserCards = function (pages) {
  const tempBlockArray = [];
  _.each(pages, (obj) => {
    const pageUrl = createEntityNavigationUrl(obj.id, obj.type);
    const location = createLocationString(obj.location);
    const followButtonData = {
      type: obj.type,
      entityId: obj.id,
      relationId: obj.following,
      followInProgress: obj.followInProgress,
    };
    const blockData = {
      imageOnClickLink: pageUrl,
      imageSource: obj.display_picture ? obj.display_picture.image_100_100 : null,
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


export const generatePageFeaturedCardsProps = (pages) => {
  const tempBlockArray = [];
  _.each(pages, (obj) => {
    const pageUrl = createEntityNavigationUrl(obj.id, obj.type);
    const location = createLocationString(obj.location);
    const followButtonData = {
      type: obj.type,
      entityId: obj.id,
      relationId: obj.following,
      followInProgress: obj.followInProgress,
    };
    const blockData = {
      imageOnClickLink: pageUrl,
      imageSource: obj.cover_picture ? obj.cover_picture.cdin_responsive_cover_image_full__style720 : blockCardCoverImage,
      imageMobileSource: obj.cover_picture ? obj.cover_picture.cover_explore : null,
      primaryTextOnClickLink: pageUrl,
      primaryText: obj.title,
      secondaryImageSource: obj.display_picture ? obj.display_picture.image_100_100 : null,
      secondaryText: location,
      secondaryTextOnClickLink: pageUrl,
      followButtonData,
    };
    tempBlockArray.push({
      pages: blockData,
    });
  });
  return tempBlockArray;
};
