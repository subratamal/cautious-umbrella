import React, { Component, PropTypes } from 'react';
import {
  Divider,
  Icon,
  Menu,
  Item,
} from 'react-semantify';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EventSearchForm from './EventSearchForm';
import * as searchFormAction from '../../../actions/eventsPage_actions';
import EasyTransition from 'react-easy-transition';
import { isServer, isUnitTesting } from '../../../utils/utils';
import { breakPointsDefaults } from '../../../defaults';
/* Properties:-

1. getFormWithOutMastHead: function use for without masthead form render
2. getFormWithMastHead: search form render with masthead
3. resultHeader: find state for render form
*/
const mastHeadDesktopImage = require('../../../../static/images/eventsPageCover-deskTop.png');
const mastHeadMobileImage = require('../../../../static/images/eventsPageCover-mobile.png');

class EventsHead extends React.Component {
  constructor() {
    super();

    this.deafultArray = [];
    if (window.innerWidth <= breakPointsDefaults.tablet) {
      this.state = {
        mobileView: true,
      };
    } else {
      this.state = {
        mobileView: false,
      };
    }

    // Override the state.mobileView incase of server rendering.
    if (isServer() && !isUnitTesting()) {
      this.state = {
        mobileView: false,
      };
    }
    this.state.defaultDropdownResult = [];
    this.handleResize = this.handleResize.bind(this);
  }
  componentWillReceiveProps(nextProps) {
/*
extract success or error from store props
*/
    this.successFlag = nextProps.componentData.get('success');
    this.error = nextProps.componentData.get('error');

/* If no error compare new props tp previous ones and load if data changed or no data is present*/
    const previousData = this.props.componentData.get('data');
    const nextData = nextProps.componentData.get('data');

    if (!this.error) {
      const previousData = this.props.componentData.get('data');
      const nextData = nextProps.componentData.get('data');
      if (nextData && (!nextData.equals(previousData))) {
        if (!nextData.isEmpty()) {
          const defaultEventsArray = nextData.toJS();
          this.deafultArray = defaultEventsArray;
        } else {
          this.emptyFlag = true;
        }
      }
    }
  }

  handleResize() {
    if (window.innerWidth <= breakPointsDefaults.tablet && this.state.mobileView == false) {
      this.setState({
        mobileView: true,
      });
    } else if (window.innerWidth > breakPointsDefaults.tablet && this.state.mobileView == true) {
      this.setState({
        mobileView: false,
      });
    }
  }

  componentWillMount() {
    const data = this.props.componentData.get('data');
/* If no error compare new props tp previous ones and load if data changed or no data is present*/
    if (data) {
      if (!data.isEmpty()) {
        const defaultEventsArray = data.toJS();
        this.deafultArray = defaultEventsArray;
      } else {
        this.emptyFlag = true;
      }
    }
  }

  getFormWithOutHead() {
    return (
  <div className="column active-search">
<EasyTransition
  path={window.location.pathname}
  initialStyle={{ opacity: 0, transform: 'scaleY(0.5)' }}
  transition="opacity 0.6s ease-in, transform 0.3s ease-in-out 0.3s"
  finalStyle={{ opacity: 1, transform: 'scaleY(1.0)' }}
>
  <div className="ui grid padded sixteen wide column">
<div className="ui segment sixteen column wide">
<EventSearchForm {...this.props} deafultArray={this.deafultArray} />
</div>
</div>

</EasyTransition>
  </div>
  );
  }

  getFormWithHead() {
    const self = this;
    let mastHeadImg = mastHeadDesktopImage;
    if (self.state.mobileView) {
      mastHeadImg = mastHeadMobileImage;
    }

    const mastHead = {
      background: `linear-gradient(0deg, rgba(0, 0, 0, 0.2),rgba(0, 0, 0, 0.2)),url(${mastHeadImg}) center center no-repeat`,
      backgroundSize: 'cover', /* In css required importent */
    };

    return (
      <div className="column deactive-search">
        <div className="row">
          <EasyTransition
            path={window.location.pathname}
            initialStyle={{ opacity: 0, transform: 'scaleY(0.5)' }}
            transition="opacity 0.6s ease-in, transform 0.3s ease-in-out 0.3s"
            finalStyle={{ opacity: 1, transform: 'scaleY(1.0)' }}
          >
            <div className="sixteen column wide masthead university-masthead" style={mastHead}>
              <div className="ui text inner-container">
                <div className="ui basic segment">
                  <h1 className="ui inverted huge header center aligned">India's Best College Events and Student Competitions</h1>
                  <EventSearchForm {...this.props} deafultArray={this.deafultArray} />
                </div>
              </div>
            </div>
          </EasyTransition>
        </div>
      </div>
    );
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    return (
      <div className="ui page grid padded university-search-page">
        {this.props.resultHeader === false ? this.getFormWithHead() : this.getFormWithOutHead() }
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    resultHeader: state.get('eventsPage').get('resultHeader'),
    componentData: state.get(props.reducerName).get(props.componentName),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    searchFormAction: bindActionCreators(searchFormAction, dispatch),

  };
}


export default connect(mapStateToProps, mapDispatchToProps)(EventsHead);
