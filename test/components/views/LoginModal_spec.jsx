import React from 'react';
import {Provider} from 'react-redux';
import { expect } from 'chai';

import {
  scryRenderedComponentsWithType as WithType,
  scryRenderedDOMComponentsWithClass as WithClass,
  renderIntoDocument as render
} from 'react-addons-test-utils';


import {store} from '../../testStore_creator';

import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

import { LoginModal } from '../../../src/components/views/LoginModal';
import LoginWithEmailForm from '../../../src/components/views/LoginForm';
/*
  1. Should render Facebook and GooglePlus login components
  2. Should render Login with email component
  3. Should have a login and create new account buttons
*/

describe("User login and sigup modal", () => {
  /*
	it('should render facebook login component', () => {
 		const login_modal  = render(
      <Provider store={store}>
        <LoginModal />
      </Provider>
 		)

 		const facebook_component = WithType(login_modal, FacebookLogin);
    expect(facebook_component.length).to.equal(1);
 	});

  it('should render google plus login component', () => {
    const login_modal  = render(
      <Provider store={store}>
        <LoginModal />
      </Provider>
    )

    const googleplus_component = WithType(login_modal, GoogleLogin);
    expect(googleplus_component.length).to.equal(1);
  });

 	it('should render login with email component', () => {
 		const login_modal  = render(
      <Provider store={store}>
        <LoginModal />
      </Provider>
 		)
 		const login_with_email_component = WithType(login_modal, LoginWithEmailForm);
    expect(login_with_email_component.length).to.equal(1)
 	});*/
})
