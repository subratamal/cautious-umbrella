import React  from 'react';
import ReactDOM from 'react-dom';
import {
   renderIntoDocument as render,
   scryRenderedComponentsWithType as withType,
   scryRenderedDOMComponentsWithClass as withClass,
} from 'react-addons-test-utils';

import {expect} from 'chai';
import SideBar from '../../../../src/components/views/SideBar'
import SideBarLoginSignUp from '../../../../src/components/views/SideBarComponents/SideBarLoginSignup'
import {Provider} from 'react-redux';
import {store} from '../../../testStore_creator';
import { logout } from '../../../../src/actions/login_modal_actions';
/*
1. Renders Container
2. Renders  Button
3. Should render LoginSignup Card component if user is not logged in

*/


//Creating a container to test the components 
const container = document.createElement('div');

afterEach = () => {
	unMount(container)
}

describe("Login Sidebar Card", () => {
	it('renders Container', () =>{
		const sidebarLogin  = ReactDOM.render (
			<Provider store = {store}>
				<SideBarLoginSignUp />
			</Provider>, container
		)
		const containers = withClass(sidebarLogin,'segment');
		expect(containers.length).to.equal(1);	
	})
	it('renders Button', () =>{
		const sidebarLogin  = ReactDOM.render (
			<Provider store = {store}>
				<SideBarLoginSignUp />
			</Provider>, container
		)
		const containers = withClass(sidebarLogin,'button');
		expect(containers.length).to.equal(1);	
	})

	it('should render LoginSignup Card component if user is not logged in', () => {
     store.dispatch(logout())
     const sidebarLogin  = ReactDOM.render (
			<Provider store = {store}>
				<SideBarLoginSignUp />
			</Provider>, container
		)
     const SideBarLoginSignUpCard = withClass(sidebarLogin, 'segment')
     expect(SideBarLoginSignUpCard.length).to.equal(1)

    })
})