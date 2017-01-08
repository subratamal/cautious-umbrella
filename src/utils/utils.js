/**
* @Author: Subrata Mal <subrat>
* @Date:   2016-09-20T22:03:11+05:30
* @Email:  subrata.mal@
* @Last modified by:   subrat
* @Last modified time: 2016-09-21T13:15:03+05:30
*/
import { isArray } from 'underscore'

export function isServer() {
  if (process.env.APP_ENV !== 'browser') {
    return true;
  }

  return false;
}

export function isUnitTesting() {
  if (process.env.UNIT_TESTING) {
    return true;
  }

  return false;
}

export default function getCookie(name) {
  const getTokenRegEx = new RegExp(`${name}=([^;]*)`);
  const token = getTokenRegEx.exec(document.cookie);
  if (token && isArray(token)) {
    return token[1].replace(/%20/g, ' ');
  }
  return '';
}

export function getTokenByName(name) {
  if (isServer() && process.env) {
    return process.env[name];
  }

  return getCookie(name);
}

export function setTokenByName(name, tokenObject) {
  if (isServer() && process.env) {
    process.env[name] = tokenObject.tokenValue;
    return;
  }

  const DEFAULT_EXPIRY = (23 * 24 * 60 * 60 * 1000);
  const calculatedExpiry = tokenObject.tokenExpiry || DEFAULT_EXPIRY;
  if (document && document.cookie) {
    document.cookie = `${name}=${tokenObject.tokenValue}; expires=${calculatedExpiry}`;
  }
  return
}

export function isfetchTokensOnServer() {
  return process.env.NODE_FETCH_TOKEN === 'true';
}

export function setPropertyByName(propertyName, propertyValue) {
  if (isServer() && process.env) {
    process.env[propertyName] = propertyValue;
    return;
  }
  if (document && document.cookie) {
    document.cookie = `${propertyName}=${propertyValue}`;
  }
  return;
}

export function getPropertyByName(propertyName) {
  if (isServer() && process.env) {
    return process.env[propertyName];
  }
  return getCookie(propertyName);
}

export function setAnonymousState() {
  if (isServer() && process.env) {
    process.env.isLoggedIn = '0';
    process.env.isAccountVerified = '0';
    process.env.profileId = null;
    return;
  }
  if (document && document.cookie) {
    document.cookie = 'isLoggedIn=0';
    document.cookie = 'isAccountVerified=0';
    document.cookie = 'profileId=';
  }
  return;
}
