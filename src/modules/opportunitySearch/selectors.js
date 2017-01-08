import { createSelector } from 'reselect';

const getRecordIds = (state) => state.get('opportunitySearchReducer').get('entityIds');
const getEntities = (state) => state.get('opportunityReducer').get('entities');
const getDefaultEntityIds = (state) => state.get('opportunityReducer').get('meta').get('opportunityPagePrimaryContentPages');
export const getSearchLoader = createSelector(
    (state) => state.get('opportunitySearchReducer').get('searchLoader'), (loader) => loader
);
const getSearchQuerryExecutedFlag = (state) => state.get('opportunitySearchReducer').get('searchQueryExecuted');

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
