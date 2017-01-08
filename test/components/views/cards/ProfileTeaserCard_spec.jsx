import React  from 'react';
import ReactDOM from 'react-dom';
import ReactAddonsTestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import {store} from '../../../testStore_creator';
import ProfileTeaserCard from '../../../../src/components/views/cards/ProfileTeaserCard'
import {profileBlockCardValues} from '../../../test_constants'
import {Provider} from 'react-redux';
import * as discoverPageActions from '../../../../src/actions/discoverPage_actions'

import {profile_entity_data} from '../../../storeData/block_card_data.js'

/*
1. Renders Wrapped Teaser
2. Renders Teaser Without Wrap
3. Renders Image
4. Renders Primary Text
5. Renders Button Text
6. Renders Secondary Text
7. Renders Wrapper By Default
*/

const {renderIntoDocument, scryRenderedDOMComponentsWithTag,scryRenderedDOMComponentsWithClass,
Simulate, findRenderedComponentWithClass}
= ReactAddonsTestUtils;

store.dispatch(discoverPageActions.setSuccessState([profile_entity_data],'SideBarProfiles'));

//Creating a container to test the components
var container = document.createElement('div');

describe("Profile Teaser Card", () => {

	it('renders Wrapped Teaser', () =>{
		var ProfileTeaser = ReactDOM.render(<Provider store = {store}><ProfileTeaserCard isWrapped={true} {...profileBlockCardValues}></ProfileTeaserCard></Provider>, container);
		var containers = scryRenderedDOMComponentsWithClass(ProfileTeaser,'card');
		expect(containers.length).to.be.equal(1);
		ReactDOM.unmountComponentAtNode(container);
	})

	it('renders Teaser Without Wrap', () =>{
		var ProfileTeaser = ReactDOM.render(<Provider store = {store}><ProfileTeaserCard isWrapped={false} {...profileBlockCardValues} ></ProfileTeaserCard></Provider>, container);
		var containers = scryRenderedDOMComponentsWithClass(ProfileTeaser,'card');
		expect(containers.length).to.be.equal(0);
		ReactDOM.unmountComponentAtNode(container);
	})

	it('renders Image', () =>{
		var profileTeaser = ReactDOM.render(<Provider store = {store}><ProfileTeaserCard {...profileBlockCardValues}></ProfileTeaserCard></Provider>, container);
		var containers = scryRenderedDOMComponentsWithTag(profileTeaser,'img');
		expect(containers.length).to.be.equal(1);
		ReactDOM.unmountComponentAtNode(container);
	})
	it('renders Primary Text ', () =>{
		var profileTeaser = ReactDOM.render(<Provider store = {store}><ProfileTeaserCard {...profileBlockCardValues} ></ProfileTeaserCard></Provider>, container);
		var containers = scryRenderedDOMComponentsWithClass(profileTeaser,'singleline-ellipsis');
		expect(containers.length).to.be.above(0);
		expect(containers[0].textContent).to.be.equal(profileBlockCardValues.primaryText)
		ReactDOM.unmountComponentAtNode(container);
	})
	it('renders Secondary Text ', () =>{
		var profileTeaser = ReactDOM.render(<Provider store = {store}><ProfileTeaserCard {...profileBlockCardValues} ></ProfileTeaserCard></Provider>, container);
		var containers = scryRenderedDOMComponentsWithClass(profileTeaser,'singleline-ellipsis');
		expect(containers.length).to.be.above(0);
		expect(containers[1].textContent).to.be.equal(profileBlockCardValues.secondaryText)
		ReactDOM.unmountComponentAtNode(container);
	})
	it('renders Wrapper By Default', () =>{
		var profileTeaser = ReactDOM.render(<Provider store = {store}><ProfileTeaserCard {...profileBlockCardValues}></ProfileTeaserCard></Provider>, container);
		var containers = scryRenderedDOMComponentsWithClass(profileTeaser,'card');
		expect(containers.length).to.be.equal(1);
		ReactDOM.unmountComponentAtNode(container);
	})
})
