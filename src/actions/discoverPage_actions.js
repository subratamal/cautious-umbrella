import api from '../api/api';
import {discoverPageConfig} from '../defaults'

/*
	Actions for calling APIs for Discover Page
*/


/*Success State*/

export function setSuccessState (data,component){
	return {
		type : 'DISCOVERPAGE_SET_COMPONENT_STATE_SUCCESS',
		data,
		component
	}
}

/*Error State*/
export function setErrorState (data,component){
	return {
		type : 'SET_COMPONENT_STATE_ERROR',
		data,
		component
	}
}

export function fetchTopics() {
	return dispatch => {
		return api.getDiscoverSidebarTopics().then((result) => {
			dispatch(setSuccessState(result.data,discoverPageConfig.pageComponents.sideBarTopics))
		}).catch((err) => {
			dispatch(setErrorState(err,discoverPageConfig.pageComponents.sideBarTopics))

		})
	}
}

export function fetchProfiles() {
	return dispatch => {
		return api.getDiscoverSidebarProfiles().then((result) => {
			dispatch(setSuccessState(result.data,discoverPageConfig.pageComponents.sideBarProfiles))
		}).catch((err) => {
			dispatch(setErrorState(err,discoverPageConfig.pageComponents.sideBarProfiles))
		})
	}
}

export function fetchPages() {
	return dispatch => {

		return api.getDiscoverSidebarPages().then((result) => {
			dispatch(setSuccessState(result.data,discoverPageConfig.pageComponents.sideBarPages))

		}).catch((err) => {
			dispatch(setErrorState(err,discoverPageConfig.pageComponents.sideBarPages))
		})
	}
}

export function fetchDicoverStories() {
	return dispatch => {
		return api.getDiscoverStories().then((result) => {
			dispatch(setSuccessState(result.data,discoverPageConfig.pageComponents.stories))

		}).catch((err) => {
			dispatch(setErrorState(err,discoverPageConfig.pageComponents.stories))
		})
	}
}

export function fetchDicoverEvents() {
	return dispatch => {
		return api.getDiscoverEvents().then((result) => {
			dispatch(setSuccessState(result.data,discoverPageConfig.pageComponents.events))

		}).catch((err) => {
			dispatch(setErrorState(err,discoverPageConfig.pageComponents.events))
		})
	}
}


export function fetchPrimarySliderContent() {
	return dispatch => {
		return Promise.all([api.getDiscoverPrimarySliderStories(), api.getDiscoverPrimarySliderEvents()]).then((result) => {
			result[0].cardType = 'stories'
			result[1].cardType = 'events'
			dispatch(setSuccessState(result,discoverPageConfig.pageComponents.primarySlider))

		}).catch((err) => {
			dispatch(setErrorState(err,discoverPageConfig.pageComponents.primarySlider))
		})
	}
}
