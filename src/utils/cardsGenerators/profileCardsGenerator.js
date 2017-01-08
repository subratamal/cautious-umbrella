import _ from 'underscore';
import { createEntityNavigationUrl } from '../createNavigationUrl';

export const generateProfileTeaserCards = function (teasers, mobileFlag) {
  const tempTeasersArray = [];
  _.each(teasers, (obj, index) => {
    const connectButtonData = {
      type: obj.type,
      entityId: obj.id,
      connectionId: obj.connectionId,
      connectionStatus: obj.connectionStatus,
      connectInProgress: obj.connectInProgress,
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
