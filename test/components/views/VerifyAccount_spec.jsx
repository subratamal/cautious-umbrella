import React from 'react';
import { toJS } from 'immutable'
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { expect } from 'chai';
import {
  scryRenderedComponentsWithType as WithType,
  scryRenderedDOMComponentsWithClass as WithClass,
  renderIntoDocument as render
} from 'react-addons-test-utils';
import {store} from '../../testStore_creator';
import {LoginModal} from '../../../src/components/views/LoginModal'
import UpdateProfile from '../../../src/components/views/UpdateProfile'
import VerifyAccount from '../../../src/components/views/VerifyAccount'

const MOUNT_POINT = document.createElement('div');


afterEach(()=> {
  ReactDOM.unmountComponentAtNode(MOUNT_POINT)
})

describe('verify account component', () => {
  /*
  it('should prompt the user to fill the name if his profile doesn\'t have name', ()=> {

    //===============================================================
    //  Tell the store that user doesn't have name in his/her profile
    //===============================================================
    store.dispatch({
      type: "PROFILE INCOMPLETE",
      fields: ["name"]
    })

    store.dispatch({
      type: "HOLD REDIRECT",
      status: true
    })

    store.dispatch({
      type: "LOGIN SUCCESS"
    })

    const component  = ReactDOM.render (
     <Provider store = {store}>
       <LoginModal />
     </Provider>, MOUNT_POINT
   );

   // We have only one input field to pass the name.

   let updateProfile = WithType(component, UpdateProfile)
   expect(updateProfile.length).to.equal(1);

 });

 it('should prompt the user to verify his account email or phone number', ()=> {
   let fields = ['phone', 'email']

   //==========================================================
   //  Tell the store that user is not verified his account in
   //==========================================================

  store.dispatch({
    type: "PROFILE UPDATE SUCCESS",
    fields : ["name"]
  })

   store.dispatch({
     type: "ACCOUNT NOT VERIFIED",
     fields : ["email"]
   })

   store.dispatch({
     type: "HOLD REDIRECT",
     status: true
   })

   store.dispatch({
     type: "LOGIN SUCCESS"
   })
   
   const component  = ReactDOM.render (
    <Provider store = {store}>
      <LoginModal/>
    </Provider>, MOUNT_POINT
  );

  let VerifyAccount_Comp = WithType(component, VerifyAccount)
  expect(VerifyAccount_Comp.length).to.equal(1);

  })*/

})
