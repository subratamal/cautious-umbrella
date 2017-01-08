import { createSelector } from 'reselect';

const getSliderMap = (state, props) => state.get('sliderReducer').get(props.sliderEntityType);
const getState = (state) => state;

const makeSliderRecordsSelectors = () => createSelector(
    [getSliderMap, getState], (sliderMap, state) => {
      const componentData = [];
      if (sliderMap && state) {
        sliderMap.forEach((item) => {
          const entitySlidesObject = {};
          const type = item.get('type');
          const recordIds = item.get('entityIds');
          if (state.get(`${type}Reducer`)) {
            const records = state.get(`${type}Reducer`).get('entities');
            entitySlidesObject.type = type;
            entitySlidesObject.records = [];
            recordIds.map((id) => {
              const record = records.get(id);
              if (record && record.toJS) {
                entitySlidesObject.records.push(record.toJS());
              }
              return null;
            });
            componentData.push(entitySlidesObject);
          }
        });
        return componentData;
      }
      return null;
    }
  );

export default makeSliderRecordsSelectors;
