import React from 'react';
import { FollowButton } from '../../follow/FollowButton';
import { generatePageTeaserCards } from '../utils';
import PageTeaserCard from './PageTeaserCard';

const imageSource = require('../../../../static/images/logo.png');


class TitleBarAuthorStatic extends React.Component {
  constructor(props) {
    super(props);
    this.followButtonData = null;
    this.data = [];
  }

  componentWillUpdate(nextProps) {
    const nextData = nextProps.componentData && nextProps.componentData.length > 0 ? nextProps.componentData[0] : null;
    if (nextData) {
      const author = nextProps.componentData[0];
      const tempPropsArray =
				generatePageTeaserCards([author]);
      this.data = tempPropsArray[0];
    }
  }

  render() {
    const authorDetails =
		this.props.componentData && this.props.componentData.length > 0 ? this.props.componentData[0] : null;
    const self = this;
    return (
      <div className="opportunity-author">
        <div className="opportunity-author-interaction">
          <PageTeaserCard {...self.data} isWrapped={false} />
        </div>
     </div>);
  }
}

TitleBarAuthorStatic.propTypes = {
  reducerName: React.PropTypes.string,
  componentName: React.PropTypes.string,
  parentComponent: React.PropTypes.string,
  componentData: React.PropTypes.array,
};


export default (TitleBarAuthorStatic);
