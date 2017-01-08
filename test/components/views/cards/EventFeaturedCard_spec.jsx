import React  from 'react';
import ReactDOM, {unmountComponentAtNode as unMount} from 'react-dom';
import {
  scryRenderedComponentsWithType as withType,
  scryRenderedDOMComponentsWithClass as withClass,
  scryRenderedDOMComponentsWithTag as WithTag
} from 'react-addons-test-utils';
import {expect} from 'chai';
import EventFeaturedCard from '../../../../src/components/views/cards/EventFeaturedCard'
import {eventFeaturedCardValues} from '../../../test_constants'
import * as pageActions from '../../../../src/actions/discoverPage_actions'
import {store} from '../../../testStore_creator';
import {Provider} from 'react-redux';
import {event_entity_data} from '../../../storeData/block_card_data.js'
import {story_entity_data} from '../../../storeData/block_card_data.js'

/*
1. Renders Primary text
2. Renders Secondary text
3. Reders Button text
*/

let container = document.createElement('div');

store.dispatch(pageActions.setSuccessState([ { data : [story_entity_data] }, {  data : [event_entity_data] } ],'PrimaryContentSlider'))

afterEach = () => {
  unMount(container)
}
describe("Event Featured Card", () => {
	it('renders Primary Text ', () =>{
		let event_featured = ReactDOM.render(
			<Provider store = {store}>
			<EventFeaturedCard {...eventFeaturedCardValues} /></Provider>, container);
		let header = withClass(event_featured,'event-header');
		expect(header.length).to.equal(1);
	})

	it('renders  Secondary Text ', () =>{
		let event_featured = ReactDOM.render(<Provider store = {store}>
			<EventFeaturedCard {...eventFeaturedCardValues} /></Provider> , container);
		let subHeader = withClass(event_featured,'event-location');
		expect(subHeader.length).to.equal(1);
	})
})
