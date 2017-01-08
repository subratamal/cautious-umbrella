/* Modal popup on unexpected error*/
import React from 'react';
import { Divider } from 'react-semantify';

export const ServerErrorModal = React.createClass({
  reloadRoute() {
    window.location.reload();
  },

  render() {
    return (
      <div className="ui tiny   modal serverError">
        <div className="ui container center aligned ">
          <Divider className="hidden" />
          <div>
            <h2 className="ui icon header">Something went wrong.</h2>
          </div>
          <button className="ui red button" onClick={this.reloadRoute}>
            Reload
          </button>
          <Divider className="hidden" />
        </div>
      </div>
    );
  },
});
