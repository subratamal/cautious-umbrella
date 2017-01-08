import { createSelector } from 'reselect';

const getRecordIds = (state) => state.get('connectionRequestReducer').get('recordIds');
const getUnssenCount = (state) => state.get('connectionRequestReducer').get('unseenCount');
const getEntities = (state) => state.get('profileReducer').get('entities');
const connectionReqSelector = createSelector(
    [getEntities, getRecordIds, getUnssenCount], (records, recordIds, unseenCount) => {
      if (records && recordIds) {
        const recordsArray = [];
        recordIds.map((id) => {
          const record = records.get(id);
          if (record && record.toJS) {
            recordsArray.push(record.toJS());
          }
          return null;
        });
        const componentData = {
          recordsArray,
          unseenCount,
        };
        return componentData;
      }
      return null;
    }
  );

export default connectionReqSelector;
