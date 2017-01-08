import React from 'react';
import {
  Button,
  Divider,
  Icon,
  Menu,
  Item,
  Dropdown,
  Segment,
  Grid
} from 'react-semantify';

export const ExampleButton = React.createClass({
  render: function() {
    return (
      <Grid className="stackable equal width">
        <div className="column">
          <Button >Default</Button>
          <Button className="primary">Primary</Button>
          <Button className="secondary">Secondary</Button>
          <Button className="compact">Compact</Button>

          <Divider></Divider>

          <Button className="basic">Basic</Button>
          <Button className="red basic">Red Basic</Button>
          <Button className="yellow basic">Yellow Basic</Button>

          <Divider></Divider>

          <Button className="icon">
            <Icon className="heart"></Icon>
          </Button>
          <Button className="labeled icon">
            <Icon className="heart"></Icon>
            Labeled
          </Button>
          <Button className="right labeled icon">
            <Icon className="heart"></Icon>
            Labeled
          </Button>

          <Divider></Divider>

          <div className="ui buttons">
            <Button>Combo</Button>
            <Dropdown className="floating icon button" init={{action: 'combo'}}>
              <Icon className="dropdown"/>
              <Menu>
                <Item>Choice 1</Item>
                <Item>Choice 2</Item>
                <Item>Choice 3</Item>
                <Item>Choice 4</Item>
              </Menu>
            </Dropdown>
          </div>

          <Divider></Divider>

          <Dropdown className="floating search button" init={true}>
            <span className="text">Search Dropdown</span>
            <Menu>
              <Item>Arabic</Item>
              <Item>Chinese</Item>
              <Item>Danish</Item>
              <Item>Dutch</Item>
              <Item>English</Item>
              <Item>French</Item>
              <Item>German</Item>
            </Menu>
          </Dropdown>

          <Divider></Divider>

          <Button className="animated" tabIndex="0">
            <div className="visible content">Horizontal</div>
            <div className="hidden content">
              Hidden
            </div>
          </Button>
          <Button className="vertical animated" tabIndex="0">
            <div className="visible content">Vertical</div>
            <div className="hidden content">
              Hidden
            </div>
          </Button>
          <Button className="animated fade" tabIndex="0">
            <div className="visible content">Fade In</div>
            <div className="hidden content">
              Hidden
            </div>
          </Button>

          <Divider></Divider>

          <Button className="disabled">Disabled</Button>
          <Button className="loading">Loading</Button>

          <Divider></Divider>

          <div className="ui left floated buttons">
            <Button>1</Button>
            <Button>2</Button>
            <Button>3</Button>
          </div>

          <div className="ui left floated icon buttons">
            <Button><Icon className="align left"/></Button>
            <Button><Icon className="align center"/></Button>
            <Button><Icon className="align right"/></Button>
            <Button><Icon className="align justify"/></Button>
          </div>

          <div className="ui left floated buttons">
            <Button>1</Button>
            <div className="or"></div>
            <Button>2</Button>
          </div>

        </div>
        <div className="column">
          <Button className="mini ">Mini</Button>
          <Button className="tiny">Tiny</Button>
          <Button className="large">Large</Button>
          <Button className="big">Big</Button>
          <Button className="massive">Massive</Button>

          <Divider></Divider>

          <div className="spaced">
            <Button className="yellow">Yellow</Button>
            <Button className="grey">Grey</Button>
            <Button className="brown">Brown</Button>
            <Button className="red">Red</Button>
            <Button className="black">Black</Button>
          </div>

          <Divider></Divider>

          <Segment className="inverted">
            <Button className="inverted">Inverted</Button>
            <Button className="inverted basic">Basic</Button>
            <Button className="inverted red">Colored</Button>
            <Button className="inverted yellow basic">Basic Colored</Button>
          </Segment>
        </div>
      </Grid>
    );
  }
});
