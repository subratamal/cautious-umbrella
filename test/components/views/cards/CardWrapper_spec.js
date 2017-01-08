import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import ReactAddonsTestUtils from 'react-addons-test-utils';
import CardWrapper from '../../../../src/components/views/cards/CardWrapper';
import PageMiniTeaserCard from '../../../../src/components/views/cards/PageMiniTeaserCard';


const CardWrapperInstance = CardWrapper(PageMiniTeaserCard);
const { scryRenderedDOMComponentsWithClass } = ReactAddonsTestUtils;
const container = document.createElement('div');

describe("Card Wrapper", () => {
  it('renders bordered component', () =>{
    const cardWrapper = ReactDOM.render(
      <CardWrapperInstance isWrapped />,
    container);
    const containers = scryRenderedDOMComponentsWithClass(cardWrapper, 'card');
    expect(containers.length).to.be.above(1);
    ReactDOM.unmountComponentAtNode(container);
  });
  it('renders component without border', () =>{
    const cardWrapper = ReactDOM.render(
      <CardWrapperInstance isWrapped={false} />,
    container);
    const containers = scryRenderedDOMComponentsWithClass(cardWrapper, 'card');
    expect(containers.length).to.be.equal(0);
    ReactDOM.unmountComponentAtNode(container);
  });
});
