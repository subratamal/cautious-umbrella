import _ from 'underscore';
import countryData from 'country-data';
import { createEntityNavigationUrl, createOpportunityNavigationUrl } from '../../utils/createNavigationUrl';
import createLocationString from '../../utils/createLocationString';
import { createOpportunitiesDateFormat } from '../../utils/formatDate';
import { blockCardCoverImage } from '../../defaults';

export const createOpportunityLocationString = function (obj) {
  const countries = countryData.countries;
  let locationString = obj && obj.work_from_home && obj.work_from_home !== '0' ? 'Work from home, ' : '';
  if (obj && obj.locations && obj.locations.length) {
    obj.locations.forEach(locationData => {
      const appendage = locationData.city ? locationData.city : countries[locationData.country].name;
      locationString = `${locationString}${appendage}, `;
    });
  }
  const locationValue = locationString.slice(0, -2);
  return locationValue;
};

export const generateOpportunitiesFeaturedCardsProps = function (opportunities, reducerName, componentName, sliderDataIndex, parentComponent) {
  const tempBlockArray = [];
  _.each(opportunities, (obj) => {
    const pageUrl = createOpportunityNavigationUrl(obj.id);
    // const location = obj.locations ? createLocationString(obj.locations[0]) : '';
    const location = createOpportunityLocationString(obj);
    const author = obj.author;
 /* Create navigation url for user image and name click*/
    const authorProfileUrl = createEntityNavigationUrl(author.id, author.type);
    const authorLocation = createLocationString(author.location);
 // Props for profile mini teaser
    const authorMiniTeaserData = {
      imageOnClickLink: authorProfileUrl,
      imageSource: author.display_picture ? author.display_picture.image_100_100 : '',
      primaryTextOnClickLink: authorProfileUrl,
      primaryText: author.title,
      secondaryText: authorLocation,
    };

    const details = {
      deadline: createOpportunitiesDateFormat(obj.deadline),
      compensation: obj.compensation,
      vacancies: obj.vacancies,
    };

    const interactivityCardData = {
      subType: obj.subtype,
      entityId: obj.id,
      saved: obj.saved,
      applied: obj.applied,
      type: obj.type,
    };

    const opportunity = {
      imageOnClickLink: pageUrl,
      imageSource: obj.author.cover_picture ?
       obj.author.cover_picture.cdin_responsive_cover_image_full__style720 : blockCardCoverImage,
      imageMobileSource: obj.author.cover_picture ? obj.author.cover_picture.cover_explore : null,
      primaryTextOnClickLink: pageUrl,
      primaryText: obj.title,
      secondaryImageSource: obj.author && obj.author.display_picture ? obj.author.display_picture.image_100_100 : '',
      secondaryText: location,
      secondaryTextOnClickLink: pageUrl,
      details,
    };

    const OpportunityFeaturedCardProps = {
      opportunity,
      profileMiniTeaserCardContent: authorMiniTeaserData,
      interactivityCardContent: interactivityCardData,
    };

    tempBlockArray.push(OpportunityFeaturedCardProps);
  });
  return tempBlockArray;
};

export const idGenerator = function () {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 10; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export const generateOpportunitiesBlockCards = function (opportunities, reducerName, componentName, parentComponent) {
  const opportunityCardsArray = [];
  _.each(opportunities, (opportunity) => {
 /* Get author info from each object
 TODO - Get user prfile url to navigate to
  */
    const author = opportunity.author;

 /* Create navigation url for user image and name click*/
    const authorProfileUrl = createEntityNavigationUrl(author.id, author.type);
 // Props for profile mini teaser
    const authorMiniTeaserData = {
      imageOnClickLink: authorProfileUrl,
      imageSource: author.display_picture ? author.display_picture.image_100_100 : '',
      primaryTextOnClickLink: authorProfileUrl,
      primaryText: author.title,
      secondaryText: (author.location ? author.location.city : ''),
    };

    const interactivityCardData = {
      subType: opportunity.subtype,
      entityId: opportunity.id,
      saved: opportunity.saved,
      applied: opportunity.applied,
      type: opportunity.type,
    };

    const opportunityBlockCardProps = {
      imageSource: (opportunity.cover_picture ? opportunity.cover_picture.cover_explore : null),
      imageOnClickLink: createOpportunityNavigationUrl(opportunity.id),
      primaryTextOnClickLink: createOpportunityNavigationUrl(opportunity.id),
      primaryText: opportunity.title,
      secondaryText: author.title,
      secondaryTextOnClickLink: authorProfileUrl,
      profileMiniTeaserCardContent: authorMiniTeaserData,
      interactivityCardContent: interactivityCardData,
    };

    opportunityCardsArray.push(opportunityBlockCardProps);
  });
  return opportunityCardsArray;
};

export const generateOpportunitiesResultsBlockCards = function (opportunities, reducerName, componentName, parentComponent) {
  const opportunityCardsArray = [];
  _.each(opportunities, (opportunity) => {
 /* Get author info from each object
 TODO - Get user prfile url to navigate to
  */
    let author = opportunity.author;
    if (opportunity.author) {
      if (opportunity.author.data && opportunity.author.data.length > 0) {
        author = opportunity.author.data[0];
      }
    }

 /* Create navigation url for user image and name click*/
    const authorProfileUrl = createEntityNavigationUrl(author.id, author.type);
 // Props for profile mini teaser
    const authorMiniTeaserData = {
      imageOnClickLink: authorProfileUrl,
      imageSource: author.display_picture ? author.display_picture.image_100_100 : '',
      primaryTextOnClickLink: authorProfileUrl,
      primaryText: author.title,
      secondaryText: (author.location ? author.location.city : ''),
    };

    const interactivityCardData = {
      subType: opportunity.subtype,
      entityId: opportunity.id,
      saved: opportunity.saved,
      applied: opportunity.applied,
      type: opportunity.type,
    };

    const opportunityBlockCardProps = {
      imageSource: (opportunity.cover_picture ? opportunity.cover_picture.cover_explore : null),
      imageOnClickLink: createOpportunityNavigationUrl(opportunity.id),
      primaryTextOnClickLink: createOpportunityNavigationUrl(opportunity.id),
      primaryText: opportunity.title,
      secondaryText: author.title,
      secondaryTextOnClickLink: authorProfileUrl,
      profileMiniTeaserCardContent: authorMiniTeaserData,
      interactivityCardContent: interactivityCardData,
    };


    opportunityCardsArray.push(opportunityBlockCardProps);
  });
  return opportunityCardsArray;
};


export const generateOpportunitiesMiniTeaserCards = function (teasers, mobileFlag) {
  const tempTeasersArray = [];
  _.each(teasers, (obj) => {
    const author = obj.author;
    const authorUrl = createEntityNavigationUrl(author.id, author.type);
    const entityUrl = `/opportunities/${obj.id}`;

    const interactivityCardData = {
      subType: obj.subtype,
      entityId: obj.id,
      saved: obj.saved,
      applied: obj.applied,
      type: obj.type,
    };

    const miniTeaserData = {
      imageOnClickLink: entityUrl,
      imageSource: (obj.author && obj.author.cover_picture ? obj.author.cover_picture.image_100_100 : null),
      primaryTextOnClickLink: entityUrl,
      primaryText: obj.title,
      secondaryTextOnClickLink: authorUrl,
      secondaryText: obj.author ? obj.author.title : '',
      isWrapped: mobileFlag,
      interactivityCardData,
    };
    tempTeasersArray.push(miniTeaserData);
  });
  return tempTeasersArray;
};
