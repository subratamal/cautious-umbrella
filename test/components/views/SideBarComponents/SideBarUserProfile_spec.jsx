import React  from 'react';
import ReactDOM from 'react-dom';
import ReactAddonsTestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import SideBarUserProfile from '../../../../src/components/views/SideBarComponents/SideBarUserProfile'
import {profile_mini_teaser} from '../../../test_constants'
import * as homePageActions from '../../../../src/actions/homePage_actions'
import { Map, fromJS } from 'immutable' 
import {store} from '../../../testStore_creator';
import {Provider} from 'react-redux';
import {
	breakPointsDefaults
} from '../../../../src/defaults'

/*
1. Renders Container
2. Renders Header
3. Renders profile mini teaser
*/

const {renderIntoDocument, scryRenderedDOMComponentsWithTag,scryRenderedDOMComponentsWithClass, 
Simulate, findRenderedComponentWithClass}
= ReactAddonsTestUtils;

//Creating a container to test the components 
var container = document.createElement('div');

describe("Sidebar User Profiles", () => {

	afterEach(function() {
		ReactDOM.unmountComponentAtNode(container);	
	});
	it('renders Container', () =>{
		window.innerWidth = breakPointsDefaults.tablet + 1;
		var sideBarProfilesContainer = ReactDOM.render(
			<Provider store = {store}>
				<SideBarUserProfile reducerName='homePage' componentName = 'SideBarProfiles' apiActions = {homePageActions}></SideBarUserProfile>
			</Provider>
			, container);  
		let teasers = [profile_mini_teaser];
		store.dispatch(homePageActions.setSuccessState(teasers,'SideBarProfiles'));
		var containers = scryRenderedDOMComponentsWithClass(sideBarProfilesContainer,'sidebar-user-profile');
		expect(containers.length).to.be.equal(1);	
		ReactDOM.unmountComponentAtNode(container);	
	})
	
})