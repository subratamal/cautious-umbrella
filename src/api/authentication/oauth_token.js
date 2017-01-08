/*Api Call for Login by using request handler*/
import oauth_config from '../../../config/oauth'
import request from '../requestHandler'

export function oauthToken() {
  var tokenCreds = oauth_config.TOKENCREDS; // oAuth2 token credentials
  return request.post('/oauth2/token', tokenCreds)
}
