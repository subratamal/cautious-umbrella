import { fromJS, toJS  } from 'immutable'
import { contains, filter, without } from 'underscore'
import {
  IS_REQUESTING_FOR_PROFILE_UPDATE,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAILED,
  PROFILE_INCOMPLETE,
  SYNC_PROFILE_DATA
} from '../constants/actions'

const intitialState = fromJS(Object.assign({
  data: null,
  incompleteFields : null,
  isDisabled : false,
  isComplete : true,
  isRequestingForProfileUpdate : false
}))

function profileIncomplete(state, action) {
  let currentState = state.toJS()
  currentState.isComplete = false
  currentState.incompleteFields = action.fields
  return state.merge(fromJS(currentState))
}

function updateSuccess(state, action) {
  let currentState = state.toJS()
  const updatedFields = action.fields
  
  let newFields = filter(currentState.incompleteFields, function (field) {
    return !contains(currentState.incompleteFields, field)
  })
  currentState.incompleteFields = newFields

  /* If no incomplete fields mark account as complete */
  if(currentState.incompleteFields.length){
      currentState.isComplete = false
  }else {
    currentState.isComplete = true
  }

  /* Stop requesting as request successed */
  if(currentState.isRequestingForProfileUpdate) {
    currentState.isRequestingForProfileUpdate = false
  }
  return state.merge(fromJS(currentState))
}


function updateFailed(state, action) {
  let currentState = state.toJS()
  if(currentState.isRequestingForProfileUpdate) {
    currentState.isRequestingForProfileUpdate = false
  }
  return state.merge(fromJS(currentState))
}

export default function (state = intitialState, action) {
  switch (action.type) {
    case IS_REQUESTING_FOR_PROFILE_UPDATE:
      return state.set('isRequestingForProfileUpdate', true)
      break
    case PROFILE_INCOMPLETE:
      return profileIncomplete(state, action)
      break;
    case PROFILE_UPDATE_SUCCESS:
      return updateSuccess(state, action)
      break
    case PROFILE_UPDATE_FAILED:
      return updateFailed(state, action)
      break
    case SYNC_PROFILE_DATA:
      return state.set("data", action.profile)
      break
    default:
    return state
  }
}
