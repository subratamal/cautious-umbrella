import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import { toJS } from 'immutable'
import { bindActionCreators } from 'redux'
import InfiniteScroll from 'react-infinite-scroller'
import {
Card,
Content,
Item,
Icon,
Divider
} from 'react-semantify';
import PageFeedCard from './PageFeedCard'
import {generatePageFeedCards} from '../../../utils/cardsGenerators/pageFeedGenerator'
import _ from 'underscore'
import {serverErrors} from '../../../constants/messagesConfig'

import {
  breakPointsDefaults
} from '../../../defaults'

class FeedCardStory extends React.Component {
  constructor(props){
    super(props)
    this.feedCardArray = [];
    this.noRecrodsFlag = false;

    this.storyCount = 0;
    this.eventCount = 0;
    this.cardCount = 0;
  }

  componentDidMount() {
    let { profile } = this.props
    profile = profile.toJS()
    let actions = this.props.apiActions;
    // call action to fetch the data 
    const offset = 0;
    const limit = 10;

    actions.fetchHomeFeedStoryData(profile.data.id, offset, limit, this.props.feedType);
  }


  componentWillUpdate(nextProps, nextState) {
    /*
      extract success or error from store props
    */

    this.successFlag = nextProps.componentData.get('success');
    this.error = nextProps.componentData.get('error');
    /*If no error compare new props tp previous ones and load if data changed or no data is present*/
    if (!this.error) {
      let previousData = this.props.componentData.get('data');
      let nextData = nextProps.componentData.get('data');
      if (nextData && (!nextData.equals(previousData) || this.feedCardArray.length === 0)) {
        if (!nextData.isEmpty()) {
          let {
          reducerName,
          componentName,
          parentComponent
        } = this.props
          let feedArray = nextData.toJS()
          if (feedArray.Message && feedArray.Message === serverErrors.noRecords) {
              this.noRecrodsFlag  = true;
            }
            else{
              let currentLength = this.feedCardArray.length;

            let tempPropsArray = generatePageFeedCards(feedArray.slice(currentLength),reducerName,componentName,parentComponent,currentLength);
          _.each(tempPropsArray, (props, index) => {
            this.storyCount++;
              this.feedCardArray.push(<div key={props.body.type + index + this.storyCount}><PageFeedCard {...props} {...props.body} {...this.props}/></div>)      
            })
            }
          
        } else {
          this.emptyFlag = true;
        }
      }
    }
  }


  loadMoreFeedData(e) {
    this.cardCount++
    let cardLength = this.feedCardArray.length
    if(cardLength >= 10 * this.cardCount) {
      let self = this
      let profile = self.props.profile
      profile = profile.toJS()
      let actions = this.props.apiActions;
      // call action to fetch the data 
      const offset = self.feedCardArray.length + 1;
      const limit = 10;
     actions.fetchHomeFeedStoryData(profile.data.id, offset, limit, self.props.feedType);
    }  else {
      let { apiActions, dispatch } = this.props
      dispatch(apiActions.setHasMoreStoryFeedData(false));
    }
  }
  render() {
    let self = this
    function generateDOM() {
      if (self.successFlag) {
        if (self.noRecrodsFlag) {
          return (
                  <div className="ui center aligned container">{serverErrors.noFeedMsg}</div>
                )
        }
        if (self.emptyFlag) {
          return (null)
        } else {
          return (
            <div>
                {self.feedCardArray}
            </div>
          )
        }
      } 
      return null
    }

    return (
        <InfiniteScroll
      pageStart={0}
      loadMore={this.loadMoreFeedData.bind(this)}
      hasMore={this.props.hasMoreStory}
      loader={<div className="ui active centered inline text loader">Loading ...</div>}>
        {generateDOM()}
      </InfiniteScroll>
    )
  }
}

function mapStateToProps(state, props) {
    return {
        profile: state.get("profile"),
        componentData: state.get(props.reducerName).get(props.componentName),
        hasMoreStory : state.get('homePage').get('hasMoreStory')
    }
}

export default connect(mapStateToProps)(FeedCardStory)
