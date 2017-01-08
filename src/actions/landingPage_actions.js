import api from '../api/api';
import {landingPageConfig} from '../defaults'

/*
	Actions for calling APIs for Landing Page
*/


/*Success State*/

export function setSuccessState (data,component){
	return {
		type : landingPageConfig.parentComponent.toUpperCase()+'_SET_COMPONENT_STATE_SUCCESS',
		data,
		component
	}
}

/*Error State*/
export function setErrorState (data,component){
	return {
		type : landingPageConfig.parentComponent.toUpperCase()+'_SET_COMPONENT_STATE_ERROR',
		data,
		component
	}
}

export function fetchTopics() {
	return dispatch => {
		return api.getLandingSidebarTopics().then((result) => {
			dispatch(setSuccessState(result.data,landingPageConfig.pageComponents.sideBarTopics))
		}).catch((err) => {
			dispatch(setErrorState(err,landingPageConfig.pageComponents.sideBarTopics))

		})
	}
}

export function fetchProfiles() {
	return dispatch => {
		return api.getLandingSidebarProfiles().then((result) => {
			dispatch(setSuccessState(result.data,landingPageConfig.pageComponents.sideBarProfiles))
		}).catch((err) => {
			dispatch(setErrorState(err,landingPageConfig.pageComponents.sideBarProfiles))
		})
	}
}

export function fetchPages() {
	return dispatch => {
		
		return api.getLandingSidebarPages().then((result) => {
			dispatch(setSuccessState(result.data,landingPageConfig.pageComponents.sideBarPages))
			
		}).catch((err) => {
			dispatch(setErrorState(err,landingPageConfig.pageComponents.sideBarPages))
		})
	}
}

export function fetchDicoverStories() {
	return dispatch => {
		return api.getLandingStories().then((result) => {
			dispatch(setSuccessState(result.data,landingPageConfig.pageComponents.stories))
			
		}).catch((err) => {
			dispatch(setErrorState(err,landingPageConfig.pageComponents.stories))
		})
	}
}

export function fetchDicoverEvents() {
	return dispatch => {
		return api.getLandingEvents().then((result) => {
			dispatch(setSuccessState(result.data,landingPageConfig.pageComponents.events))
			
		}).catch((err) => {
			dispatch(setErrorState(err,landingPageConfig.pageComponents.events))
		})
	}
}


export function fetchPrimarySliderContent() {
	return dispatch => {
		return Promise.all([api.getLandingPrimarySliderStories(), api.getLandingPrimarySliderEvents()]).then((result) => {
			result[0].cardType = 'stories'
			result[1].cardType = 'events'
			
			dispatch(setSuccessState(result,landingPageConfig.pageComponents.primarySlider))
			
		}).catch((err) => {
			dispatch(setErrorState(err,landingPageConfig.pageComponents.primarySlider))
		})
	}
}