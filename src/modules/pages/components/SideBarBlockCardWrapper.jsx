import React, { Component, PropTypes } from 'react';
import { generatePageBlockCardsProps } from '../utils';
import PageBlockCard from './PageBlockCard';

export default class PageBlockCardWrapper extends React.Component {
  render() {
    const data = this.props.componentData ? generatePageBlockCardsProps(this.props.componentData)[0] : null;
    if (!data) {
      return null;
    }
    return (<PageBlockCard {...data} {...this.props} showFullTextClass="showFullText" />);
  }
}

PageBlockCardWrapper.propTypes = {
  componentData: PropTypes.array,
  reducerName: PropTypes.string,
  componentName: PropTypes.string,
  parentComponent: PropTypes.string,
};
