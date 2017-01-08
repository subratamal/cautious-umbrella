/* Api interface for consumption in components
**Exports a map which makes use of apiIndex for calling Api
*/
import * as actions from './api_bundle';

module.exports = Object.assign({
  getAccountInfo() {
    return actions.getAccountInfo();
  },
  loginWithEmail(data) {
    return actions.loginWithEmail(data);
  },
  oauthToken() {
    return actions.oauthToken();
  },
  fetchProfileInfo(userId) {
    return actions.fetchProfileInfo(userId);
  },
  getCSRFToken() {
    return actions.getCSRFToken();
  },
  updateProfile(profileId, data) {
    return actions.updateProfile(profileId, data);
  },
  sendVerificationEmail(accountId) {
    return actions.sendVerificationEmail(accountId);
  },
  sendSMSVerificationCode(accountId) {
    return actions.sendSMSVerificationCode(accountId);
  },
  validateOTP(accountId, otp) {
    return actions.validateOTP(accountId, otp);
  },
  logout() {
    return actions.logout();
  },

/* Common apis*/
/* Interactivity*/
  postInteractivitySave(type, id) {
    return actions.postInteractivitySave(type, id);
  },
  deleteSavesFlag(type, entityId, saveId) {
    return actions.deleteSavesFlag(type, entityId, saveId);
  },
  postInteractivityRecommend(type, id) {
    return actions.postInteractivityRecommend(type, id);
  },
  deleteRecommendFlag(type, entityId, saveId) {
    return actions.deleteRecommendFlag(type, entityId, saveId);
  },
  saveFollow(type, id) {
    return actions.saveFollow(type, id);
  },
  deleteFollow(type, entityId, saveId) {
    return actions.deleteFollow(type, entityId, saveId);
  },
  saveConnect(type, id) {
    return actions.saveConnect(type, id);
  },
  removeConnect(type, id) {
    return actions.removeConnect(type, id);
  },
  approveConnectRequest(currentUserId, connectionId) {
    return actions.approveConnectRequest(currentUserId, connectionId);
  },
  declineConnectRequest(currentUserId, connectionId) {
    return actions.declineConnectRequest(currentUserId, connectionId);
  },

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
  getDiscoverPrimarySliderStories() {
    return actions.getDiscoverPrimarySliderStories();
  },
  getDiscoverPrimarySliderEvents() {
    return actions.getDiscoverPrimarySliderEvents();
  },
/**/
/* University Page apis*/
  getUniversitySidebarStories() {
    return actions.getUniversitySidebarStories();
  },
  getUniversityPageBlockCard() {
    return actions.getUniversityPageBlockCard();
  },
  getUniversityPrimarySliderPages() {
    return actions.getUniversityPrimarySliderPages();
  },
  getUniversitySidebarEvents() {
    return actions.getUniversitySidebarEvents();
  },
  getUniversityPageSearchResults(locationFilter, searchText) {
    return actions.getUniversityPageSearchResults(locationFilter, searchText);
  },
  getUniversityPageSearchResultsFromElastic(locationFilter, searchText) {
    return actions.getUniversityPageSearchResultsFromElastic(locationFilter, searchText);
  },
  getUniversityDropdownDefaultSuggest() {
    return actions.getUniversityDropdownDefaultSuggest();
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
  getLandingPrimarySliderStories() {
    return actions.getLandingPrimarySliderStories();
  },
  getLandingPrimarySliderEvents() {
    return actions.getLandingPrimarySliderEvents();
  },
/* Home Page apis */
  getHomeSidebarSliderPages() {
    return actions.getHomeSidebarSliderEvents();
  },
  getHomePageTrendingStories() {
    return actions.getHomePageTrendingStories();
  },
  getHomePageFeeds(userId, offset, limit) {
    return actions.getHomePageFeeds(userId, offset, limit);
  },
  getHomePageTypeFeeds(userId, offset, limit, type) {
    return actions.getHomePageTypeFeeds(userId, offset, limit, type);
  },
/* Events Page apis*/
  getEventsPageSearchResults(locationFilter, searchText, subtypeFilter) {
    return actions.getEventsPageSearchResults(locationFilter, searchText, subtypeFilter);
  },
  getEventsDropdownDefaultSuggest() {
    return actions.getEventsDropdownDefaultSuggest();
  },
  getEventsPageSearchResultsFromElastic(locationFilter, searchText, subtypeFilter) {
    return actions.getEventsPageSearchResultsFromElastic(locationFilter, searchText, subtypeFilter);
  },
/* Opportunities Page Data*/
  getOpportunitiesViewData(requestId) {
    return actions.getOpportunitiesViewData(requestId);
  },
  applyForOpportunity(requestId) {
    return actions.applyForOpportunity(requestId);
  },
  cancelOpportunityApplication(requestId, rel_id) {
    return actions.cancelOpportunityApplication(requestId, rel_id);
  },
  getOpportunityPageSearchResults(searchText, subtypeFilter) {
    return actions.getOpportunityPageSearchResults(searchText, subtypeFilter);
  },

  /* connection requests */
  resetUnseenCount() {
    return actions.resetUnseenCount();
  },

});
