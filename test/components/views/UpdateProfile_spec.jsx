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
import { LoginModal } from '../../../src/components/views/LoginModal'
import LoginForm from '../../../src/components/views/LoginForm'

import UpdateProfile from '../../../src/components/views/UpdateProfile'

const MOUNT_POINT = document.createElement('div');


afterEach(()=> {
  ReactDOM.unmountComponentAtNode(MOUNT_POINT)
})

describe('Update Profile Component', () => {
  /*it('should prompt the user to fill the name if his profile doesn\'t have name', ()=> {

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

 })

 it('should allow the user to re-enter the email', ()=> {

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
  expect(updateProfile.length).to.equal(1)

  store.dispatch({
    type: "LOGOUT"
  })

  let loginForm_Component = WithType(component, LoginForm)
  expect(loginForm_Component.length).to.equal(1)

})
*/
})
