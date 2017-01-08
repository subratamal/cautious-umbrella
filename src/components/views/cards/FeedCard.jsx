import React from 'react';
import { connect } from 'react-redux';
/* eslint-disable */
import { toJS } from 'immutable';
/* eslint-enable */
import _ from 'underscore';
import InfiniteScroll from 'react-infinite-scroller';
import PageFeedCard from './PageFeedCard';
import PeopleTopicFeedCard from './PeopleTopicFeedCard';
import { generatePageFeedCards } from '../../../utils/cardsGenerators/pageFeedGenerator';
import { serverErrors } from '../../../constants/messagesConfig';


class FeedCard extends React.Component {
  constructor(props) {
    super(props);
    this.feedCardArray = [];
    this.storyCount = 0;
    this.noRecrodsFlag = false;

    this.eventCount = 0;
    this.cardCount = 0;
  }

  componentDidMount() {
    let { profile } = this.props;
    profile = profile.toJS();
    const actions = this.props.apiActions;
    // call action to fetch the data
    const offset = 0;
    const limit = 10;
    actions.fetchHomeFeedData(profile.data.id, offset, limit);
  }

  componentWillUpdate(nextProps) {
    /*
      extract success or error from store props
    */
    this.successFlag = nextProps.componentData.get('success');
    this.error = nextProps.componentData.get('error');
    /* If no error compare new props tp previous ones
    and load if data changed or no data is present*/
    if (!this.error) {
      const {
          reducerName,
          componentName,
          parentComponent,
        } = this.props;
      const previousData = this.props.componentData.get('data');
      const nextData = nextProps.componentData.get('data');
      if (nextData && (!nextData.equals(previousData) || this.feedCardArray.length === 0)) {
        if (!nextData.isEmpty()) {
          const feedArray = nextData.toJS();
          if (feedArray.Message && feedArray.Message === serverErrors.noRecords) {
            this.noRecrodsFlag = true;
          } else {
            this.noRecrodsFlag = false;
            const currentLength = this.feedCardArray.length;
            const tempPropsArray = generatePageFeedCards(feedArray.slice(currentLength),
            reducerName, componentName, parentComponent, currentLength);
            _.each(tempPropsArray, (props, index) => {
              this.storyCount++;
              if (typeof props.body !== 'undefined') {
                this.feedCardArray.push(<div key={props.body.type + index + this.storyCount}>
                  <PageFeedCard {...props} {...props.body} {...this.props} /></div>);
              } else {
                this.feedCardArray.push(<div key={props.verb + index + this.storyCount}>
                  <PeopleTopicFeedCard {...props} index={index} feedLengthOffset={currentLength} /></div>);
              }
            });
          }
        } else {
          this.emptyFlag = true;
        }
      }
    }
  }

  loadMoreFeedData() {
    this.cardCount++;
    const cardLength = this.feedCardArray.length;
    if (cardLength >= 9 * this.cardCount) {
      const self = this;
      let profile = self.props.profile;
      profile = profile.toJS();
      const actions = this.props.apiActions;
      // call action to fetch the data
      const offset = self.feedCardArray.length + 1;
      const limit = 10;
      actions.fetchHomeFeedData(profile.data.id, offset, limit);
    } else {
      const { dispatch } = this.props;
      const { apiActions } = this.props;
      dispatch(apiActions.setHasMoreFeedData(false));
    }
  }
  render() {
    const self = this;
    function generateDOM() {
      if (self.successFlag) {
        if (self.noRecrodsFlag) {
          return (<div className="ui center aligned container">{serverErrors.noFeedMsg}</div>);
        }
        if (self.emptyFlag) {
          return (null);
        } else if (!self.emptyFlag) {
          return (
            <div>
                {self.feedCardArray}
            </div>
          );
        }
      }
      return null;
    }

    return (
      /* eslint-disable */
      <InfiniteScroll
        pageStart={0}
        loadMore={this.loadMoreFeedData.bind(this)}
        hasMore={this.props.hasMore}
        loader={<div className="ui active centered inline text loader">Loading ...</div>}
      >
      {generateDOM()}
      </InfiniteScroll>
      /* eslint-enable*/
    );
  }
}

function mapStateToProps(state, props) {
  return {
    profile: state.get('profile'),
    componentData: state.get(props.reducerName).get(props.componentName),
    storyCounter: state.get('homePage').get('storyCounter'),
    eventCounter: state.get('homePage').get('eventCounter'),
    hasMore: state.get('homePage').get('hasMore'),
  };
}

FeedCard.propTypes = {
  storyCounter: React.PropTypes.oneOfType([
    React.PropTypes.boolean,
    React.PropTypes.func,
  ]).isRequired,
  eventCounter: React.PropTypes.oneOfType([
    React.PropTypes.boolean,
    React.PropTypes.func,
  ]).isRequired,
  reducerName: React.PropTypes.string,
  componentName: React.PropTypes.string,
  parentComponent: React.PropTypes.string,
  componentData: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.func,
  ]).isRequired,
  dispatch: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.func,
  ]).isRequired,
  hasMore: React.PropTypes.oneOfType([
    React.PropTypes.boolean,
    React.PropTypes.func,
  ]).isRequired,
  profile: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.func,
  ]).isRequired,
  apiActions: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.func,
  ]).isRequired,
};

export default connect(mapStateToProps)(FeedCard);
