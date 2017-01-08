import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { SideBarPages } from './components/SideBarPages';
import { BlockCardContainer } from '../commonComponents/BlockCardsContainer';
import BlockCardWrapper from './components/SideBarBlockCardWrapper';
import makeGetPagesRecordsSelectors from './selectors';
import TitleBarAuthor from './components/TitleBarAuthor';
import SideBarAuthorDetails from './components/SideBarAuthorDetailsWrapper';

function getContentComponent(props) {
  switch (props.view) {
    case 'SideBar':
      return SideBarPages;
    case 'PrimaryContent':
      return BlockCardContainer;
    case 'SideBarOpportunityAuthor':
      return BlockCardWrapper;
    case 'SecondaryTitleBarAuthor':
      return TitleBarAuthor;
    case 'SideBarAuthorDetails':
      return SideBarAuthorDetails;
    default:
      return null;
  }
}

class PagesView extends React.Component {
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
  const recordSelector = makeGetPagesRecordsSelectors();
  const metaPropName = `${props.pageName}${props.view}Pages`;
  const selectorProps = {
    metaPropName,
    type: 'pages',
  };
  return {
    componentData: recordSelector(state, selectorProps),
  };
}
PagesView.propTypes = {
  pageName: PropTypes.string,
  view: PropTypes.string,
  componentData: PropTypes.array,
};

export default connect(mapStateToProps)(PagesView);
