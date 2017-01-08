import React from 'react';
import {
  Grid,
  Segment,
  List,
  Item
} from 'react-semantify';

export const ExampleStyleguide = React.createClass({
  render: function() {
    var fontNormalStyle = {
      fontWeight:'normal'
    };
    var fontBoldStyle = {
      fontWeight:700
    };
    var fontItalicStyle = {
      fontStyle:'italic'
    };
    return (
      <div>
        <h2 className="ui dividing header">Font Family</h2>
        <Grid className="stackable equal width">
          <div className="column">
            <div className="ui segment">
              <h4 className="ui header">Clear Sans</h4>
              <div className="html">
                <h2 className="ui">
                  BOLD : Grumpy wizards make toxic brew for the evil Queen and Jack.
                </h2>
                <h2 className="ui" style={fontNormalStyle}>
                  REGULAR : Grumpy wizards make toxic brew for the evil Queen and Jack.
                </h2>
                <ul className="ui horizontal bulleted link list">
                  <Item><small>Custom Font</small></Item>
                  <Item><small>html tag: h2</small></Item>
                  <Item><small>font-family: Clear Sans</small></Item>
                  <Item><small>font-size: 21px</small></Item>
                  <Item><small>line-height: 27px</small></Item>
                </ul>
              </div>
            </div>
          </div>
          <div className="column">
            <Segment>
              <h4 className="ui header">Clear Sans</h4>
              <div className="html">
                <p className="ui" style={fontBoldStyle}>
                  BOLD : Grumpy wizards make toxic brew for the evil Queen and Jack.
                </p>
                <p className="ui">
                  REGULAR : Grumpy wizards make toxic brew for the evil Queen and Jack.
                </p>
                <p className="ui" style={fontItalicStyle}>
                  ITALICS : Grumpy wizards make toxic brew for the evil Queen and Jack.
                </p>
                <List className="ui horizontal bulleted link list">
                  <Item><small>Google Font</small></Item>
                  <Item><small>html tag: p</small></Item>
                  <Item><small>font-family: Clear Sans</small></Item>
                  <Item><small>font-size: 14px</small></Item>
                  <Item><small>line-height: 24px</small></Item>
                </List>
              </div>
            </Segment>
          </div>
          <div className="column custom-font">
            <Segment>
              <h4 className="ui header">PT Serif</h4>
              <div className="html">
                <p className="ui" style={fontBoldStyle}>
                  BOLD : Grumpy wizards make toxic brew for the evil Queen and Jack.
                </p>
                <p className="ui">
                  REGULAR : Grumpy wizards make toxic brew for the evil Queen and Jack.
                </p>
                <p className="ui" style={fontItalicStyle}>
                  ITALICS : Grumpy wizards make toxic brew for the evil Queen and Jack.
                </p>
                <List className="ui horizontal bulleted link list">
                  <Item><small>Google Font</small></Item>
                  <Item><small>html tag: p</small></Item>
                  <Item><small>font-family: Clear Sans</small></Item>
                  <Item><small>font-size: 14px</small></Item>
                  <Item><small>line-height: 24px</small></Item>
                </List>
              </div>
            </Segment>
          </div>
        </Grid>

        <h2 className="ui dividing header">Font Elements</h2>
        <Grid className="stackable two column">
          <div className="column">
            <Segment>
              <h4 className="ui header">Headers</h4>

              <div className="html">
                <h1 className="ui">Header 1</h1>
                <List className="ui horizontal bulleted link list">
                  <Item><small>html tag: h1</small></Item>
                  <Item><small>font-family: Clear Sans</small></Item>
                  <Item><small>font-size: 40px</small></Item>
                  <Item><small>line-height: 48px</small></Item>
                  <Item><small>font-weight: bold</small></Item>
                </List>
                <h2 className="ui">Header 2</h2>
                <List className="ui horizontal bulleted link list">
                  <Item><small>html tag: h2</small></Item>
                  <Item><small>font-family: Clear Sans</small></Item>
                  <Item><small>font-size: 21px</small></Item>
                  <Item><small>line-height: 27px</small></Item>
                  <Item><small>font-weight: bold</small></Item>
                </List>
                <h3 className="ui">Header 3</h3>
                <List className="ui horizontal bulleted link list">
                  <Item><small>html tag: h3</small></Item>
                  <Item><small>font-family: Clear Sans</small></Item>
                  <Item><small>font-size: 16px</small></Item>
                  <Item><small>line-height: 24px</small></Item>
                  <Item><small>font-weight: bold</small></Item>
                </List>
                <h4 className="ui">Header 4</h4>
                <List className="ui horizontal bulleted link list">
                  <Item><small>html tag: h4</small></Item>
                  <Item><small>font-family: Clear Sans</small></Item>
                  <Item><small>font-size: 12px</small></Item>
                  <Item><small>line-height: 18px</small></Item>
                  <Item><small>font-weight: bold</small></Item>
                </List>
                <h5 className="ui">Header 5</h5>
                <List className="ui horizontal bulleted link list">
                  <Item><small>html tag: h5</small></Item>
                  <Item><small>font-family: Clear Sans</small></Item>
                  <Item><small>font-size: 10px</small></Item>
                  <Item><small>line-height: 18px</small></Item>
                  <Item><small>font-weight: bold</small></Item>
                </List>
              </div>
            </Segment>

          </div>

          <div className="column">
            <Segment>
              <h4 className="ui header">Paragraph</h4>
              <div className="html">
                <p className="ui">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <List className="ui horizontal bulleted link list">
                  <Item><small>html tag: p</small></Item>
                  <Item><small>font-family: Clear Sans</small></Item>
                  <Item><small>font-size: 14px</small></Item>
                  <Item><small>line-height: 24px</small></Item>
                  <Item><small>font-weight: normal</small></Item>
                </List>
              </div>
            </Segment>
             <Segment>
              <div className="html">
                <h1 className="ui header">Title</h1>
                <List className="ui horizontal bulleted link list">
                  <Item><small>html tag: h1</small></Item>
                  <Item><small>font-family: Clear Sans</small></Item>
                  <Item><small>font-size: 40px</small></Item>
                  <Item><small>line-height: 48px</small></Item>
                  <Item><small>font-weight: bold</small></Item>
                </List>
                <h2 className="ui header">Sub Title</h2>
                <List className="ui horizontal bulleted link list">
                  <Item><small>html tag: h2</small></Item>
                  <Item><small>font-family: Clear Sans</small></Item>
                  <Item><small>font-size: 21px</small></Item>
                  <Item><small>line-height: 27px</small></Item>
                  <Item><small>font-weight: bold</small></Item>
                </List>
                <a className="ui primary" href="#"> Link </a>
                <List className="ui horizontal bulleted link list">
                  <Item><small>html tag: a</small></Item>
                  <Item><small>font-family: Clear Sans</small></Item>
                  <Item><small>font-size: 14px</small></Item>
                  <Item><small>line-height: 24px</small></Item>
                  <Item><small>font-weight: normal</small></Item>
                  <Item><small>text-decoration: none</small></Item>
                </List>
              </div>
            </Segment>
          </div>
        </Grid>

        <h2 className="ui dividing header">Colour Palette</h2>
        <Grid className="stackable equal width">
          <div className="column">
            <Segment>
              <h2>All Colours</h2>
              <Grid className="one column stackable padded middle aligned centered color">
                <div className="primary column"> Primary <small>(PANTONE P 62-14 C)</small> </div>
                <div className="secondary column"> Secondary <small>(PANTONE 150 C)</small> </div>
              </Grid>
            </Segment>

          </div>
          <div className="column">
            <Segment>
              <h2>Brand All Colours</h2>
              <Grid className="one column stackable padded middle aligned centered color">
                <div className="pantonep179-15c column"> Black <small>(PANTONE P 179-15 C)</small> </div>
                <div className="pantonep179-4u column"> Grey <small>(PANTONE P 179-4 U)</small> </div>
                <div className="pantone150c column"> Yellow <small>(PANTONE 150 C)</small> </div>
                <div className="pantonep62-14c column"> Red <small>(PANTONE P 62-14 C)</small> </div>
                <div className="pantonep23-3c column"> Brown <small>(PANTONE P 23-3 C)</small> </div>
                <div className="pantonep13-2c column"> Default <small>(PANTONE P 13-2 C)</small> </div>
              </Grid>
            </Segment>

          </div>
        </Grid>


      </div>
    );
  }
});
