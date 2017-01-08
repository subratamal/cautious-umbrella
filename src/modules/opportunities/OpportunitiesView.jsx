import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SideBarOpportunities from './components/SideBarSimilarOpportunities';
import { BlockCardContainer } from '../commonComponents/BlockCardsContainer';
import OpportunityTitleCard from './components/OpportunityTitleCard';
import OpportunityDetailsCard from './components/OpportunityDetailsCard';
import TitleBarOpportunity from './components/TitleBarOpportunity';
import TitleBarOpportunityName from './components/TitleBarOpportunityName';
import { makeOpportunitiesSelector } from './selectors';
import { createEntityNavigationUrl } from '../../utils/createNavigationUrl';
import * as actions from './actions';

function getContentComponent(props) {
  switch (props.view) {
    case 'PrimaryContent':
      return BlockCardContainer;
    case 'SideBarSimilarOpportunities':
      return SideBarOpportunities;
    case 'OpportunityTitleCard':
      return OpportunityTitleCard;
    case 'OpportunityDetailsCard':
      return OpportunityDetailsCard;
    case 'SecondaryTitleBarOpportunity':
      return TitleBarOpportunity;
    case 'SecondaryTitleBarOpportunityName':
      return TitleBarOpportunityName;
    default:
      return null;
  }
}

class OpportunitiesView extends React.Component {
/* on load acquire window side and accordingly set a flag on state */
  constructor(props) {
    super(props);
    this.openShareModal = this.openShareModal.bind(this);
  }
  componentWillMount() {
    this.content = getContentComponent(this.props);
  }

  componentDidMount() {
    const { componentData } = this.props;
    if (!componentData || !componentData.length) {
      switch (this.props.viewType) {
        case 'viewPage': {
          this.props.opportunitiesActions.fetchOpportunitiesViewData({ params: this.props.params });
        }
          break;
        default:
          return;
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { componentData } = this.props;
    if (!componentData || !componentData.length || (this.props.params && this.props.params !== prevProps.params)) {
      switch (this.props.viewType) {
        case 'viewPage': {
          this.props.opportunitiesActions.fetchOpportunitiesViewData({ params: this.props.params });
        }
          break;
        default:
          return;
      }
    }
  }

  openShareModal() {
    $('.ui.modal.share-modal').modal('show');
    const heading = this.props.componentData[0].title;
    const url = createEntityNavigationUrl(this.props.componentData[0].id, 'opportunities');
    const shareData = {
      heading,
      url,
    };
    const { opportunitiesActions } = this.props;
    opportunitiesActions.setFeedShareData(shareData);
  }

  render() {
    /* based on condition return grid or list*/
    const RenderComponent = this.content;
    if (RenderComponent) {
      return (<RenderComponent onShareClick={this.openShareModal} {...this.props} metaPropName={this.metaPropName} />);
    }
    return null;
  }
}

function mapStateToProps(state, props) {
  const recordSelector = makeOpportunitiesSelector();
  const metaPropName = `${props.pageName}${props.view}`;
  const selectorProps = {
    metaPropName,
    type: 'opportunities',
  };
  return {
    componentData: recordSelector(state, selectorProps),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    opportunitiesActions: bindActionCreators(actions, dispatch),
  };
}

OpportunitiesView.propTypes = {
  pageName: PropTypes.string,
  view: PropTypes.string,
  componentData: PropTypes.array,
  opportunitiesActions: PropTypes.object,
  viewType: PropTypes.string,
  params: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(OpportunitiesView);
