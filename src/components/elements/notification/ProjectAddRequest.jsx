import React from 'react';
/*eslint-disable*/
class ProjectAddRequest extends React.Component {
  /*eslint-enable*/
  render() {
    const { projectAddData, primaryTitle, data } = this.props;
    const objectData = data[1];
    return (
      <div>
        <a>{primaryTitle} </a>
        requested to add story
        <a> {projectAddData.title} </a>
        to your event <a>{objectData.title}</a>
      </div>
    );
  }
}
ProjectAddRequest.propTypes = {
  projectAddData: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.func,
  ]).isRequired,
  data: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.array,
  ]).isRequired,
  primaryTitle: React.PropTypes.string,
};
export default ProjectAddRequest;
