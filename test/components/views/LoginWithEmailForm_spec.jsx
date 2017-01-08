import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { expect } from 'chai';
import {loginFormTestValues} from '../../test_constants'

import {
  scryRenderedDOMComponentsWithClass as WithClass,
  scryRenderedComponentsWithType as WithType,
  scryRenderedDOMComponentsWithTag as WithTag,
  Simulate,
  renderIntoDocument as render
} from 'react-addons-test-utils';

import {store} from '../../testStore_creator';

import LoginWithEmailForm from '../../../src/components/views/LoginForm';

/*
  1. Should render inputs for email and password
  2. Should render Buttons for login and register
*/

const container = document.createElement('div');


afterEach(()=> {
  ReactDOM.unmountComponentAtNode(container)
})

describe("Login with email form", () => {
/*

	it('should render an input field for email and password', () => {
 		const login_form  = render(
      <Provider store={store}>
        <LoginWithEmailForm />
      </Provider>
 		)

 		const inputs = WithClass(login_form, 'input');
    expect(inputs.length).to.equal(2);
 	});

  it('should login and register buttons', () => {
    const login_form  = render(
      <Provider store={store}>
        <LoginWithEmailForm />
      </Provider>
    )

    const buttons = WithClass(login_form, 'fluid red');
    expect(buttons.length).to.equal(2);
  });

  it('validate Username required validation rule',() => {
    const login_form  = render(
      <Provider store={store}>
        <LoginWithEmailForm />
      </Provider>
    )

    const usernameInput = WithTag(login_form,'input')[0];
    usernameInput.value = "Te"
    Simulate.blur(usernameInput);
    var ErrorLabels  = WithClass(login_form,'ui auth-form error message');
    expect(ErrorLabels.length).to.be.equal(1);
    expect(ErrorLabels[0].textContent).to.be.equal('Invalid email address')
  })

  it('validate Password required validation rule',() => {
    const login_form  = render(
      <Provider store={store}>
        <LoginWithEmailForm />
      </Provider>
    )

    const passwordInput = WithTag(login_form,'input')[0];
    Simulate.blur(passwordInput);
    var ErrorLabels  = WithClass(login_form,'ui auth-form error message');
    expect(ErrorLabels.length).to.be.equal(1);
    expect(ErrorLabels[0].textContent).to.be.equal('Invalid email address')
  })

  it('test Username email validation success',() => {
    var validationSuccessform  = render (
       <Provider store = {store}>
        <LoginWithEmailForm  />
      </Provider>
    );

    const usernameInput = WithTag(validationSuccessform,'input')[0]
    usernameInput.value = loginFormTestValues.usernameEmailSuccess
    Simulate.blur(usernameInput)
    var ErrorLabels  = WithClass(validationSuccessform,'ui auth-form error message');
    expect(ErrorLabels.length).to.be.equal(0);
  })

  it('test Password length validation failure',() => {
    var form  = render (
       <Provider store = {store}>
        <LoginWithEmailForm  />
      </Provider>
    );
    const passwordInput = WithTag(form,'input')[1];
    passwordInput.value = loginFormTestValues.passwordLengthFailure;
    Simulate.blur(passwordInput);
    var ErrorLabels  = WithClass(form,'ui auth-form error message');
    expect(ErrorLabels.length).to.be.equal(1);
    expect(ErrorLabels[0].textContent).to.be.equal('Password must contain atleast 6 letters');
  });

  it('test Password length validation success',() => {
    var form  = render (
       <Provider store = {store}>
        <LoginWithEmailForm  />
      </Provider>
    );
    const passwordInput = WithTag(form,'input')[1];
    passwordInput.value = loginFormTestValues.passwordLengthSuccess;
    Simulate.blur(passwordInput);
    var ErrorLabels  = WithClass(form,'ui auth-form error message');
    expect(ErrorLabels.length).to.be.equal(0);
  })
*/

})
