import api from '../api/api';
import { isServer, getTokenByName, setTokenByName } from './utils';

export default function getOauthToken() {
  let tokenValue = getTokenByName('oAuthToken');
  if (isServer() && tokenValue) {
    Promise.resolve(tokenValue);
  }

  return api.oauthToken()
  .then((token) => {
    tokenValue = `Bearer ${token.data.access_token}`;
    if (isServer()) {
      setTokenByName('oAuthToken', { tokenValue });
    }
    return Promise.resolve(tokenValue);
  }, (error) => Promise.reject(error)
  );
}
