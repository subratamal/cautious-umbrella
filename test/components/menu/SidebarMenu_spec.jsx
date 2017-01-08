import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  scryRenderedComponentsWithType as withType,
  scryRenderedDOMComponentsWithClass as withClass,
  scryRenderedDOMComponentsWithTag as WithTag,
} from 'react-addons-test-utils';
import { expect } from 'chai';
import { store } from '../../testStore_creator';
import SidebarMenu from '../../../src/components/menu/SidebarMenu';

/*
1. Renders Sidebar Menu container
2. Renders Menu List
*/

// Creating a container to test the components
const container = document.createElement('div');

afterEach = () => {
  unMount(container);
};
describe('Sidebar Menu', () => {
// afterEach(function() {
// ReactDOM.unmountComponentAtNode(container);
// });

  it('renders Sidebar menu container', () => {
    const sidebarMenu = ReactDOM.render(
      <Provider store={store}>
        <SidebarMenu />
        </Provider>
      , container);
    const menu = withClass(sidebarMenu, 'sidebar vertical menu');
    expect(menu.length).to.equal(1);
  });

  it('renders Menu List ', () => {
    const sidebarMenu = ReactDOM.render(
      <Provider store={store}>
        <SidebarMenu />
      </Provider>
    , container);
    const menuList = withClass(sidebarMenu, 'item');
    expect(menuList.length).to.equal(19);
  });
});
