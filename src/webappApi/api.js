/* Api interface for consumption in components
**Exports a map which makes use of apiIndex for calling Api
*/
import * as actions from './api_bundle';

module.exports = Object.assign({
  getStreamNotificationFeedToken: (data) => actions.getStreamNotificationFeedToken(data),
});
