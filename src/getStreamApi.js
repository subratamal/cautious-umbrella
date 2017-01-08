import getStreamConfig from '../config/getStream';

const stream = require('getstream');

// Instantiate a new client (client side)
const client = stream.connect(getStreamConfig.apiKey, null, getStreamConfig.siteId);
export default client;
