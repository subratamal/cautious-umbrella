/* Parent Layout Container*/
import React from 'react';
import { each, isArray } from 'underscore';
import { Grid, Column, Divider } from 'react-semantify';
import { breakPointsDefaults } from '../../defaults';
import Tabs from './Tabs';


/* Return two columend layout with sidebar
*/
const renderSideBarLargeDevice = function (primarySlider, primaryContent, sideBar, pageClassName) {
  let pageClass = '';
  pageClass = `page stackable centered two column vertically padded ${pageClassName}`;
  return (
    <Grid className={pageClass}>
        <Column className="mainbody-content">
            {primarySlider}
            {primarySlider ? <Divider className="hidden" /> : null}
            {primaryContent.map((child, index) => {
              if (child && child.props && !child.props.emptyState && (child.props.computerOnly !== false)) {
                return (
                  <Column key={index} ref={'child' + index}>
                    {child.props.showHeader == true ? <h4 className="ui dividing header">{child.props.tabTitle}</h4> : null}
                    {child.props.children}
                    <Divider className="hidden" />
                  </Column>
                );
              }
              else {
                return null;
              }
            })}

        </Column>

        <Column className="sidebar-content">
        {
          sideBar.map((child, index) => {
            if (child && child.props && !child.props.emptyState) {
              return (
                <Column key={index}>
                  {child}
                  <Divider className="hidden" />
                </Column>
              );
            }
          })
        }
        </Column>
      </Grid>
  );
};

const renderSideBarSmallDevice = function (primarySlider, primaryContent, sideBar, tabsUrl, pageClassName) {
  /* Adding screen height as minimum height to tab element
  *TODO : Find other way if required
  */
  let pageClass = '';
  pageClass = `stackable centered page  vertically padded ${pageClassName}`;
  const tabList = [];
  if (primaryContent) {
    primaryContent.map((child) => {
      if (child && child.props && !child.props.computerOnly) {
        tabList.push(child);
      }
    });
  }
  if (sideBar) {
    sideBar.map((child) => {
      if (child && child.props && !child.props.computerOnly) {
        tabList.push(child);
      }
    });
  }
  const screenHt = window.innerHeight;
  const tabsHeight = {
    minHeight: screenHt,
  };
  return (<Grid className={pageClass}>
        {primarySlider ?
          <Column className="sixteen wide" >
            {primarySlider}
          </Column> : null
        }
      <Column className="sixteen wide" style={tabsHeight}>
        <Tabs tabList={tabList} tabsUrl={tabsUrl} />
      </Column>

    </Grid>);
};

/* Return a column having primary slider and body contnet occupying full width */
const renderWithoutSideBar = function (primarySlider, primaryContent) {
  return (
    <Grid className="stackable centered vertically padded">
        <Column className="sixteen wide">
            {primarySlider}
        </Column>
        <Column className="sixteen wide tablet " >
            {primaryContent}
        </Column>
      </Grid>
  );
};

const renderSingleEntityViewPage = function (primarySlider, primaryContent, sideBar, pageClassName) {
  return (
    <Grid className="stackable centered vertically padded">
        { primarySlider && <Column className="sixteen wide tablet " >
        {primarySlider}
        </Column>}
        <Column className="sixteen wide tablet " >
            {primaryContent.map((child, index) => {
              if (child && child.props && (child.props.computerOnly !== false)) {
                return (
                  <Column key={index} ref={'child' + index}>
                    {child.props.children}
                  </Column>
                );
              }
              return null;
            })}
        </Column>
        <Column className="sixteen wide tablet " >
            {sideBar}
        </Column>
      </Grid>
  );
};

export const PageBody = React.createClass({
  getInitialState() {
    return {
      windowWidth: window.innerWidth,
    };
  },

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  },

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  },

  handleResize() {
    this.setState({
      windowWidth: window.innerWidth,
    });
  },

  render() {
    /* Saperate out slider, body content and sidebar content, retrieving children to removing extra div*/
    let primarySlider = null,
      sideBar = null,
      primaryContent = [],
      pageHeader = null;

    const pageClassName = this.props.pageClass ? this.props.pageClass : '';
    React.Children.map(this.props.children, (element, idx) => {
      if (element) {
        if (element.type && element.type.displayName === 'PrimarySlider') {
          primarySlider = element.props.children;
        }
        if (element.type && element.type.displayName === 'SideBar') {
          sideBar = element.props.children;
        }
        if (element.type && element.type.displayName === 'PrimaryContent') {
          if (!isArray(element.props.children)) {
            primaryContent.push(element.props.children);
          } else {
            each(element.props.children, (child) => {
              primaryContent.push(child);
            });
          }
        }
        if (element.type && element.type.displayName === 'PageHeaderText') {
          pageHeader = element.props.children;
        }
      }
    });

    if (sideBar && this.state.windowWidth > breakPointsDefaults.tablet) {
      this.content = renderSideBarLargeDevice(primarySlider, primaryContent, sideBar, pageClassName);
    } else if (sideBar && this.state.windowWidth <= breakPointsDefaults.tablet) {
      if (this.props.singleEntityViewPage) {
        this.content = renderSingleEntityViewPage(primarySlider, primaryContent, sideBar, pageClassName);
      } else {
        this.content = renderSideBarSmallDevice(primarySlider, primaryContent, sideBar, this.props.tabsUrl, pageClassName);
      }
    } else {
      this.content = renderWithoutSideBar(primarySlider, primaryContent);
    }
    /* If SideBar present render two columned layout with */
    return (
      <div className="ui main containers">
          {pageHeader}
          {this.content}
      </div>
    );
  },
});
