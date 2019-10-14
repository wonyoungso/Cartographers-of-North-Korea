import React, { Component } from 'react'
import { connect } from 'react-redux';
import { SelectedSentences } from '../components';

const Fragment = React.Fragment;

class Interviews extends Component {
  componentDidMount(){

  }

  render() {
    return (
      <Fragment>
        <SelectedSentences />
      </Fragment>
    )
  }
}

let mapStateToProps = state => {
  return {
  };
}

export default connect(mapStateToProps)(Interviews);