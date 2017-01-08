import React from 'react';
/*eslint-disable*/
class AddedType extends React.Component {
  /*eslint-enable*/
  render() {
    const { data, usersList, verb } = this.props;
    const objectData = data[1];
    const userData = usersList[0];
    if (verb === 'story_added') {
      return (
        <div>
        <a>{objectData.type.charAt(0).toUpperCase() + objectData.type.slice(1)}</a>
        <a> {objectData.title}</a> was added to the
        topic <a>{userData.name}</a>
        </div>
      );
    } else if (verb === 'added_to_topic') {
      return (
        <div>
        Your <a>{objectData.type}</a>
        <a> {objectData.title}</a> was added to the
        topic <a>{userData.name}</a>
        </div>
      );
      /*eslint-disable*/
    } else {
      /*eslint-enable*/
      return (
        <div>
        Your <a>{objectData.type}</a>
        <a> {objectData.title}</a> was added to the
        page <a>{userData.name}</a>
        </div>
      );
    }
  }
}
AddedType.propTypes = {
  data: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.func,
  ]).isRequired,
  usersList: React.PropTypes.array,
  verb: React.PropTypes.string,
};

export default AddedType;
