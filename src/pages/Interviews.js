import React, { Component } from 'react'
import { connect } from 'react-redux';
import { SelectedSentences } from '../components';

const Fragment = React.Fragment;

class Interviews extends Component {
  componentDidMount(){

  }

  render() {
    let { selectedOsmUserResponse } = this.props;
    return (
      <Fragment>
        <SelectedSentences />

      </Fragment>
    )
  }
}

let mapStateToProps = state => {
  return {
    selectedOsmUserResponse: state.selectedOsmUserResponse
  };
}

export default connect(mapStateToProps)(Interviews);