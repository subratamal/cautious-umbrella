import React  from 'react';
import ReactDOM from 'react-dom';
import ReactAddonsTestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import PageTeaserCard from '../../../../src/components/views/cards/PageTeaserCard'
import {teaserCardValues} from '../../../test_constants'
import {pageBlockCardValues} from '../../../test_constants'
import {Provider} from 'react-redux';
import {store} from '../../../testStore_creator';
import * as discoverPageActions from '../../../../src/actions/discoverPage_actions'

import {page_entity_data} from '../../../storeData/block_card_data.js'

/*
1. Renders Wrapped Teaser
2. Renders Wrapper By Default
3. Renders Teaser Without Wrap
4. Renders Image
5. Renders Primary Text
6. Renders Button Text
7. Renders Secondary Text
*/

const {renderIntoDocument, scryRenderedDOMComponentsWithTag,scryRenderedDOMComponentsWithClass,
Simulate, findRenderedComponentWithClass}
= ReactAddonsTestUtils;

store.dispatch(discoverPageActions.setSuccessState([page_entity_data],'SideBarPages'));

//Creating a container to test the components
var container = document.createElement('div');

describe("Page Teaser Card", () => {

	it('renders Wrapped Teaser', () =>{
		var PageTeaser = ReactDOM.render(<Provider store = {store}><PageTeaserCard isWrapped={true} {...pageBlockCardValues}></PageTeaserCard></Provider>, container);
		var containers = scryRenderedDOMComponentsWithClass(PageTeaser,'card');
		expect(containers.length).to.be.equal(1);
		ReactDOM.unmountComponentAtNode(container);
	})

	it('renders Wrapper By Default', () =>{
		var PageTeaser = ReactDOM.render(<Provider store = {store}><PageTeaserCard {...pageBlockCardValues}></PageTeaserCard></Provider>, container);
		var containers = scryRenderedDOMComponentsWithClass(PageTeaser,'card');
		expect(containers.length).to.be.equal(1);
		ReactDOM.unmountComponentAtNode(container);
	})

	it('renders Teaser Without Wrap', () =>{
		var PageTeaser = ReactDOM.render(<Provider store = {store}><PageTeaserCard isWrapped={false} {...pageBlockCardValues}></PageTeaserCard></Provider>, container);
		var containers = scryRenderedDOMComponentsWithClass(PageTeaser,'card');
		expect(containers.length).to.be.equal(0);
		ReactDOM.unmountComponentAtNode(container);
	})

	it('renders Image', () =>{
		var pageTeaser = ReactDOM.render(<Provider store = {store}><PageTeaserCard {...pageBlockCardValues}></PageTeaserCard></Provider>, container);
		var containers = scryRenderedDOMComponentsWithTag(pageTeaser,'img');
		expect(containers.length).to.be.equal(1);
		ReactDOM.unmountComponentAtNode(container);
	})



	it('renders Secondary Text', () =>{
		var pageTeaser = ReactDOM.render(<Provider store = {store}><PageTeaserCard {...pageBlockCardValues} secondaryText={teaserCardValues.secondaryText}></PageTeaserCard></Provider>, container);
		var containers = scryRenderedDOMComponentsWithClass(pageTeaser,'location');
		expect(containers.length).to.be.above(0);
		expect(containers[0].textContent).to.be.equal(teaserCardValues.secondaryText)
		ReactDOM.unmountComponentAtNode(container);
	})
})
