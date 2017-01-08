import React from 'react';
import ReactDOM from 'react-dom';
import ReactAddonsTestUtils from 'react-addons-test-utils';
import {ApiButton} from '../../../src/components/elements/ApiButton';
import {expect} from 'chai';


const {scryRenderedDOMComponentsWithTag,scryRenderedDOMComponentsWithClass, Simulate}
  = ReactAddonsTestUtils;

//Creating a container to test the components
var container = document.createElement('div');

 describe('ApiButton', () => {
 	it('renders a Button', () => {
    const apiBtn = ReactDOM.render (<ApiButton />,container) ;
 		const buttons = scryRenderedDOMComponentsWithClass(apiBtn, 'ui button');
    expect(buttons.length).to.equal(1);
    ReactDOM.unmountComponentAtNode(container);
 	});

  it('renders a Button with provided class', () => {
    const apiBtn = ReactDOM.render (<ApiButton buttonClass="fluid" />,container) ;
    const buttons = scryRenderedDOMComponentsWithClass(apiBtn, 'ui button fluid');
    expect(buttons.length).to.equal(1);
    ReactDOM.unmountComponentAtNode(container);
  });

  it('renders a Button with provided text', () => {
    const apiBtn = ReactDOM.render (<ApiButton buttonText="Submit" />,container) ;
    const buttons = scryRenderedDOMComponentsWithClass(apiBtn, 'ui button');
    expect(buttons.length).to.equal(1);
    expect(buttons[0].textContent).to.be.equal("Submit")
    ReactDOM.unmountComponentAtNode(container);
  });

  it('renders an icon for the button when iconClass is provided', () => {
    const apiBtn = ReactDOM.render (<ApiButton iconClass="icon" />,container) ;
    const icons = scryRenderedDOMComponentsWithTag(apiBtn, 'i');
    expect(icons.length).to.equal(1);
    ReactDOM.unmountComponentAtNode(container);
  });

  it('calls process action on click', () => {
    let flag = false;
    const processAction = () => flag = true;
    const apiBtn = ReactDOM.render (<ApiButton onClickFunction={processAction} />,container) ;
    const buttons = scryRenderedDOMComponentsWithTag(apiBtn, 'button');
    expect(buttons.length).to.equal(1);
    Simulate.click(buttons[0]);
    expect(flag).to.be.true
    ReactDOM.unmountComponentAtNode(container);
  });


 })
