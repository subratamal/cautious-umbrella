import React  from 'react';
import ReactDOM from 'react-dom';
import ReactAddonsTestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import SideBarAdvertisement from '../../../../src/components/views/SideBarComponents/SideBarAdvertisement'

/*
1. Renders Container

*/

const {renderIntoDocument, scryRenderedDOMComponentsWithTag,scryRenderedDOMComponentsWithClass, 
Simulate, findRenderedComponentWithClass}
= ReactAddonsTestUtils;

//Creating a container to test the components 
var container = document.createElement('div');

describe("Ad Slider sidebar", () => {
	it('renders Container', () =>{
		var adCardSliderContainer = ReactDOM.render(<SideBarAdvertisement></SideBarAdvertisement>, container);
		var containers = scryRenderedDOMComponentsWithClass(adCardSliderContainer,'card');
		expect(containers.length).to.be.equal(1);	
		ReactDOM.unmountComponentAtNode(container);	
	})
})