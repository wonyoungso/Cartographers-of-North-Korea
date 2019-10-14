import React, { Component } from 'react'
import { connect } from 'react-redux';
import { changeChronicleMap, changeCurrentTimeStamp, changeCurrentFeature } from '../actions';
import { PoiMapContainer, InterestingPOIs } from '../components';
import _ from 'lodash';

const Fragment = React.Fragment;

class Pois extends Component {


  componentDidMount() {
  }

  componentDidUpdate(prevProps){
    if (!prevProps.mapLoaded && this.props.mapLoaded){

      this.props.dispatch(changeChronicleMap({
        zoom: 6
      }));

      _.delay(() => {

        this.props.dispatch(changeCurrentTimeStamp(1539016223));
      }, 1000);
      
    }
  }

  render() {
    return (
      <Fragment>
        <PoiMapContainer />
      </Fragment>
    )
  }
}

let mapStateToProps = state => {
  return {
    windowWidth: state.windowWidth,
    windowHeight: state.windowHeight,
    mapLoaded: state.mapLoaded
  };
}

export default connect(mapStateToProps)(Pois);