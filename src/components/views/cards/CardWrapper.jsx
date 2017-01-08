/*
  An HoC ( Higher Order Component ) to wrap the Component in cards
*/
import React, { Component } from 'react';
import {
  Card,
  Content,
} from 'react-semantify';

/*
  @ComposedComponent: A Component that needs to be enhanced with card wrapper
  @output: If isWrapped is true, adds outer card
*/

const cardWrapper = (ComposedComponent) => class extends Component {
  render() {
    let { isWrapped } = this.props;
    /* If isWrapped is not present in props of passed component set it default ot true*/
    if (isWrapped == undefined) {
      isWrapped = true;
    }

    const content = isWrapped ? (
       <Card className="fluid">
         <Content>
           <ComposedComponent {...this.props} />
           </Content>
        </Card>
      ) : <ComposedComponent {...this.props} />;

    return (
      content
    );
  }
};

export default cardWrapper;
