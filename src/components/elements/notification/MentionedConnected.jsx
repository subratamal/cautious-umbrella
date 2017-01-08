import React from 'react';
/*eslint-disable*/
class MentionedConnected extends React.Component {
  render() {
    /*eslint-enable*/
    const { data, usersList, verb } = this.props;
    const objectData = data[1];
    const userData = usersList[0];
    if (verb === 'mentioned' && objectData !== undefined &&
    objectData !== true && objectData.title !== undefined) {
      return (
        <div>
          You are mentioned in the {objectData.type}
          <a> {objectData.title}</a>
        </div>
      );
    } else if (verb === 'connected' && usersList.length > 0
    && userData !== undefined) {
      return (
        <div>
          You are now connected to
          <a> {userData.name}</a>
        </div>
      );
    } else {
      return null;
    }
  }
}
MentionedConnected.propTypes = {
  data: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.func,
  ]).isRequired,
  usersList: React.PropTypes.array,
  verb: React.PropTypes.string,
};
export default MentionedConnected;
