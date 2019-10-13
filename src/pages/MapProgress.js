import React, { Component } from 'react'
import { connect } from 'react-redux';

class MapProgress extends Component {
  render() {
    return (
      <div>
        MapProgress
      </div>
    )
  }
}

let mapStateToProps = state => {
  return {

  };
}

export default connect(mapStateToProps)(MapProgress);