import React  from 'react';
import ReactDOM, {unmountComponentAtNode as unMount} from 'react-dom';
import {
  scryRenderedComponentsWithType as withType,
  scryRenderedDOMComponentsWithClass as withClass,
  scryRenderedDOMComponentsWithTag as WithTag
} from 'react-addons-test-utils';
import {expect} from 'chai';
import PageFeedCard from '../../../../src/components/views/cards/PageFeedCard'
import {homePageFeedCardValues} from '../../../test_constants'
import {Provider} from 'react-redux';
import {store} from '../../../testStore_creator';
import * as pageActions from '../../../../src/actions/homePage_actions'

import {feed_entity_data} from '../../../storeData/home_feed_data'


/*
1. Renders Primary text
2. Renders Secondary text
3. Reders Button text
*/
store.dispatch(pageActions.setSuccessState([feed_entity_data],'HomePageFeed'));

let container = document.createElement('div');

afterEach = () => {
  unMount(container)
}
describe("Home Page Feed Card", () => {
	it('renders Primary Text ', () =>{
		let page_feed = ReactDOM.render(<Provider store = {store}><PageFeedCard  {...homePageFeedCardValues}/></Provider>, container);
		let header = withClass(page_feed,'page-feed-header');
		expect(header.length).to.equal(1);
	})

	it('renders  Secondary Text ', () =>{
		let page_feed = ReactDOM.render(<Provider store = {store}><PageFeedCard {...homePageFeedCardValues}/></Provider>, container);
		let subHeader = withClass(page_feed,'description');
		expect(subHeader.length).to.equal(1);
	})

	it('renders date of feed ', () =>{
		let page_feed = ReactDOM.render(<Provider store = {store}><PageFeedCard {...homePageFeedCardValues}/></Provider>, container);
		let subHeader = withClass(page_feed,'page-feed-date');
		expect(subHeader.length).to.equal(1);
	})


})
