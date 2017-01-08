import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';
import {reducerTestValues} from '../test_constants'
import {each} from 'underscore'

import reducer from '../../src/reducers/discoverPage_reducer';
import {discoverPageConfig} from '../../src/defaults'

function setDiscvoerStore (){
 let intitialState = new Map();
    each(discoverPageConfig.pageComponents,function (value,key){
    var componentMap = new Map({
      'success' : false,
      'error' : null,
      data : null
    })
    intitialState = intitialState.set(value, componentMap);
    })
    var discoverPageMap = new Map({
      successComponents : new List(),
      emptyComponents : new Map(),
      pageSuccess : false,
      pageError : false
    })
    intitialState = intitialState.set(discoverPageConfig.parentComponent,discoverPageMap);
    return intitialState;
}



describe('discover page reducer', () => {

 it('handle set component success state', () => {
   const state = setDiscvoerStore()
   const action = function () {
     return {
       'type': 'DISCOVERPAGE_SET_COMPONENT_STATE_SUCCESS',
       data : 'data',
       component : discoverPageConfig.sideBarTopics
     }
   }
   const nextState = reducer(state, action());

   let componentData = nextState.getIn([discoverPageConfig.sideBarTopics,'data']);
   expect(componentData).to.equal('data');
   let successComponents = nextState.getIn([discoverPageConfig.parentComponent,'successComponents'])
   expect(successComponents).to.include(discoverPageConfig.sideBarTopics);
 })
 it('handle set component success state with empty data', () => {
   const state = setDiscvoerStore()
   const action = function () {
     return {
       'type': 'DISCOVERPAGE_SET_COMPONENT_STATE_SUCCESS',
       data : [],
       component : discoverPageConfig.sideBarTopics
     }
   }
   const nextState = reducer(state, action());
   let componentData = nextState.getIn([discoverPageConfig.sideBarTopics,'data']);
   expect(componentData.size).to.equal(0);
   let emptyComponents = nextState.getIn([discoverPageConfig.parentComponent,'emptyComponents',discoverPageConfig.sideBarTopics])
   expect(emptyComponents).to.equal(true);
 })
 it('handle set component error state', () => {
   const state = setDiscvoerStore()
   const action = function () {
     return {
       'type': 'SET_COMPONENT_STATE_ERROR',
       data : [],
       component : discoverPageConfig.sideBarTopics
     }
   }
   const nextState = reducer(state, action());
   let errorFlag = nextState.getIn([discoverPageConfig.parentComponent,'pageError'])
   expect(errorFlag).to.equal(true);
 })

});
