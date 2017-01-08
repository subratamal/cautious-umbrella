import { env } from '../../config';

export const createEntityNavigationUrl = (id, type) => {
  let returnPath = '';
  if (process.env.NODE_ENV === 'production') {
    returnPath = `/uuid/${type}/${id}`;
  } else {
    returnPath = `${env.API_URL}uuid/${type}/${id}`;
  }
  return returnPath;
};

export const createPageNavigationUrl = (linkText) => {
  let returnPath = '';
  if (process.env.NODE_ENV === 'production') {
    returnPath = `/${linkText}`;
  } else {
    returnPath = `${env.API_URL}${linkText}`;
  }
  return returnPath;
};

export const createOpportunityNavigationUrl = (id) => {
  const returnPath = `/opportunities/${id}`;
  return returnPath;
};
