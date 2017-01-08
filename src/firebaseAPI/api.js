/* Api interface for consumption in components
**Exports a map which makes use of apiIndex for calling Api
*/
import * as actions from './api_bundle';

module.exports = Object.assign({

/* Discover Page apis */
  getDiscoverStories() {
    return actions.getDiscoverStories();
  },
  getDiscoverEvents() {
    return actions.getDiscoverEvents();
  },
  getDiscoverSidebarTopics() {
    return actions.getDiscoverSidebarTopics();
  },
  getDiscoverSidebarPages() {
    return actions.getDiscoverSidebarPages();
  },
  getDiscoverSidebarProfiles() {
    return actions.getDiscoverSidebarProfiles();
  },
  getDiscoverPrimarySliderData() {
    return actions.getDiscoverPrimarySliderData();
  },
/* Landing Page apis */
  getLandingStories() {
    return actions.getLandingStories();
  },
  getLandingEvents() {
    return actions.getLandingEvents();
  },
  getLandingSidebarTopics() {
    return actions.getLandingSidebarTopics();
  },
  getLandingSidebarPages() {
    return actions.getLandingSidebarPages();
  },
  getLandingSidebarProfiles() {
    return actions.getLandingSidebarProfiles();
  },
  getLandingPrimarySliderData() {
    return actions.getLandingPrimarySliderData();
  },
/* University Page*/
  getUniversitySidebarStories() {
    return actions.getUniversitySidebarStories();
  },
  getUniversityPrimaryContentPages() {
    return actions.getUniversityPrimaryContentPages();
  },
  getUniversityPrimarySliderPages() {
    return actions.getUniversityPrimarySliderPages();
  },
  getUniversitySidebarEvents() {
    return actions.getUniversitySidebarEvents();
  },
/* Home Page*/
  getHomeSidebarSliderPages() {
    return actions.getHomeSidebarSliderEvents();
  },
  getHomePageTrendingStories() {
    return actions.getHomePageTrendingStories();
  },
/* Events Page*/
  getEventSidebarPages() {
    return actions.getEventSidebarPages();
  },
  getEventSidebarProfiles() {
    return actions.getEventSidebarProfiles();
  },
  getEventSidebarTopics() {
    return actions.getEventSidebarTopics();
  },
  getUpcomingEvents() {
    return actions.getUpcomingEvents();
  },
  getPastEvents() {
    return actions.getPastEvents();
  },
  getEventsPrimarySliderEvents() {
    return actions.getEventsPrimarySliderEvents();
  },


/* Interactivity Actions*/
  updateFireBaseInteractivitySave(data, storyId, action) {
    return actions.updateFireBaseInteractivitySave(data, storyId, action);
  },
  updateFireBaseInteractivityRecommend(data, storyId, recommend_count, action) {
    return actions.updateFireBaseInteractivityRecommend(data, storyId, recommend_count, action);
  },
  updateFireBaseFollow(data, storyId, action, type) {
    return actions.updateFireBaseFollow(data, storyId, action, type);
  },
  updateFireBaseConnect(data, storyId, action, type) {
    return actions.updateFireBaseConnect(data, storyId, action, type);
  },
/* notification data */

/* Opportunities Page Data*/
  getOpportunitiesViewData(requestId) {
    return actions.getOpportunitiesViewData(requestId);
  },
  updateFireBaseApply(data, entityId, action) {
    return actions.updateFireBaseApply(data, entityId, action);
  },
  fetchSimilarOpportunities(id) {
    return actions.fetchSimilarOpportunities(id);
  },
  getUserDetail(uuid) {
    return actions.getUserDetail(uuid);
  },
  getUserProfileDetail(uuid) {
    return actions.getUserProfileDetail(uuid);
  },
  fetchConnectionRequests(callback) {
    return actions.fetchConnectionRequests(callback);
  },

  getOpportunitiesPrimarySliderPages() {
    return actions.getOpportunitiesPrimarySliderPages();
  },
  getWeeklyOpportunities() {
    return actions.getWeeklyOpportunities();
  },
  getOpportunitiesScholarships() {
    return actions.getOpportunitiesScholarships();
  },
  getOpportunitiesSideBarSkills() {
    return actions.getOpportunitiesSideBarSkills();
  },
  getOpportunitiesSideBarWorkAreas() {
    return actions.getOpportunitiesSideBarWorkAreas();
  },
  getOpportunitiesSideBarLocations() {
    return actions.getOpportunitiesSideBarLocations();
  },
  getOpportunitiesSideBarCompanies() {
    return actions.getOpportunitiesSideBarCompanies();
  },
  getOpportunitiesCollaborations() {
    return actions.getOpportunitiesCollaborations();
  },
  getOpportunitiesCampusAmbassador() {
    return actions.getOpportunitiesCampusAmbassador();
  },
  getOpportunitiesFellowships() {
    return actions.getOpportunitiesFellowships();
  },
  getOpportunitiesPartTimeFreelance() {
    return actions.getOpportunitiesPartTimeFreelance();
  },
  getOpportunitiesFullTime() {
    return actions.getOpportunitiesFullTime();
  },
  getOpportunitiesInternship() {
    return actions.getOpportunitiesInternship();
  },
  getOpportunitiesSideBarPages() {
    return actions.getOpportunitiesSideBarPages();
  },
  getOpportunitiesSearchData(array) {
    return actions.getOpportunitiesSearchData(array);
  },
});
