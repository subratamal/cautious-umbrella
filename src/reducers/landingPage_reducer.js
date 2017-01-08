import { Map, fromJS,List  } from 'immutable'
import {landingPageConfig} from '../defaults'
import { each,isEmpty } from 'underscore'
import interactivityReducer from './interactivity_reducer'
import reloadComponentReducer from './reload_component_reducer'


function setLandingStore (){
  let intitialState = new Map();
    each(landingPageConfig.pageComponents,function (value,key){
    var componentMap = new Map({
      'success' : false,
      'error' : null,
      data : null
    })
    intitialState = intitialState.set(value, componentMap);
    })
    var landingPageMap = new Map({
      successComponents : new List(),
      emptyComponents : new Map(),
      pageSuccess : false,
      pageError : false
    })
    intitialState = intitialState.set(landingPageConfig.parentComponent,landingPageMap);
    return intitialState;
}

function componentSuccess (state ,action){
   state = state.setIn([action.component,'data'], fromJS(action.data));
   state = state.setIn([action.component,'success'], true);
   // push success component into Parent component map
   let successList = state.getIn([landingPageConfig.parentComponent,'successComponents']);
   // if no data set empty state in parent prop for current component
   if(isEmpty(action.data)){
    state = state.setIn([landingPageConfig.parentComponent,'emptyComponents',action.component],true);
   }
   if(!successList.includes(action.component)){
    successList = successList.push(action.component);
    state = state.setIn([landingPageConfig.parentComponent,'successComponents'],successList);
   }
   if(successList.size === landingPageConfig.totalComponents){
    state = state.setIn([landingPageConfig.parentComponent,'pageSuccess'],true)
   }
   return state;
}

function componentError (state ,action){
   state = state.setIn([landingPageConfig.parentComponent,'pageError'], true);
   return state;
}

export default function(state = setLandingStore(), action) {
  switch (action.type) {
    case 'LANDINGPAGE_SET_COMPONENT_STATE_SUCCESS' :
    	return componentSuccess(state,action);
    case 'LANDINGPAGE_SET_COMPONENT_STATE_ERROR':
      return componentError(state,action)

    case 'LANDINGPAGE_INTERACTIVITY_ACTION' : //pass current state and action to interactivity reducer
      return interactivityReducer(state,action)
    case 'LANDINGPAGE_RELOAD_COMPONENT' :    //reloading after login state change
      return reloadComponentReducer(state,action)
  }
  return state;
}
