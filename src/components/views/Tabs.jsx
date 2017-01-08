import React from 'react';
import SwipeViews from '../../utils/swipeview.js';
/*
Properties:-

1. react slick
2. tab call

*/

class Tabs extends React.Component {
  componentDidMount() {
    $('.menu.tabs .item').tab();
  }
  render() {
    const tabUrl = `/${this.props.tabsUrl}#`;
    return (
      <div className="tabs-detail tabs-secondary-menu">
        <SwipeViews >
					{
						this.props.tabList.map((child, index) => {
  let content = (child.props.children ? child.props.children : child);
  content = child.props.computerOnly ? '' : content;
  const tabs = child.props.computerOnly ? '' : child.props.tabTitle;
  return (
    child.props.computerOnly ? '' :
      <div
        key={index}
        emptyState={child.props.emptyState}
        title={tabs}
      >
        {content}
      </div>
);
})
}
        </SwipeViews>
        <div className="ui divider hidden" />
      </div>
		);
  }
}

Tabs.propTypes = {
  tabsUrl: React.PropTypes.string,
  tabList: React.PropTypes.array,
};

export default Tabs;
