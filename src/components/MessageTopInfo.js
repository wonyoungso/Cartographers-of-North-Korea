import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';

const Fragment = React.Fragment;

class MessageTopInfo extends Component {
  render() {
    let { currentFeature } = this.props;
    return (
      <Fragment>
        <div className="contributor-info center">
          <div className="time">
            { //moment(currentFeature.osm_timestamp * 1000).format("YYYY MM DD") }
              moment.unix(currentFeature.osm_timestamp).format("MMMM DD, YYYY")
            }
          </div>
        </div>
      </Fragment>
    );
  }
}

let mapStateToProps = state => {
  return {
    currentFeature: state.currentFeature
  }
}



export default connect(mapStateToProps)(MessageTopInfo);
