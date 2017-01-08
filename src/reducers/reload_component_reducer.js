import { Map, fromJS,List  } from 'immutable'
import {discoverPageConfig} from '../defaults'
import { each,isEmpty } from 'underscore'
import interactivityReducer from './interactivity_reducer'



export default function(state , action) {

  state = state.setIn([action.componentName,'data'],new List());
  let successList = state.getIn([action.parentComponent,'successComponents']);
  let index = successList.indexOf(action.componentName);
  if(index !== -1){
    successList = successList.delete(index);
  }
  state = state.setIn([action.parentComponent,'successComponents'],successList);
  state = state.setIn([action.parentComponent,'pageSuccess'],false);
  return state;
}
