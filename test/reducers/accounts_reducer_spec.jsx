import { Map, fromJS, toJS } from 'immutable'
import { expect } from 'chai'

import account_reducer from '../../src/reducers/account_reducer'

const intitialState = fromJS(Object.assign({
  data: null,
  verification: {
    isVerified : true,
    isRequestingForVerification: false,
    isVerifyingWith : null,
    verifiedWith:null
  },
  isRequestingForAccountUpdate: false,
  incompleteFields : null
}))

describe('Accounts reducer', () => {
  it('handles update request', ()=> {
    const action = function () {
      return {
        'type': 'IS REQUESTING FOR ACCOUNT UPDATE'
      }
    }
    let nextState = account_reducer(intitialState, action())
    nextState = nextState.toJS()
    expect(nextState.isRequestingForAccountUpdate).to.equal(true)
  })

 it('prompts the user to verify his/her email', () => {
   const action = function () {
     return {
       'type': 'ACCOUNT NOT VERIFIED',
       'fields': ['email']
     }
   }

   let nextState = account_reducer(intitialState, action())
   let nS = nextState.toJS()
   let isVerifyingWith = nS.verification.isVerifyingWith
   expect(isVerifyingWith).to.equal("email")

 })

 it('prompts the user to verify his/her phone number', () => {
   const action = function () {
     return {
       'type': 'ACCOUNT NOT VERIFIED',
       'fields': ['phone']
     }
   }

   let nextState = account_reducer(intitialState, action())
   let nS = nextState.toJS()
   let isVerifyingWith = nS.verification.isVerifyingWith
   expect(isVerifyingWith).to.equal("phone")

 })

 it('syncs the user account data', () => {
   const user_test_account = {
     'id' : 1234
   }

   const action = function () {
     return {
       'type': 'SYNC ACCOUNT DATA',
       'account': user_test_account
     }
   }

   let nextState = account_reducer(intitialState, action())
   let nS = nextState.toJS()
   let account_data = nS.data
   expect(account_data).to.include.keys("id")

 })

})
