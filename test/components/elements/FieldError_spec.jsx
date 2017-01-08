import React from 'react';
import ReactDOM from 'react-dom';
import ReactAddonsTestUtils from 'react-addons-test-utils';
import {FieldError} from '../../../src/components/elements/FieldError';
import {expect} from 'chai';


const {scryRenderedDOMComponentsWithTag,scryRenderedDOMComponentsWithClass, Simulate}
  = ReactAddonsTestUtils;

//Creating a container to test the components
var container = document.createElement('div');

 describe('FieldError', () => {
 	it('renders a Label', () => {
	    const apiBtn = ReactDOM.render (<FieldError />,container) ;
	 	const labels = scryRenderedDOMComponentsWithClass(apiBtn, 'ui auth-form error message');
	    expect(labels.length).to.equal(1);
	    ReactDOM.unmountComponentAtNode(container);
	});

	it('renders a Label with provided text', () => {
		var errMsg = "Label Text"
	    const apiBtn = ReactDOM.render (<FieldError message={errMsg} />,container);
	 	const labels = scryRenderedDOMComponentsWithClass(apiBtn, 'ui auth-form error message');
	    expect(labels.length).to.equal(1);
	    expect(labels[0].textContent).to.be.equal("Label Text")
	    ReactDOM.unmountComponentAtNode(container);
	});
 })
