import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';

const Fragment = React.Fragment;

class ContributorInfo extends Component {
  render() {
    let { currentFeature } = this.props;
    return (
      <Fragment>
        <div className="contributor-info left">
          <div className="name">
            { currentFeature.osm_user.osm_user }
          </div>
        </div>

        <div className="contributor-info center">
          <div className="time">
            { //moment(currentFeature.osm_timestamp * 1000).format("YYYY MM DD") }
              moment.unix(currentFeature.osm_timestamp).format("MMMM DD, YYYY")
            }
          </div>
        </div>


        <div className="contributor-info right">
          <div className="rank">
            { currentFeature.osm_user.rank } of 887
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



export default connect(mapStateToProps)(ContributorInfo);
