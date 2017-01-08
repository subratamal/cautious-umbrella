import { each } from 'underscore';
import fireBaseApi from '../../firebaseAPI/api';
import { ADD_OPPORTUNITIES_SLIDER_DATA_MAP, ADD_UNIVERSITY_SLIDER_DATA_MAP } from './actionTypes';
import { actionTypes as pageActionTypes } from '../pages';
import { actionTypes as opportunitiesActionTypes } from '../opportunities';


function createSliderDataMap(sliderDataArray) {
  const sliderDataMap = [];
  let sliderEnityMap = {};
  each(sliderDataArray, (sliderData) => {
    sliderEnityMap = {};
    sliderEnityMap.type = sliderData.cardType;
    sliderEnityMap.entityIds = [];
    sliderData.data.map((record) => sliderEnityMap.entityIds.push(record.id));
    sliderDataMap.push(sliderEnityMap);
  });
  return sliderDataMap;
}

export function fetchUniversityPrimarySliderContent() {
  return dispatch => fireBaseApi.getUniversityPrimarySliderPages().then((result) => {
    if (result && result[0] && result[0].data) {
      result[0].data.reverse();
    }
    const sliderDataMap = createSliderDataMap(result);
    dispatch({ type: ADD_UNIVERSITY_SLIDER_DATA_MAP, sliderDataMap });
    dispatch({ type: pageActionTypes.ADD_PAGE_RECORDS_WITHOUT_META_DATA, records: result[0].data });
  }).catch((err) => {
    console.log(err);
  });
}

export function fetchOpportunitiesPrimarySliderContent() {
  return dispatch => fireBaseApi.getOpportunitiesPrimarySliderPages().then((result) => {
    const sliderDataMap = createSliderDataMap(result);
    dispatch({ type: ADD_OPPORTUNITIES_SLIDER_DATA_MAP, sliderDataMap });
    dispatch({ type: opportunitiesActionTypes.ADD_OPPORTUNITY_RECORDS_WITHOUT_META_DATA, records: result[0].data });
  }).catch((err) => {
      // dispatch(setErrorState(err, opportunitiesPageConfig.pageComponents.primarySlider));
    console.log(err);
  });
}
