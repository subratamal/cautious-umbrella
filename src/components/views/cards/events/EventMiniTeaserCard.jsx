/*Page Card Mini Teaser*/
import React from 'react'
import { Item, Content, Card, Image } from 'react-semantify';
import {pageThumbnail} from '../../../../defaults'
import CardWrapper from '../CardWrapper'

/*
Properties -
imageOnClickLink - url to be navigated on image click
imageSource - image src
primaryText -  primary text
primaryTextOnClickLink - url to be navigated on primary text click
secondaryText - secondary text
secondaryTextOnClickLink - url to be navigated on secondary text click
isWrapped - boolean to add or remove card wrapper (default = true)
*/


class EventMiniTeaserCard extends React.Component {
  constructor() {
    super()
    this.imageFetchFailed = this.imageFetchFailed.bind(this)
  }

  componentWillMount(){
    let image;
    image = this.props.imageSource ? this.props.imageSource : pageThumbnail;

    this.setState({
      imageSource : image
    });
  }
  /*If image recived from api call failed, render default image*/
  imageFetchFailed() {
    this.setState({
      imageSource : pageThumbnail
    })
  }
  render () {
    return (
      <div className="ui items mini-teaser">
        <Item>
            <a className="ui mini image" href={this.props.imageOnClickLink} target="_blank">
            <Image className="rounded" src={this.state.imageSource} onError={this.imageFetchFailed}/>
            </a>
          <Content>
              <a href={this.props.primaryTextOnClickLink} className="ui primary-text" target="_blank">{this.props.primaryText}</a>
              <div className="meta location secondary-text">
                <div>{this.props.secondaryText}</div>
              </div>
          </Content>
         </Item>
      </div>
    )
  }
}

export default CardWrapper(EventMiniTeaserCard)
