import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { changeCurrentSeq, changeCurrentFeature, changeCurrentTimeStamp } from '../actions';

const Fragment = React.Fragment;

class SummaryPage extends Component {

  render() {
    return (
      <div>
        Summary Page
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
  }
}

export default connect(mapStateToProps)(SummaryPage);