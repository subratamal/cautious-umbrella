import React from 'react';
import {
  Button,
  Divider,
  Icon,
  Menu,
  List,
  Item,
  Input,
  Dropdown,
  Segment,
  Grid,
  Content,
  Column
} from 'react-semantify';

export const ExampleList = React.createClass({
  render: function() {
    return (
    <Grid className="stackable equal width">
    <Column>
      <h2>List</h2>
      <List>
        <Item>Apples</Item>
        <Item>Pears</Item>
        <Item>Oranges</Item>
      </List>

      <Divider></Divider>

      <h2>List with icons</h2>
      <List>
        <Item>
          <Icon className="users"></Icon>
          <Content>
            Semantic UI
          </Content>
        </Item>
        <Item>
          <Icon className="marker"></Icon>
          <Content>
            New York, NY
          </Content>
        </Item>
        <Item>
          <Icon className="mail"></Icon>
          <Content>
            <a href="mailto:jack@semantic-ui.com">jack@semantic-ui.com</a>
          </Content>
        </Item>
        <Item>
          <Icon className="linkify"></Icon>
          <Content>
            <a href="http://www.semantic-ui.com">semantic-ui.com</a>
          </Content>
        </Item>
      </List>

      <Divider></Divider>

      <h2>Bulleted</h2>

      <List className="bulleted">
        <Item>Gaining Access</Item>
        <Item>Inviting Friends</Item>
        <Item>
          <div>Benefits</div>
          <List>
            <Item>Use Anywhere</Item>
            <Item>Rebates</Item>
            <Item>Discounts</Item>
          </List>
        </Item>
        <Item>Warranty</Item>
      </List>
    </Column>
    
    <Column>
      <h2>Ordered</h2>
      <List className="ordered">
        <Item type="link">Getting Started</Item>
        <Item type="link">Introduction</Item>
        <Item>
          <a>Languages</a>
          <List>
            <Item type="link">HTML</Item>
            <Item type="link">Javascript</Item>
            <Item type="link">CSS</Item>
          </List>
        </Item>
        <Item type="link">Review</Item>
      </List>

      <Divider></Divider>
      <h2>Link</h2>
      <List className="link">
        <Item className="active">Home</Item>
        <Item type="link">About</Item>
        <Item type="link">Jobs</Item>
        <Item type="link">Team</Item>
      </List>
      <Divider></Divider>
      <h2>Inverted</h2>
      <Segment className="inverted">
        <List className="inverted relaxed divided">
          <Item>
            <Content>
              <div className="header">Snickerdoodle</div>
              An excellent companion
            </Content>
          </Item>
          <Item>
            <Content>
              <div className="header">Poodle</div>
              A poodle, its pretty basic
            </Content>
          </Item>
          <Item>
            <Content>
              <div className="header">Paulo</div>
              He's also a dog
            </Content>
          </Item>
        </List>
      </Segment>
    </Column>
  </Grid>
    );
  }
});
