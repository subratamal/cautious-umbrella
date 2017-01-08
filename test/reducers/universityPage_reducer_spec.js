import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';
import {reducerTestValues} from '../test_constants'
import {each} from 'underscore'

import reducer from '../../src/reducers/universityPage_reducer';
import {universityPageConfig} from '../../src/defaults'

function setUniversityStore (){
 let intitialState = new Map();
   each(universityPageConfig.pageComponents,function (value,key){
   var componentMap = new Map({
     'success' : false,
      data : null
   })
   intitialState = intitialState.set(value, componentMap);
   })
   var universityPageMap = new Map({
     successComponents : new List(),
     emptyComponents : new Map(),
     pageSuccess : false,
     pageError : false
   })
   intitialState = intitialState.set(universityPageConfig.parentComponent,universityPageMap);
   intitialState = intitialState.set('resultHeader',false);
   return intitialState;
}



describe('university page reducer', () => {

 it('handle search header active state', () => {
   const state = new Map({
     "resultHeader": false
   });
   const action = function () {
     return {
       'type': 'SET_RESULT_HEADER',
       status : true
     }
   }
   const nextState = reducer(state, action());
   expect(nextState).to.deep.equal(fromJS({
     "resultHeader": true
   }))
 })

 it('handle set component success state', () => {
   const state = setUniversityStore()
   const action = function () {
     return {
       'type': 'SET_COMPONENT_STATE_SUCCESS',
       data : 'data',
       component : universityPageConfig.sideBarStories
     }
   }
   const nextState = reducer(state, action());
   let componentData = nextState.getIn([universityPageConfig.sideBarStories,'data']);
   expect(componentData).to.equal('data');
   let successComponents = nextState.getIn([universityPageConfig.parentComponent,'successComponents'])
   expect(successComponents).to.include(universityPageConfig.sideBarStories);
 })
 it('handle set component success state with empty data', () => {
   const state = setUniversityStore()
   const action = function () {
     return {
       'type': 'SET_COMPONENT_STATE_SUCCESS',
       data : [],
       component : universityPageConfig.sideBarStories
     }
   }
   const nextState = reducer(state, action());
   let componentData = nextState.getIn([universityPageConfig.sideBarStories,'data']);
   expect(componentData.size).to.equal(0);
   let emptyComponents = nextState.getIn([universityPageConfig.parentComponent,'emptyComponents',universityPageConfig.sideBarStories])
   expect(emptyComponents).to.equal(true);
 })
 it('handle set component error state', () => {
   const state = setUniversityStore()
   const action = function () {
     return {
       'type': 'SET_COMPONENT_STATE_ERROR',
       data : [],
       component : universityPageConfig.sideBarStories
     }
   }
   const nextState = reducer(state, action());
   let errorFlag = nextState.getIn([universityPageConfig.parentComponent,'pageError'])
   expect(errorFlag).to.equal(true);
 })
 it('handle start component loader', () => {
   const state = setUniversityStore()
   const action = function () {
     return {
       'type': 'START_SEARCH_PROCESS_LOADER',
       data : [],
       component : universityPageConfig.pages
     }
   }
   const nextState = reducer(state, action());
   let loaderFlag = nextState.getIn([universityPageConfig.pages,'loader'])
   expect(loaderFlag).to.equal(true);
 })
 it('handle stop component loader', () => {
   const state = setUniversityStore()
   const action = function () {
     return {
       'type': 'STOP_SEARCH_PROCESS_LOADER',
       data : [],
       component : universityPageConfig.pages
     }
   }
   const nextState = reducer(state, action());
   let loaderFlag = nextState.getIn([universityPageConfig.pages,'loader'])
   expect(loaderFlag).to.equal(false);
 })
 it('handle store default pages', () => {
   const state = setUniversityStore()
   const action = function () {
     return {
       'type': 'STORE_DEFAULT_PAGES',
       data : 'data'
     }
   }
   const nextState = reducer(state, action());
   let componentData = nextState.getIn([universityPageConfig.pageComponents.pages,'defaultPages']);
   expect(componentData).to.equal('data');

 })

 it('handle reload default pages', () => {
   const state = setUniversityStore()
   const storeAction = function () {
     return {
       'type': 'STORE_DEFAULT_PAGES',
       data : 'data'
     }
   }
   const reloadAction = function () {
     return {
       'type': 'RELOAD_DEFAULT_PAGES'
     }
   }
   
   const storeState = reducer(state, storeAction());
   const reloadState = reducer(storeState, reloadAction());
   let componentData = reloadState.getIn([universityPageConfig.pageComponents.pages,'data']);
   expect(componentData).to.equal('data');

 })

});
