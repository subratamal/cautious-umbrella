import { createSelector } from 'reselect';

const getRecordIds = (state, props) => state.get('opportunityReducer').get('meta').get(props.metaPropName);
const getEntities = (state, props) => state.get('opportunityReducer').get('entities');
export const makeSideBarListsSelector = () => createSelector(
   [getEntities, getRecordIds], (records, recordIds) => {
     if (records && recordIds) {
       const componentData = [];
       recordIds.map((id) => {
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
