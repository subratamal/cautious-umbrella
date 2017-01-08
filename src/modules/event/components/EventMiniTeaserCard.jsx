import React, { PropTypes } from 'react';
import {
Item,
Content,
} from 'react-semantify';
import CardWrapper from '../../../components/views/cards/CardWrapper';
import { pageThumbnail } from '../../../defaults';

class EventMiniTeaserCard extends React.Component {
  constructor() {
    super();
    this.imageFetchFailed = this.imageFetchFailed.bind(this);
  }

  componentWillMount() {
    const image = this.props.imageSource ? this.props.imageSource : pageThumbnail;
    this.setState({
      imageSource: image,
    });
  }
  imageFetchFailed() {
    this.setState({
      imageSource: pageThumbnail,
    });
  }
  render() {
    const textClass = this.props.showFullTextClass ? this.props.showFullTextClass : '';
    const textClasses = `ui primary-text ${textClass}`;
    return (
			<div className="ui items mini-teaser page-min-teaser">
				<Item>
						<a className="ui mini image" href={this.props.imageOnClickLink} target="_blank" rel="noopener noreferrer">
						<img className="ui medium rounded image" alt="" src={this.state.imageSource} onError={this.imageFetchFailed} />
						</a>
					<Content>
							<a href={this.props.primaryTextOnClickLink} className={textClasses} target="_blank" rel="noopener noreferrer">{this.props.primaryText}</a>
							<div className="meta secondary-text location">
								<div>{this.props.secondaryText}</div>
							</div>
					</Content>
				 </Item>
			</div>
		);
  }
}

EventMiniTeaserCard.propTypes = {
  imageSource: PropTypes.string,
  imageOnClickLink: PropTypes.string,
  secondaryText: PropTypes.string,
  showFullTextClass: PropTypes.string,
  primaryTextOnClickLink: PropTypes.string,
  primaryText: PropTypes.string,
};

export default CardWrapper(EventMiniTeaserCard);
