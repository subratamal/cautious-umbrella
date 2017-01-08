/**
* @Author: Subrata Mal <subrat>
* @Date:   2016-09-21T12:30:20+05:30
* @Email:  subrata.mal@
* @Last modified by:   subrat
* @Last modified time: 2016-09-21T13:25:54+05:30
*/

/* Axios Request Object configurations */
import axios from 'axios';
import { contains } from 'underscore';
import { oauthToken } from './api_bundle';
import { unAtuhorizedTexts } from '../constants/messagesConfig';
import { env } from '../../config';
import { isServer, getTokenByName } from '../utils/utils';

const request = axios.create({
  baseURL: env.API_URL,
});

request.interceptors.request.use((config) => {
    // Do something before request is sent
  let token;
  if (isServer()) {
    token = process.env.csrfToken ? process.env.csrfToken : '';
  } else {
    token = getTokenByName('csrfToken') ? getTokenByName('csrfToken') : '';
  }
    /*
      For api calls that start with `v1` has to set withCredentials to true
      and for every next request when user logged in has to have csrf token
    */
  const patternToMatchSubUrl = /v1/g;
  const isRequestWithV1 = patternToMatchSubUrl.test(config.url);

  const writeMethods = ['put', 'post', 'del', 'patch'];

  if (isRequestWithV1) {
    config.withCredentials = true;
  }

  if (token && isRequestWithV1 && contains(writeMethods, config.method)) {
    config.headers['X-CSRF-Token'] = token;
  }
  if (isServer()) {
    config.headers.Authorization = getTokenByName('oAuthToken') ? getTokenByName('oAuthToken') : '';
    config.headers.Cookie = process.env.cookie ? process.env.cookie : '';
  } else {
    config.headers.Authorization = getTokenByName('oAuthToken') ? getTokenByName('oAuthToken') : '';
  }
  return config;
}, (error) => {
    // Do something with request error
  return Promise.reject(error);
});

request.interceptors.response.use((response) => {
  return response;
}, (error) => {
  return new Promise((resolve, reject) => {
    // if token is not present or expired , refresh token and call the orignal request
    (error.statusText == unAtuhorizedTexts.invalidToken);
    if (error.status == '401' && error.statusText == unAtuhorizedTexts.invalidToken) {
      // store orignal request
      const orignalCreds = error.config;
      // Retrieve Token
      oauthToken().then((tokenResponse) => {
        orignalCreds.headers.Authorization = `Bearer ${tokenResponse.data.access_token}`;
        // Perform the orignal call with Authorization error
        axios(orignalCreds).then((res) => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
      }, (error) => {
        reject(error);
      });
    }
    else {
      reject(error);
    }
  });
});

export default request;
