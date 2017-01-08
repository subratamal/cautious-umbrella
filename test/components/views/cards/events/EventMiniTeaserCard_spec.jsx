import React  from 'react';
import ReactDOM, {unmountComponentAtNode as unMount } from 'react-dom';
import ReactAddonsTestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import EventMiniTeaserCard from '../../../../../src/components/views/cards/events/EventMiniTeaserCard'
import generatePropsData from '../../../../../src/examples/ExampleCard'
/*
1. Renders Wrapped Mini Teaser
2. Renders Mini Teaser Without Wrap
3. Renders Image
4. Renders Primary Text
5. Renders Secondary Text
*/

import {
  renderIntoDocument as render,
  scryRenderedDOMComponentsWithTag as withTag,
  scryRenderedDOMComponentsWithClass as withClass
} from 'react-addons-test-utils'

//Creating a container to test the components
var container = document.createElement('div');

let props = generatePropsData("EventMiniTeaserCard");

afterEach = () => {
  unMount(container);
}

describe("Event Mini Teaser Card", () => {
	it('renders Wrapped Mini Teaser', () =>{
		var eventMiniTeaserCard = ReactDOM.render(<EventMiniTeaserCard isWrapped={true} />, container);
		var containers = withClass(eventMiniTeaserCard,'card');
		expect(containers.length).to.be.equal(1);
	})

	it('renders Wrapper By Default', () =>{
		var eventMiniTeaserCard = ReactDOM.render(<EventMiniTeaserCard  isWrapped={true} />, container);
		var containers = withClass(eventMiniTeaserCard,'card');
		expect(containers.length).to.be.equal(1);
	})

	it('renders Mini Teaser Without Wrap', () =>{
		var eventMiniTeaserCard = ReactDOM.render(<EventMiniTeaserCard isWrapped={false} />, container);
		var containers = withClass(eventMiniTeaserCard,'card');
		expect(containers.length).to.be.equal(0);
	})

	it('renders Image ', () =>{
		var eventMiniTeaserCard = ReactDOM.render(<EventMiniTeaserCard />, container);
		var containers = withTag(eventMiniTeaserCard,'img');
		expect(containers.length).to.be.equal(1);
	})

	it('renders Primary Text ', () =>{
		var eventMiniTeaserCard = ReactDOM.render(<EventMiniTeaserCard primaryText={props.primaryText}></EventMiniTeaserCard>, container);
		var containers = withClass(eventMiniTeaserCard,'primary-text');
		expect(containers.length).to.be.above(0);
		expect(containers[0].textContent).to.be.equal(props.primaryText)
	})

	it('renders Secondary Text ', () =>{
		var eventMiniTeaserCard = ReactDOM.render(<EventMiniTeaserCard secondaryText={props.secondaryText}></EventMiniTeaserCard>, container);
		var containers = withClass(eventMiniTeaserCard,'secondary-text');
		expect(containers.length).to.be.above(0);
		expect(containers[0].textContent).to.be.equal(props.secondaryText)
	})

})
