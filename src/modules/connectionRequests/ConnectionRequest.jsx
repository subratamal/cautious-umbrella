import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isArray, isEmpty, each } from 'underscore';
import { fetchConnectionRequests, updateRequestsState, resetUnseenCount } from './actions';
import { requestsChunkSize, connectionReqPopupStyle } from './constants';
import { generateProfileTeaserCards } from '../../utils/cardsGenerators/profileCardsGenerator';
import { isDOMAvailable } from '../../utils/domManipulationUtils';
import { ProfileTeaserCard } from '../profile';
import connectionRequestSelector from './selector';

function generateCurrentList(completeList, currentList, showMore) {
  const currentLength = currentList.length;
  const totalLenght = completeList.length;
  if ((currentLength < totalLenght && showMore) || (currentLength === 0 && !showMore)) {
    const lenghtDifference = totalLenght - currentLength;
    const chunkSize = (lenghtDifference >= requestsChunkSize ? requestsChunkSize : lenghtDifference);
    return (completeList.slice(0, currentLength + chunkSize));
  } else if (currentLength <= totalLenght && !showMore) {
    return (completeList.slice(0, currentLength));
  } else if (currentLength > totalLenght && !showMore) {
    return completeList;
  } else if (totalLenght === 0) {
    return completeList;
  }
  return currentList;
}


class ConnectionRequest extends React.Component {
  constructor(props) {
    super(props);
    this.showMoreConnectionRequest = this.showMoreConnectionRequest.bind(this);
    this.state = {
      dataSet: false,
      requestSeenFlag: false,
      completeTeaserArray: [],
      currentTeaserArray: [],
    };
    this.handleResize = this.handleResize.bind(this);
    this.requestsUpdated = this.requestsUpdated.bind(this);
    this.showConnectionRequest = this.showConnectionRequest.bind(this);
    this.showMoreConnectionRequest = this.showMoreConnectionRequest.bind(this);
    this.initializePopUp = this.initializePopUp.bind(this);
  }

  componentDidMount() {
    const { componentData } = this.props;
    if (isDOMAvailable()) {
      window.addEventListener('resize', this.handleResize);
      this.initializePopUp();
      $('.ui.popup.connection-req-menu-popup').css(connectionReqPopupStyle);
    }
    if (isArray(componentData.recordsArray) && !isEmpty(componentData.recordsArray)) {
      const teasersArray = [];
      const tempPropsArray = generateProfileTeaserCards(componentData.recordsArray, false);
      each(tempPropsArray, (props) => {
        teasersArray.push(<ProfileTeaserCard {...props} />);
      });
      this.setState({
        completeTeaserArray: teasersArray,
        currentTeaserArray: generateCurrentList(teasersArray, this.state.currentTeaserArray, false),
      });
    } else {
      this.props.fetchConnectionRequests(this.requestsUpdated);
    }
  }

  initializePopUp() {
    $('.ui.item.connection-req-element:not(.processed)')
       .popup({
         position: 'bottom right',
         popup: $('.connection-req-menu-popup'),
         on: 'click',
         target: $('.header-menu.logged-menu'),
       }).addClass('processed')
   ;
  }

  componentWillReceiveProps(nextProps) {
    const { componentData } = nextProps;
    if (isArray(componentData.recordsArray) && !isEmpty(componentData.recordsArray)) {
      const teasersArray = [];
      const tempPropsArray = generateProfileTeaserCards(componentData.recordsArray, false);
      each(tempPropsArray, (props) => {
        teasersArray.push(<ProfileTeaserCard {...props} />);
      });
      this.setState({
        completeTeaserArray: teasersArray,
        currentTeaserArray: generateCurrentList(teasersArray, this.state.currentTeaserArray, false),
      });
    } else {
      this.setState({
        completeTeaserArray: [],
        currentTeaserArray: [],
      });
    }
  }

  componentWillUnmount() {
    if (isDOMAvailable()) {
      window.removeEventListener('resize', this.handleResize);
    }
  }

  requestsUpdated(connectionRequestData) {
    if (this.state.dataSet) {
      this.props.updateRequestsState(connectionRequestData);
    } else {
      this.setState({
        dataSet: true,
      });
    }
  }

  handleResize() {
    if (window) {
      $('.ui.popup.connection-req-menu-popup').css(connectionReqPopupStyle);
    }
  }

  showConnectionRequest() {
    if (!this.state.requestSeenFlag && this.props.componentData.unseenCount) {
      this.props.resetUnseenCount();
      this.setState({
        requestSeenFlag: true,
      });
    }
  }

  showMoreConnectionRequest() {
    const self = this;
    this.setState({
      updateComponent: true,
      currentTeaserArray: generateCurrentList(this.state.completeTeaserArray, this.state.currentTeaserArray, true),
    });
  }

  render() {
    const { unseenCount } = this.props.componentData;
    const totalLenght = this.state.completeTeaserArray.length;
    const self = this;
    this.initializePopUp();
    return (
      <div className="connection-req-field">
        <div className="ui item connection-req-element" onClick={this.showConnectionRequest}>
          <i className="icon add user" />
            { unseenCount !== 0 ? <span className="connection-req-count">{ unseenCount }</span> : null}
        </div>
        <div className="ui popup bottom right connection-req-menu-popup">
        <div className="ui connection-req-menu-popup-header">
          Connections
        </div>
        { totalLenght ?
        <div className="connection-req-popup-pending">
          Pending Requests ({totalLenght})
        </div> :
        null}
          <div className="ui divided link items connection-req-popup-items  mini-teaser profile-min-teaser">
            {this.state.currentTeaserArray.length ? this.state.currentTeaserArray.map((card, index) => (
                <div className="item" key={index}>
                  {card}
                </div>
              )
            ) :
            <div className="no-connection-req-found">No Connection Requests</div>
          }
          {this.state.currentTeaserArray.length < this.state.completeTeaserArray.length ?
            <div className="ui link items view-more-btn">
                <div className="more-connection-req" onClick={this.showMoreConnectionRequest}>
                View more
              </div>
              </div>
              : null }
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    componentData: connectionRequestSelector(state),
  };
}
function mapDispatchToProps(dispatch) {
  return {
    fetchConnectionRequests: bindActionCreators(fetchConnectionRequests, dispatch),
    updateRequestsState: bindActionCreators(updateRequestsState, dispatch),
    resetUnseenCount: bindActionCreators(resetUnseenCount, dispatch),
  };
}

ConnectionRequest.propTypes = {
  componentData: PropTypes.object,
  fetchConnectionRequests: PropTypes.func,
  updateRequestsState: PropTypes.func,
  resetUnseenCount: PropTypes.func,
};

// Connects dispatch and props to component
export default connect(mapStateToProps, mapDispatchToProps)(ConnectionRequest) ;
