import _ from 'underscore';
import { createEntityNavigationUrl } from '../../utils/createNavigationUrl';

export const generateListProps = function (entity, mobileFlag) {
  const entityTeasersArray = [];
  _.each(entity, (obj, index) => {
    let url = 'javascript:;';
    if (obj.type !== 'city') {
      url = createEntityNavigationUrl(obj.id, obj.type);
    }
    const entityData = {
      primaryText: obj.name,
      url,
      isWrapped: mobileFlag,
    };
    entityTeasersArray.push(entityData);
  });
  return entityTeasersArray;
};
