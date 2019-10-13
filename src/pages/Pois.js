import React, { Component } from 'react'
import { connect } from 'react-redux';

class Pois extends Component {
  render() {
    return (
      <div>
        Pois
      </div>
    )
  }
}

let mapStateToProps = state => {
  return {

  };
}

export default connect(mapStateToProps)(Pois);