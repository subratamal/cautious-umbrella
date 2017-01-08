import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import SideBarStories from './components/SideBarStories';
import makeSelector from './selectors';

function getContentComponent(props) {
  switch (props.view) {
    case 'SideBar':
      return SideBarStories;
    default:
      return null;
  }
}

class StoriesView extends React.Component {
/* on load acquire window side and accordingly set a flag on state */
  componentWillMount() {
    const { pageName, view } = this.props;
    this.content = getContentComponent(this.props);
  }

  render() {
    /* based on condition return grid or list*/
    const RenderCompoent = this.content;
    if (RenderCompoent) {
      return (<RenderCompoent {...this.props} componentData={this.props.componentData} />);
    }
    return null;
  }
}

function mapStateToProps(state, props) {
  const recordSelector = makeSelector();
  const metaPropName = `${props.pageName}${props.view}Stories`;
  const selectorProps = {
    metaPropName,
    type: 'story',
  };
  return {
    componentData: recordSelector(state, selectorProps),
  };
}

StoriesView.propTypes = {
  pageName: PropTypes.string,
  view: PropTypes.string,
  componentData: PropTypes.array,
};

export default connect(mapStateToProps)(StoriesView);
