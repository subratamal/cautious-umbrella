import React  from 'react';
import ReactDOM from 'react-dom';
import ReactAddonsTestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import {PageBody} from '../../../src/components/views/PageBody'
import {PrimaryContent} from '../../../src/components/views/PrimaryContent'
import {PrimarySlider} from '../../../src/components/views/PrimarySlider'
import {SideBar} from '../../../src/components/views/SideBar'


/*
1.Renders
2.Renders single column occupying full width when sidebar is not present 
2.Renders two columns sidebar is present 
*/


const {renderIntoDocument, scryRenderedDOMComponentsWithTag,scryRenderedDOMComponentsWithClass, 
Simulate, findRenderedComponentWithClass}
  = ReactAddonsTestUtils;

//Creating a container to test the components 
var container = document.createElement('div');

describe("Page Body", () => {
	it('renders container', () =>{
		var body = ReactDOM.render(<PageBody></PageBody>, container);
		var containers = scryRenderedDOMComponentsWithClass(body,'ui containers');
		expect(containers.length).to.be.above(0);	
		ReactDOM.unmountComponentAtNode(container);	
	})
	it('renders single column layout', () =>{
		var body = ReactDOM.render(<PageBody>
			<PrimarySlider></PrimarySlider>
			<PrimaryContent></PrimaryContent>
		</PageBody>, container);
		var containers = scryRenderedDOMComponentsWithClass(body,'two column');
		expect(containers.length).to.be.equal(0);	
		ReactDOM.unmountComponentAtNode(container);	
	})

	it('renders two column layout', () =>{
		var body = ReactDOM.render(<PageBody>
			<PrimarySlider></PrimarySlider>
			<PrimaryContent></PrimaryContent>
			<SideBar></SideBar>
		</PageBody>, container);
		var containers = scryRenderedDOMComponentsWithClass(body,'column');
		expect(containers.length).to.be.above(0);	
		ReactDOM.unmountComponentAtNode(container);	
	})
	
})