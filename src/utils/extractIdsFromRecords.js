import _ from 'underscore';

export default function fetchRecordIds(records) {
  return _.map(records, (record) => _.property('id')(record));
}
