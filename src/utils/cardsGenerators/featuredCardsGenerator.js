/*Utilities for genrating array of featured cards Props from data*/
import React from 'react'
import {createEntityNavigationUrl} from '../createNavigationUrl'
import {
	createEventDateFormat,
	createGeneralDateFormat
} from '../formatDate'
import _ from 'underscore'
import {blockCardCoverImage} from '../../defaults'
import createLocationString from '../createLocationString'




/*
	@params array of stories recieved from api
	@return array of StoryBlockCards
*/
export const generateStoryFeaturedCardsProps = function(stories,reducerName,componentName,sliderDataIndex,parentComponent) {
	let storyCardsArray = []
	_.each(stories, function(storyData,index) {
		/* Get author info from each object
			TODO - Get user prfile url to navigate to
		 */
		let author = storyData.author.data[0];
		/* Create navigation url for user image and name click*/
		let authorProfileUrl = createEntityNavigationUrl(author.id,author.type)

		// Props for profile mini teaser
		let authorMiniTeaserData = {
			imageOnClickLink: authorProfileUrl,
			imageSource: author.display_picture.image_100_100,
			primaryTextOnClickLink:authorProfileUrl,
			primaryText: author.name,
			secondaryText: (author.current_campus.data[0]? author.current_campus.data[0].rel_value:"")
		}

		let interactivityCardData = {
			reducerName : reducerName,
			componentName : componentName,
			sliderDataIndex : sliderDataIndex,
			parentComponent : parentComponent,
			storeIndex : index,
			type : storyData.type,
			entityId : storyData.id,

		}
		// Story update time
		let stooryUpdateTimeStamp = createGeneralDateFormat(storyData.updated_time);
		let story = {
			imageSource : (storyData.cover_picture?storyData.cover_picture.cdin_responsive_cover_image_full__style720 : blockCardCoverImage),
			imageOnClickLink : createEntityNavigationUrl(storyData.id,storyData.type),
			primaryTextOnClickLink : createEntityNavigationUrl(storyData.id,storyData.type),
            primaryText : storyData.title,
            secondaryTextOne : stooryUpdateTimeStamp
		}

		let storyBlockCardProps = {
			story,
			profileMiniTeaserCardContent : authorMiniTeaserData,
			interactivityCardContent : interactivityCardData
		}

		storyCardsArray.push(storyBlockCardProps)
	})
	return storyCardsArray;
}

/*
	@params array of events recieved from api
	@return array of EventBlockCards
*/
export const generateEventFeaturedCardsProps = function(events,reducerName,componentName,sliderDataIndex,parentComponent) {
	let eventCardsArray = []
	_.each(events, function(eventData,index) {
		/* Get author info from each object
			TODO - Get user prfile url to navigate to
		 */
		let author = eventData.author.data[0];
		/* Create navigation url for user image and name click*/
		let authorProfileUrl = createEntityNavigationUrl(author.id,author.type)

		// Props for profile mini teaser
		let authorMiniTeaserData = {
			imageOnClickLink: authorProfileUrl,
			imageSource: author.display_picture.image_100_100,
			primaryTextOnClickLink:authorProfileUrl,
			primaryText: author.name,
			secondaryText: (author.current_campus.data[0]? author.current_campus.data[0].rel_value:"")
		}

		let interactivityCardData = {
			reducerName : reducerName,
			componentName : componentName,
			sliderDataIndex : sliderDataIndex,
			parentComponent : parentComponent,
			storeIndex : index,
			type : eventData.type,
			entityId : eventData.id
		}
		let eventTimeSpan;
		/*Create secondarytextone to show eventData start time and end time or Happing now tag */
		if(eventData.active_label === "happening now"){

			eventTimeSpan = "Happening Now" + ' - ' + createEventDateFormat(eventData.end_time);
		}
		else{
			eventTimeSpan = createEventDateFormat(eventData.strat_time) + ' - ' + createEventDateFormat(eventData.end_time);
		}
		let location = createLocationString(eventData.location);

		let event = {
			imageSource : (eventData.cover_picture?eventData.cover_picture.cdin_responsive_cover_image_full__style720 : blockCardCoverImage ),
            primaryText : eventData.title,
            imageOnClickLink : createEntityNavigationUrl(eventData.id,eventData.type),
            primaryTextOnClickLink : createEntityNavigationUrl(eventData.id,eventData.type),
            secondaryTextOne : eventTimeSpan,
            secondaryTextTwo : location
		}
		let eventBlockCardProps = {
			event,
			profileMiniTeaserCardContent : authorMiniTeaserData,
			interactivityCardContent : interactivityCardData
		}

		eventCardsArray.push(eventBlockCardProps)
	})
	return eventCardsArray;

}



/*
	Page Block Card
	@params block - array
	@return array of block
*/
export const  generatePageFeaturedCardsProps = function(pages,reducerName,componentName,sliderDataIndex,parentComponent) {
	let tempBlockArray = [];
	_.each(pages, (obj,index)=>{
		let pageUrl = createEntityNavigationUrl(obj.id,obj.type);
		let location = createLocationString(obj.location);

		let followButtonData = {
			reducerName : reducerName,
			parentComponent : parentComponent,
			storeIndex : index,
			sliderDataIndex : sliderDataIndex,
			componentName : componentName,
			type : obj.type,
			entityId : obj.id
		}
		let blockData = {
			imageOnClickLink: pageUrl,
			imageSource: obj.cover_picture?obj.cover_picture.cdin_responsive_cover_image_full__style720:blockCardCoverImage,
			imageMobileSource : obj.cover_picture?obj.cover_picture.cover_explore:null,
			primaryTextOnClickLink: pageUrl,
			primaryText: obj.title,
			secondaryImageSource: obj.display_picture.image_100_100,
			secondaryText: location,
			secondaryTextOnClickLink: pageUrl,
			followButtonData
		}
		tempBlockArray.push({pages:blockData})
	})
	return tempBlockArray;
}
