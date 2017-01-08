import React , {Component, PropTypes} from 'react';
import Slider from 'react-slick';
import {
  Divider,
  Icon,
  Item,
  Segment,
  Grid,
  Column,
  Card
} from 'react-semantify';
/*
Properties:-

1. Card title

*/

class SideBarAdvertisement extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		let imageSource = require("../../../../static/images/Sidebarad.png");
		let bgimage = {
	      backgroundImage: "url("+ imageSource + ")"
	    };
		return(
			<Card className="ad-card-slider">
				<a className="ui image" href="#" style={bgimage} target="_blank">
	            </a>
			</Card>
		);
	}
}

export default SideBarAdvertisement
