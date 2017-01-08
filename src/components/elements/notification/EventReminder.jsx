import React from 'react';
/*eslint-disable*/
class EventReminder extends React.Component {
  /*eslint-enable*/
  render() {
    const { data, verb } = this.props;
    const objectData = data[1];
    if (verb === 'event_start_reminder') {
      return (
        <div>
          Event <a>{objectData.title} </a>
          about to start in 24 hours
        </div>
      );
      /*eslint-disable*/
    } else {
      /*eslint-enable*/
      return (
        <div>
          Event <a>{objectData.title} </a>
          ending in 24 hours
        </div>
      );
    }
  }
}
EventReminder.propTypes = {
  data: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.func,
  ]).isRequired,
  verb: React.PropTypes.string,
};
export default EventReminder;
