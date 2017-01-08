import React from 'react';
import { ExampleButton } from './ExampleButton';
import { ExampleStyleguide } from './ExampleStyleguide';
import { ExampleInput } from './ExampleInput';
import { ExampleMenu } from './ExampleMenu';
import { ExampleList } from './ExampleList';
import { ExampleCard } from './ExampleCard';
import { ExampleIcon } from './ExampleIcon';

class Examples extends React.Component {
  render() {
    return (
      <div className="ui main container">
        <h1 >Theming Examples</h1>
        <h1 className="ui dividing header">Style Guide</h1>
        <ExampleStyleguide />
        <h1 className="ui dividing header">Buttons</h1>
        <ExampleButton />
        <h1 className="ui dividing header">Input</h1>
        <ExampleInput />
        <h1 className="ui dividing header">Menu</h1>
        <ExampleMenu />
        <h1 className="ui dividing header">List</h1>
        <ExampleList />
        <h1 className="ui dividing header">Card</h1>
        <ExampleCard />
        <h1 className="ui dividing header">Icons</h1>
        <ExampleIcon />
      </div>
    );
  }
}

export default Examples;
