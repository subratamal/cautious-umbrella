/* Converts  Date into display format
	Example - 12 Mar, 2015 / 12 Mar ,2015 4 pm
*/

import moment from 'moment';

/* Convert unix date */
export const createGeneralDateFormat = function (unixDate) {
  const jsDate = new Date(unixDate * 1000);
  const dateString = moment(jsDate).format('DD MMM, YYYY');
  return dateString;
};

/* Convert string date for events */
export const createEventDateFormat = function (strData) {
  const dateString = moment(strData).format('DD MMM, YYYY, h a');
  return dateString;
};

/* Convert string date for opportunities */
export const createOpportunitiesDateFormat = function (strData) {
  const dateString = moment(strData).format('DD MMM, YYYY');
  return dateString;
};
