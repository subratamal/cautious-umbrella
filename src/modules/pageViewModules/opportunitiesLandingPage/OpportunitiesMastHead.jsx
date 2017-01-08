import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EasyTransition from 'react-easy-transition';
import { OpportunitySearchForm, actions as searchFormActions } from '../../opportunitySearch';

/* Properties:-

1. getFormWithOutMastHead: function use for without masthead form render
2. getFormWithMastHead: search form render with masthead
3. searchMode: find state for render form
*/
class OpportunitiesMastHead extends React.Component {
  getFormWithOutMastHead() {
    return (
      <div className="column active-search">
        <EasyTransition path={window.location.pathname} initialStyle={{
          opacity: 0,
          transform: 'scaleY(0.5)',
        }} transition="opacity 0.6s ease-in, transform 0.3s ease-in-out 0.3s" finalStyle={{
          opacity: 1,
          transform: 'scaleY(1.0)',
        }}
        >
          <div className="ui grid padded sixteen wide column">
            <div className="ui segment sixteen column wide">
              <OpportunitySearchForm {...this.props} />
            </div>
          </div>
      </EasyTransition>
    </div>
);
  }

  getFormWithMastHead() {
    const mastHeadImg = require('../../../../static/images/university.jpg');

    const mastHead = {
      background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.1),rgba(0, 0, 0, 0.1)),url(' + mastHeadImg + ') center center no-repeat',
      backgroundSize: 'cover',
    };

    return (
      <div className="column deactive-search">
        <div className="row">
          <EasyTransition path={window.location.pathname} initialStyle={{
            opacity: 0,
            transform: 'scaleY(0.5)',
          }} transition="opacity 0.6s ease-in, transform 0.3s ease-in-out 0.3s" finalStyle={{
            opacity: 1,
            transform: 'scaleY(1.0)',
          }}
          >
          <div className="sixteen column wide masthead university-masthead" style={mastHead} >
            <div className="ui text inner-container">
              <div className="ui basic segment">
                <h1 className="ui inverted huge header center aligned">Your next Opportunity
                </h1>
                <OpportunitySearchForm {...this.props} />
                </div>
              </div>
            </div>
        </EasyTransition>
      </div>
    </div>
);
  }
  render() {
    return (
      <div className="ui page grid padded university-search-page">
      {this.props.searchMode
        ? this.getFormWithOutMastHead()
          : this.getFormWithMastHead()}
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    searchFormActions: bindActionCreators(searchFormActions, dispatch),
  };
}

// Connects dispatch and props to component
export default connect(null, mapDispatchToProps)(OpportunitiesMastHead);
