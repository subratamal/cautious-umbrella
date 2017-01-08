import { Map, fromJS, toJS } from 'immutable'
import { expect } from 'chai'

import profile_reducer from '../../src/reducers/profile_reducer'

const intitialState = fromJS(Object.assign({
  data: null,
  incompleteFields : null,
  isDisabled : false,
  isComplete : true,
  isRequestingForProfileUpdate : false
}))

describe('Profile reducer', () => {
  it('handles update request', ()=> {
    const action = function () {
      return {
        'type': 'IS REQUESTING FOR PROFILE UPDATE'
      }
    }
    let nextState = profile_reducer(intitialState, action())
    nextState = nextState.toJS()
    expect(nextState.isRequestingForProfileUpdate).to.equal(true)
  })

 it('prompts the user to update his name', () => {
   const action = function () {
     return {
       'type': 'PROFILE INCOMPLETE',
       'fields': ['name']
     }
   }

   let nextState = profile_reducer(intitialState, action())
   let nS = nextState.toJS()
   let incompleteFields = nS.incompleteFields
   expect(incompleteFields).to.include("name")

 })

 it('syncs the user profile data', () => {
   const user_test_profile = {
     'id' : 1234
   }

   const action = function () {
     return {
       'type': 'SYNC PROFILE DATA',
       'profile': user_test_profile
     }
   }

   let nextState = profile_reducer(intitialState, action())
   let nS = nextState.toJS()
   let account_data = nS.data
   expect(account_data).to.include.keys("id")

 })

})
