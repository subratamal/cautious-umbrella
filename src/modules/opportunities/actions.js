import fireBaseApi from '../../firebaseAPI/api';
import { checkLoggedIn } from '../../actions/checkLoggedIn';
import api from '../../api/api';
import { idGenerator } from './utils';
import { ADD_OPPORTUNITY_RECORDS_WITH_META_DATA,
        SET_INTERACTIVITY_STATE,
        ADD_OPPORTUNITY_VIEWPAGE_OPPORTUNITY_RECORDS,
        ADD_OPPORTUNITY_LANDINGPAGE_RELATIONAL_ENTITY,
        SET_OPPORTUNITYVIEW_SHARE_DATA,
       } from './actionTypes';
import { ADD_VIEWPAGE_PAGE_RECORDS, ADD_PAGE_RECORDS_WITH_META_DATA } from '../pages/actionTypes';
import { viewPageConfig } from '../../defaults';


export function fetchOpportunitiesViewData({ params, query, locale }) {
  const requestId = params.opportunityId;
  return dispatch =>
      fireBaseApi.getOpportunitiesViewData(requestId).then((result) => {
        dispatch({ type: ADD_OPPORTUNITY_VIEWPAGE_OPPORTUNITY_RECORDS, records: [result.data], recordIdsArray: [result.data.id], components: viewPageConfig.opportunityViewPage.opportunityComponents });
        dispatch({ type: ADD_VIEWPAGE_PAGE_RECORDS, records: [result.data.author], recordIdsArray: [result.data.author.id], components: viewPageConfig.opportunityViewPage.pageComponents });
        const opportunitiesArray = [];
        result.data.similarOpportunities.forEach(object => opportunitiesArray.push(object.id));
        dispatch({ type: ADD_OPPORTUNITY_RECORDS_WITH_META_DATA, records: result.data.similarOpportunities, recordIdsArray: opportunitiesArray, metaPropName: 'opportunityViewPageSideBarSimilarOpportunities' });
      }).catch((err) => {
        console.log(err);
      });
}

export function save(type, id) {
  return dispatch => {
    if (checkLoggedIn(true)) {
      dispatch({ type: SET_INTERACTIVITY_STATE, id, interactivityKey: 'saved', data: true });
      const opportunityId = id;
      return api.postInteractivitySave(type, opportunityId).then((result) => {
        dispatch({ type: SET_INTERACTIVITY_STATE, id, interactivityKey: 'saved', data: result.data.rel_id });
        fireBaseApi.updateFireBaseInteractivitySave(result.data, opportunityId, 'SAVE');
      }).catch((err) => {
        throw (err);
      });
    }
    return null;
  };
}

export function removeSave(type, entityId, saveId) {
  return dispatch => {
    const uuid = checkLoggedIn(false);
    if (uuid) {
      dispatch({ type: SET_INTERACTIVITY_STATE, id: entityId, interactivityKey: 'saved', data: false });
      return api.deleteSavesFlag(type, entityId, saveId).then((result) => {
        fireBaseApi.updateFireBaseInteractivitySave(uuid, entityId, 'DELETE');
      }).catch((err) => {
        console.log(err);
      });
    }
    return null;
  };
}

export function apply(opportunityId) {
  return dispatch => {
    const uuid = checkLoggedIn(true);
    if (uuid) {
      dispatch({ type: SET_INTERACTIVITY_STATE, id: opportunityId, interactivityKey: 'applied', data: true });
      return api.applyForOpportunity(opportunityId).then((result) => {
        dispatch({ type: SET_INTERACTIVITY_STATE, id: opportunityId, interactivityKey: 'applied', data: result.data.rel_id });
        fireBaseApi.updateFireBaseApply(result.data, opportunityId, 'APPLY');
      }).catch((err) => {
        console.log(err);
      });
    }
    return {};
  };
}

export function unApply(opportunityId, relId) {
  return dispatch => {
    const uuid = checkLoggedIn(false);
    if (uuid) {
      dispatch({ type: SET_INTERACTIVITY_STATE, id: opportunityId, interactivityKey: 'applied', data: false });
      return api.cancelOpportunityApplication(opportunityId, relId).then(() => {
        fireBaseApi.updateFireBaseApply(uuid, opportunityId, 'DELETE');
      }).catch((err) => {
        console.log(err);
      });
    }
    return {};
  };
}

export function fetchWeeklyOpportunities() {
  return dispatch => fireBaseApi.getWeeklyOpportunities().then((result) => {
    const opportunitiesArray = [];
    result.forEach(object => opportunitiesArray.push(object.id));
    dispatch({ type: ADD_OPPORTUNITY_RECORDS_WITH_META_DATA, records: result, recordIdsArray: opportunitiesArray, metaPropName: 'opportunitiesPageWeeklyOpportunities' });
  }).catch((err) => {
    console.log(err);
  });
}

export function fetchScholarships() {
  return dispatch => fireBaseApi.getOpportunitiesScholarships().then((result) => {
    const opportunitiesArray = [];
    result.forEach(object => opportunitiesArray.push(object.id));
    dispatch({ type: ADD_OPPORTUNITY_RECORDS_WITH_META_DATA, records: result, recordIdsArray: opportunitiesArray, metaPropName: 'opportunitiesPageScholarships' });
  }).catch((err) => {
    console.log(err);
  });
}

export function fetchSideBarSkills() {
  return dispatch => fireBaseApi.getOpportunitiesSideBarSkills().then((result) => {
    const idsArray = [];
    result.forEach(object => idsArray.push(object.id));
    dispatch({ type: ADD_OPPORTUNITY_LANDINGPAGE_RELATIONAL_ENTITY, records: result, recordIdsArray: idsArray, metaPropName: 'opportunitiesPageSideBarSkills' });
  }).catch((err) => {
    console.log(err);
  });
}

export function fetchSideBarWorkAreas() {
  return dispatch => fireBaseApi.getOpportunitiesSideBarWorkAreas().then((result) => {
    const idsArray = [];
    result.forEach(object => idsArray.push(object.id));
    dispatch({ type: ADD_OPPORTUNITY_LANDINGPAGE_RELATIONAL_ENTITY, records: result, recordIdsArray: idsArray, metaPropName: 'opportunitiesPageSideBarWorkAreas' });
  }).catch((err) => {
    console.log(err);
  });
}

export function fetchSideBarLocations() {
  return dispatch => fireBaseApi.getOpportunitiesSideBarLocations().then((result) => {
    const relationalEntitiesArray = [];
    const idsArray = [];
    result.map(city => {
      const id = idGenerator();
      relationalEntitiesArray.push({ id, name: city, type: 'city' });
      idsArray.push(id);
      return null;
    });
    dispatch({ type: ADD_OPPORTUNITY_LANDINGPAGE_RELATIONAL_ENTITY, records: relationalEntitiesArray, recordIdsArray: idsArray, metaPropName: 'opportunitiesPageSideBarLocations' });
  }).catch((err) => {
    console.log(err);
  });
}

export function fetchPages() {
  return dispatch => fireBaseApi.getOpportunitiesSideBarPages().then((result) => {
    const idsArray = [];
    result.forEach(object => idsArray.push(object.id));
    dispatch({ type: ADD_PAGE_RECORDS_WITH_META_DATA, records: result, recordIdsArray: idsArray, metaPropName: 'opportunitiesPageSideBarPages' });
  }).catch((err) => {
    console.log(err);
  });
}

export function fetchCollaboration() {
  return dispatch => fireBaseApi.getOpportunitiesCollaborations().then((result) => {
    const opportunitiesArray = [];
    result.forEach(object => opportunitiesArray.push(object.id));
    dispatch({ type: ADD_OPPORTUNITY_RECORDS_WITH_META_DATA, records: result, recordIdsArray: opportunitiesArray, metaPropName: 'opportunitiesPageCollaboration' });
  }).catch((err) => {
    console.log(err);
  });
}

export function fetchCampusAmbassador() {
  return dispatch => fireBaseApi.getOpportunitiesCampusAmbassador().then((result) => {
    const opportunitiesArray = [];
    result.forEach(object => opportunitiesArray.push(object.id));
    dispatch({ type: ADD_OPPORTUNITY_RECORDS_WITH_META_DATA, records: result, recordIdsArray: opportunitiesArray, metaPropName: 'opportunitiesPageCampusAmbassador' });
  }).catch((err) => {
    console.log(err);
  });
}

export function fetchFellowships() {
  return dispatch => fireBaseApi.getOpportunitiesFellowships().then((result) => {
    const opportunitiesArray = [];
    result.forEach(object => opportunitiesArray.push(object.id));
    dispatch({ type: ADD_OPPORTUNITY_RECORDS_WITH_META_DATA, records: result, recordIdsArray: opportunitiesArray, metaPropName: 'opportunitiesPageFellowships' });
  }).catch((err) => {
    console.log(err);
  });
}

export function fetchPartTimeFreelance() {
  return dispatch => fireBaseApi.getOpportunitiesPartTimeFreelance().then((result) => {
    const opportunitiesArray = [];
    result.forEach(object => opportunitiesArray.push(object.id));
    dispatch({ type: ADD_OPPORTUNITY_RECORDS_WITH_META_DATA, records: result, recordIdsArray: opportunitiesArray, metaPropName: 'opportunitiesPagePartTimeFreelance' });
  }).catch((err) => {
    console.log(err);
  });
}

export function fetchFullTime() {
  return dispatch => fireBaseApi.getOpportunitiesFullTime().then((result) => {
    const opportunitiesArray = [];
    result.forEach(object => opportunitiesArray.push(object.id));
    dispatch({ type: ADD_OPPORTUNITY_RECORDS_WITH_META_DATA, records: result, recordIdsArray: opportunitiesArray, metaPropName: 'opportunitiesPageFullTime' });
  }).catch((err) => {
    console.log(err);
  });
}

export function fetchInternships() {
  return dispatch => fireBaseApi.getOpportunitiesInternship().then((result) => {
    const opportunitiesArray = [];
    result.forEach(object => opportunitiesArray.push(object.id));
    dispatch({ type: ADD_OPPORTUNITY_RECORDS_WITH_META_DATA, records: result, recordIdsArray: opportunitiesArray, metaPropName: 'opportunitiesPageInternships' });
  }).catch((err) => {
    console.log(err);
  });
}

export function setFeedShareData(data) {
  return {
    type: SET_OPPORTUNITYVIEW_SHARE_DATA,
    data,
  };
}
