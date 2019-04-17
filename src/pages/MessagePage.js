import React, { Component } from 'react';
import { connect } from 'react-redux';
import ActionCable from 'actioncable';
import { PageMapContainer, MessageContributorInfo, YearLegend, MessageTopInfo } from '../components';
import loadSequence from '../constants/nk_osm_seq.json';
import axios from 'axios';
import { changeCurrentSeq, changeCurrentFeature, changeCurrentTimeStamp } from '../actions';
import { dispatchToGlobal } from '../utils';
const Fragment = React.Fragment;
class MessagePage extends Component {

  componentDidMount(){
    this.initCable();
    
    _.delay(() => {
      window.location.reload();
    }, 3600000);
  }

  initCable(){

    this.cable = ActionCable.createConsumer('/cable');
    this.cable.subscriptions.create('MessagesChannel', {  
      received: this.onReceived.bind(this)
    });
  }


  onReceived(data){
    // console.log(data.msg);
    this.props.dispatch({...data.msg});

  }

  render() {
    let { currentFeature } = this.props;
    return (
      <Fragment>
        { _.isNull(currentFeature) ? null :  <MessageTopInfo /> }
        <PageMapContainer />
        <YearLegend />
        { _.isNull(currentFeature) ? null :  <MessageContributorInfo /> }
      </Fragment>
    );
  }
}

let mapStateToProps = state => {
  return {
    currentFeature: state.currentFeature,
    currentSeq: state.currentSeq
  }
}

export default connect(mapStateToProps)(MessagePage);