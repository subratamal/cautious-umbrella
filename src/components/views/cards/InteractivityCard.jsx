import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Icon, Item, Content } from 'react-semantify';
import { connect } from 'react-redux';
import * as interactivityActions from '../../../actions/interactivity_actions';
/*
Properties -
reducerName - name of the reducer as specified in defaults for the current page
ParentName - name of the parent as specified in defaults for the current page
storeIndex - index of the data in store where the current entity is stored
sliderDataIndex  - index of the data in slider(required only for primary slider)
entityID - id of the entity to which interactivity is connected
*/
export class InteractivityCardStatic extends React.Component {
  constructor(props) {
    super(props);
    this.saveAction = this.saveAction.bind(this);
    this.recommendAction = this.recommendAction.bind(this);
    this.deleteSaveAction = this.deleteSaveAction.bind(this);
    this.deleteRecommmendAction = this.deleteRecommmendAction.bind(this);
    this.cardData = {};
  }
  recommendAction() {
    const params = {
      type: this.props.type,
      entityId: this.props.entityId,
      storeIndex: this.props.storeIndex,
      sliderDataIndex: this.props.sliderDataIndex,
      componentName: this.props.componentName,
      parentComponent: this.props.parentComponent,
      homeFeed: this.props.homeFeed };
    const cardData = this.props.cardData.toJS();
    if (!cardData.isRecommending) {
      this.props.apiActions.recommend(params, cardData.recommend_count);
    }
  }
  deleteRecommmendAction() {
    const params = {
      type: this.props.type,
      entityId: this.props.entityId,
      storeIndex: this.props.storeIndex,
      sliderDataIndex: this.props.sliderDataIndex,
      componentName: this.props.componentName,
      parentComponent: this.props.parentComponent,
      homeFeed: this.props.homeFeed };
    const cardData = this.props.cardData.toJS();
    if (!cardData.isRecommending) {
      this.props.apiActions.removeRecommend(params, cardData.recommended, cardData.recommend_count);
    }
  }
  saveAction() {
    const params = {
      type: this.props.type,
      entityId: this.props.entityId,
      storeIndex: this.props.storeIndex,
      sliderDataIndex: this.props.sliderDataIndex,
      componentName: this.props.componentName,
      parentComponent: this.props.parentComponent,
      homeFeed: this.props.homeFeed };
    const cardData = this.props.cardData.toJS();
    if (!cardData.isSaving) {
      this.props.apiActions.saves(params);
    }
  }
  deleteSaveAction() {
    const params = {
      type: this.props.type,
      entityId: this.props.entityId,
      storeIndex: this.props.storeIndex,
      sliderDataIndex: this.props.sliderDataIndex,
      componentName: this.props.componentName,
      parentComponent: this.props.parentComponent,
      homeFeed: this.props.homeFeed };
    const cardData = this.props.cardData.toJS();
    if (!cardData.isSaving) {
      this.props.apiActions.removeSave(params, cardData.saved);
    }
  }
  render() {
    const self = this;
    let isSaving, isRecommending = false;
    let cardData = {};
    if (this.props.cardData && this.props.cardData.toJS()) {
      cardData = this.props.cardData.toJS();
    }
    const containerClass = 'ui secondary pointing menu item extra interactivity-card ' + (this.props.homeFeed ? 'four' : 'three');
    return (
      <Content className={containerClass}>
          {cardData.recommended === '0' ?
            <Item type="link" onClick={this.recommendAction}>
            <Icon className={cardData.isRecommending ? 'heart active red disabled' : 'empty heart'} />
            {cardData.recommend_count}
          </Item>
            :
            <Item type="link" onClick={this.deleteRecommmendAction}>
            <Icon className={cardData.isRecommending ? ' heart active red disabled' : ' heart active red'} />
            {cardData.recommend_count}
          </Item>
          }
           <Item type="link" className="commenting-option">
            <Icon className="comment outline" />
            {cardData.comment_count}
          </Item>
          {this.props.homeFeed ?
            <Item type="link" onClick={this.props.onShareClick}>
                    <Icon className="share" />
                    Share
                  </Item> : null
          }
          {cardData.saved === '0' ?
            <Item type="link" onClick={this.saveAction}>
            <Icon className={cardData.isSaving ? 'save active red disabled' : 'save'} />
            Save
          </Item>
            :
            <Item type="link" onClick={this.deleteSaveAction}>
            <Icon className={cardData.isSaving ? 'save active red disabled' : 'save active red'} />
            <span>Saved</span>
            </Item>
          }
        </Content>
    );
  }
}

InteractivityCardStatic.propTypes = {
  type: PropTypes.string.isRequired,
  entityId: PropTypes.string.isRequired,
  storeIndex: PropTypes.number.isRequired,
  sliderDataIndex: PropTypes.number,
  componentName: PropTypes.string.isRequired,
  parentComponent: PropTypes.string.isRequired,
  connectionId: PropTypes.string,
  apiActions: PropTypes.object.isRequired,
  cardData: PropTypes.object,
};
/* if the interactivtiy card is in slider it will have sliderDataIndex */
function mapStateToProps(state, props) {
  const stateData = state.get(props.reducerName).get(props.componentName).get('data');
  if (props.homeFeed) {
    return {
      cardData: stateData.get(props.storeIndex).get('object').get('data').get('0'),
    };
  }
  /* If not home feed*/
  else {
    if (props.sliderDataIndex !== undefined) {
      if (stateData.get(props.sliderDataIndex)) {
        return {
          cardData: stateData.get(props.sliderDataIndex).get('data').get(props.storeIndex),
        };
      } else {
        cardData: null;
      }
    } else {
      return {
        cardData: stateData.get(props.storeIndex),
      };
    }
    return {
    };
  }
}
function mapDispatchToProps(dispatch) {
  return { apiActions: bindActionCreators(interactivityActions, dispatch) };
}
export const InteractivityCard = connect(mapStateToProps, mapDispatchToProps)(InteractivityCardStatic);
