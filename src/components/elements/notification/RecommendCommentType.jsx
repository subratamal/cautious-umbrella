import React from 'react';
/*eslint-disable*/
class RecommendCommentType extends React.Component {
  /*eslint-enable*/
  render() {
    const { data, verb, usersList, actorCount } = this.props;
    const objectData = data[1];
    const firstuserData = usersList[0];
    const seconduserData = usersList[1];
    let constText = '';
    if (verb === 'comment') {
      constText = ' commented on your ';
    } else if (verb === 'recommend') {
      constText = ' recommended your ';
    } else if (verb === 'attending') {
      if (actorCount >= 2) {
        constText = ' are attending an ';
      } else {
        constText = ' is attending an ';
      }
    } else if (verb === 'attending_owner') {
      if (actorCount >= 2) {
        constText = ' are attending your ';
      } else {
        constText = ' is attending your ';
      }
    }
    if (usersList.length > 1 && actorCount > 2) {
      const actorcnt = parseInt(actorCount - 2, 10);
      return (
        <div>
          <a>{firstuserData.name}</a>,
          <a> {seconduserData.name} </a>
          and <a> {actorcnt}</a> others
           {constText} <a>{objectData.type}</a>
          <a> {objectData.title}</a>
        </div>
      );
    } else if (actorCount === 2 && usersList.length > 1) {
      return (
        <div>
          <a>{firstuserData.name}</a>,
          <a> {seconduserData.name}</a>
          {constText} <a>{objectData.type}</a>
          <a> {objectData.title}</a>
        </div>
      );
      /*eslint-disable*/
    } else {
      /*eslint-enable*/
      return (
        <div>
          <a>{firstuserData.name}</a>
          {constText} <a>{objectData.type}</a>
          <a> {objectData.title}</a>
        </div>
      );
    }
  }
}

RecommendCommentType.propTypes = {
  data: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.func,
  ]).isRequired,
  usersList: React.PropTypes.array,
  verb: React.PropTypes.string,
  actorCount: React.PropTypes.number,
};

export default RecommendCommentType;
