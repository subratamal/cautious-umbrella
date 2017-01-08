import React from 'react';
import MenuSlider from 'react-slick';
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
  Column
} from 'react-semantify';

export const ExampleMenu = React.createClass({
  render: function() {
    let style = {
      display:'none'
    }
    let sliderSettings = {
      dots: false,
      infinite: false,
      speed: 500,
      arrows:false,
      variableWidth:true,
      autoplay:false,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive:[
        { breakpoint: 480, settings: { slidesToShow: 3, arrows:true,variableWidth:false } },
        { breakpoint: 768, settings: { slidesToShow: 3 } },
        { breakpoint: 1024, settings: { slidesToShow: 4 } }
      ]
    };
    return (
    <div className="menu-section">
      <div className="ui centered grid secondary-menu">
        <div className="six wide computer eight wide tablet sixteen wide mobile center aligned column">
          <MenuSlider {...sliderSettings} className="ui menu text secondary pointing compact">
            <Item type="link">About</Item>
            <Item type="link">Stories</Item>
            <Item type="link">Projects</Item>
            <Item type="link">Connections</Item>
          </MenuSlider>
        </div>
      </div>
      <Menu className="text header-menu logged-menu">
        <Item className="ui images header">
          <img src={require("../../static/images/logo.png")} />
        </Item>
        <Item type="link">
          Home
        </Item>
        <Item type="link">
          Discover
        </Item>
        <Menu className="text right stackable desktop-menu">
          <Item>
            <div className="ui transparent icon input search-input">
                <Input placeholder="Search for stories, people and projects" type="text"/>
                <Icon className="search"></Icon>
            </div>
          </Item>
          <Item>
            <Button className="primary">Create</Button>
          </Item>
        </Menu>
        <Dropdown className="item right account-setting" init={true}>
          <a className="ui mini image" href="#link">
            <img className="ui medium rounded image" src={require("../../static/images/user_neutral.png")}/>
          </a>
          <Icon className="dropdown"></Icon>
          <Menu>
            <Item type="link">Applications</Item>
            <Item type="link">International Students</Item>
            <Item type="link">Scholarships</Item>
          </Menu>
        </Dropdown>
      </Menu>
      <Menu className="text header-menu" style={style}>
        <Item className="ui images header">
          <img className="ui mini image mobile-logo" src={require("../../static/images/logo.png")} />
          <img className="ui small image tablet-logo" src={require("../../static/images/CD-Logo.png")} />
        </Item>
        <Menu className="text right stackable desktop-menu">
          <Item type="link">
            Stories
          </Item>
          <Item type="link">
            Events
          </Item>
          <Item type="link">
            Opportunities
          </Item>
          <Item type="link">
            People
          </Item>
          <Item type="link">
            About
          </Item>
        </Menu>
        <Dropdown className="right item mobile-menu" init={true}>
          <Icon className="list"></Icon>
          <Menu>
            <Item type="link">
              Stories
            </Item>
            <Item type="link">
              Events
            </Item>
            <Item type="link">
              Opportunities
            </Item>
            <Item type="link">
              People
            </Item>
            <Item type="link">
              About
            </Item>
          </Menu>
        </Dropdown>
        <Item>
          <Button className="primary"> Login </Button>
        </Item>
      </Menu>
    </div>
    );
  }
});
