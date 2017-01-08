import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { toJS } from 'immutable';
import { bindActionCreators } from 'redux';
import { ShareButtons } from 'react-share';
const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} = ShareButtons;

class ShareModal extends React.Component {
  handleFocus(e) {
    const target = e.target;
    setTimeout(() => {
      target.select();
    }, 0);
  }
  render() {
    const shareUrl = this.props.shareData ? this.props.shareData.url : 'null';
    const heading = this.props.shareData ? this.props.shareData.heading : 'null';
    return (
        <div className="ui tiny modal share-modal" ref="uiShareModal">
          <i className="close icon" />
          <h2 className="ui icon header">{heading}</h2>
          <div className="content">
            <h5 className="ui header center aligned">Share with your Social Networks</h5>
            <div className="ui lists center aligned container share-icon-list">
              <div className="ui horizontal inverted link list">
                <FacebookShareButton title="facebook" className="item" url={shareUrl}>
                  <i className="icon facebook" />
                </FacebookShareButton>
                <TwitterShareButton title="twitter" className="item" url={shareUrl}>
                  <i className="icon twitter" />
                </TwitterShareButton>
                <LinkedinShareButton title="linkedin" className="item" url={shareUrl}>
                  <i className="icon linkedin" />
                </LinkedinShareButton>
                <GooglePlusShareButton title="googleplus" className="item" url={shareUrl}>
                  <i className="icon google plus" />
                </GooglePlusShareButton>
              </div>
              </div>
            <div className="ui input share-url center aligned fluid container">
              <div className="ui right red basic label">
                Link
              </div>
            <input type="text" value={shareUrl} onFocus={this.handleFocus.bind(this)} readOnly />
          </div>
        </div>
      </div>
        );
  }
}
function mapStateToProps(state, props) {
  return {
    shareData: state.get('opportunityReducer').get('shareData'),
  };
}

ShareModal.propTypes = {
  shareData: PropTypes.object,
};


export default connect(mapStateToProps)(ShareModal);
