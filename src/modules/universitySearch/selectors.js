import { createSelector } from 'reselect';

const getRecordIds = (state) => state.get('universitySearchReducer').get('entityIds');
const getEntities = (state) => state.get('pageReducer').get('entities');
const getDefaultEntityIds = (state) => state.get('pageReducer').get('meta').get('universityPagePrimaryContentPages');
export const getSearchLoader = createSelector(
    (state) => state.get('universitySearchReducer').get('searchLoader'), (loader) => loader
);
const getSearchQuerryExecutedFlag = (state) => state.get('universitySearchReducer').get('searchQueryExecuted');

export const makeGetSearchRecordsSelectors = () => createSelector(
    [getEntities, getRecordIds, getSearchQuerryExecutedFlag, getDefaultEntityIds],
    (records, recordIds, searchQueryExecuted, defaultIds) => {
      let instanceRecordIds = recordIds;
      if (!searchQueryExecuted) {
        instanceRecordIds = defaultIds;
      }
      if (records && instanceRecordIds) {
        const componentData = [];
        instanceRecordIds.map((id) => {
          const record = records.get(id);
          if (record && record.toJS) {
            componentData.push(record.toJS());
          }
          return null;
        });
        return componentData;
      }
      return null;
    }
  );
