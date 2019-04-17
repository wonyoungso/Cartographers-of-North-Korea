import React, { Component } from 'react';
import { connect } from 'react-redux';

class CenterMarker extends Component {
  render() {
    let { currentFeature } = this.props;

    return (
      <div className="center-marker">
        {
          currentFeature.name
        }
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    currentFeature: state.currentFeature
  }
}

export default connect(mapStateToProps)(CenterMarker);