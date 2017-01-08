import { Map,List, fromJS } from 'immutable';
import {universityPageConfig} from '../defaults'
import { each,isEmpty } from 'underscore'
import interactivityReducer from './interactivity_reducer'



function setUniversityStore (){
 let intitialState = new Map();
   each(universityPageConfig.pageComponents,function (value,key){
   var componentMap = new Map({
     'success' : false,
      data : null
   })
   intitialState = intitialState.set(value, componentMap);
   })
   var universityPageMap = new Map({
     successComponents : new List(),
     emptyComponents : new Map(),
     pageSuccess : false,
     pageError : false
   })
   intitialState = intitialState.set(universityPageConfig.parentComponent,universityPageMap);
   intitialState = intitialState.set('resultHeader',false);
   return intitialState;
}

function componentSuccess (state ,action){
  state = state.setIn([action.component,'data'], fromJS(action.data));
  state = state.setIn([action.component,'success'], true);
  // push success component into Parent component map
  let successList = state.getIn([universityPageConfig.parentComponent,'successComponents']);

  // if no data set empty state in parent prop for current component
  if(isEmpty(action.data)){
   state = state.setIn([universityPageConfig.parentComponent,'emptyComponents',action.component],true);
  }
  // if success then add it to success list in the parent
  if(!successList.includes(action.component)){
   successList = successList.push(action.component);
   state = state.setIn([universityPageConfig.parentComponent,'successComponents'],successList);
  }
  // if all the api calls are complete stop loading
  if(successList.size === universityPageConfig.totalComponents){
   state = state.setIn([universityPageConfig.parentComponent,'pageSuccess'],true)
  }
  return state;
}

function componentError (state ,action){
  state = state.setIn([universityPageConfig.parentComponent,'pageError'], true);
  return state;
}
// when user comes out of search active , reload pages to original records
function reloadDefaultPages(state,action) {
  let records = state.getIn([universityPageConfig.pageComponents.pages,'defaultPages']);
  state = state.setIn([universityPageConfig.pageComponents.pages,'reset'],false);
  state = state.setIn([universityPageConfig.pageComponents.pages,'data'],records)

  return state;
}
/*
  Reset the block card container before setting default object
  Issue - after university search reaults, on close of search form the default
  recommends were getting merged with the reselts
*/
function emptyContentBeforeReload (state,action){
  state = state.setIn([universityPageConfig.pageComponents.pages,'reset'],true);
  return  state
}

export default function(state = setUniversityStore(), action) {

 switch (action.type) {
  case 'SET_COMPONENT_STATE_SUCCESS' :
    return componentSuccess(state,action);
  case 'SET_COMPONENT_STATE_ERROR':
    return componentError(state, action)
  case 'SET_RESULT_HEADER':
    return state.set('resultHeader', action.status)
  case 'START_SEARCH_PROCESS_LOADER':
    return state.setIn([action.component,'loader'], true)
  case 'STOP_SEARCH_PROCESS_LOADER':
    return state.setIn([action.component,'loader'], false)
  case 'STORE_DEFAULT_PAGES':
    return state.setIn([universityPageConfig.pageComponents.pages,'defaultPages'], fromJS(action.data))
  case 'RELOAD_DEFAULT_PAGES':
    return reloadDefaultPages(state,action)
  case 'EMPTY_BEFORE_RELOAD':
    return emptyContentBeforeReload(state)
  case 'UNIVERSITYPAGE_INTERACTIVITY_ACTION' :    //pass current state and action to interactivity reducer
      return interactivityReducer(state,action)
  case 'SEARCH_TEXT_SYNC':
    return state.setIn([universityPageConfig.pageComponents.searchForm,'searchText'],action.text)
  case 'RESET_SEARCH_TEXT':
    return state.setIn([universityPageConfig.pageComponents.searchForm,'searchText'],'')
 }

 return state;
}
