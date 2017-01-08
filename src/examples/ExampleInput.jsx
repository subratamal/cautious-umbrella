import React from 'react';
import {
  Button,
  Divider,
  Icon,
  Menu,
  Item,
  Input,
  Dropdown,
  Segment,
  Grid,
  Checkbox,
  Label
} from 'react-semantify';

export const ExampleInput = React.createClass({
  render: function() {
    return (
      <Grid className="two column stackable">
         <div className="column">
            <div className="ui action left icon input">
                <Icon className="search"></Icon>
                <input type="text" placeholder="Search..."/>
                <Button className="red">Search</Button>
            </div>
            <Divider></Divider>
            <div className="ui input error">
                <Input placeholder="Search..." type="text"></Input>
            </div>
            <Divider></Divider>
            <div className="ui right labeled input">
                <input placeholder="Placeholder" type="text"/>
                <Dropdown className="label" init={true}>
                    <div className="text">Dropdown</div>
                    <Icon className="dropdown"></Icon>
                    <Menu>
                        <Item>Choice 1</Item>
                        <Item>Choice 2</Item>
                        <Item>Choice 3</Item>
                    </Menu>
                </Dropdown>
            </div>
            <Divider></Divider>
            <div className="ui transparent icon input">
                <Input placeholder="Search..." type="text"/>
                <Icon className="search"></Icon>
            </div>
            <div className="ui transparent left icon input">
                <input placeholder="Search..." type="text"></input>
                <Icon className="search"></Icon>
            </div>
            <Divider></Divider>
            <div className="ui left icon input loading">
                <input placeholder="Loading..." type="text"/>
                <Icon className="search"></Icon>
            </div>
            <Divider></Divider>
            <Input className="left icon loading tesing">
                <input placeholder="Search..." type="text" />
                <Icon className="search"></Icon>
            </Input>
            <Divider></Divider>
            <div className="ui icon input loading">
                <Input placeholder="Loading..." type="text"/>
                <Icon className="search"></Icon>
            </div>
          </div>
        <div className="column">
            <div className="ui right labeled left icon input">
                <Icon className="tags"></Icon>
                <Input placeholder="Enter tags" type="text"/>
                <a className="ui tag label">
                Add Tag
                </a>
            </div>
            <Divider></Divider>
            <div className="ui labeled input">
                <a className="ui label">
                Label
                </a>
                <input type="text" placeholder="Placeholder..."/>
            </div>
            <Divider></Divider>
            <div className="ui right labeled input">
                <input type="text" placeholder="Placeholder..."/>
                <a className="ui label">
                    Label
                </a>
            </div>
            <Divider></Divider>
            <div className="ui labeled icon input">
                <Label>
                http://
                </Label>
                <input type="text" placeholder="domain.com"/>
                <Icon className="add circle link"></Icon>
            </div>
            <Divider></Divider>
            <div className="ui right action input">
                <input type="text" placeholder="domain.com"/>
                <div className="ui yellow button">
                 <Icon className="add"></Icon>
                    Add
                </div>
            </div>
            <Divider></Divider>
            <div className="ui corner labeled input">
                <input type="text" placeholder="Required Field"/>
                <div className="ui corner label">
                    <Icon className="asterisk"></Icon>
                </div>
            </div>
            <Divider></Divider>
            <div className="ui">
               <Checkbox className="example" init={true}>
                  <input type="checkbox" name="example"/>
                    <label>Make my profile visible</label>
                </Checkbox>
            </div>
            <Checkbox init={true}>
                <input type="checkbox"/>
                <label>
                    The Simple Checkbox
                </label>
            </Checkbox>
            <Divider></Divider>
            <div className="ui">
                <label>Dropdown: </label>
                <Dropdown className="example selection" init={true}>
                    <div className="text">Dropdown</div>
                    <Icon className="dropdown"></Icon>
                    <Menu>
                        <Item>Choice 1</Item>
                        <Item>Choice 2</Item>
                        <Item>Choice 3</Item>
                    </Menu>
                </Dropdown>
            </div>
        </div>
      </Grid>
    );
  }
});
