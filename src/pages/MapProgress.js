import React, { Component } from 'react'
import { connect } from 'react-redux';
import { changeChronicleMap, changeCurrentTimeStamp } from '../actions';
import { ProgressMapContainer, TimelineScroller } from '../components';
import * as d3 from 'd3';

const Fragment = React.Fragment;

class MapProgress extends Component {
  constructor(props){
    super(props);

    this.timelineZoomLevelScale = d3.scaleLinear()
      .domain([
        375,
        667,
        750,
        800,
        1440
      ])
      .range([
        5.129678844315936,
        5.95692370701329,
        6.169505942965738,
        6.285137881074422,
        7.083247699254196
      ]);
    

    this.timeScale = d3.scaleLinear().domain([0, 1000]).clamp(true).range([1184971551, 1539016223]);

    this.intervalId = null;
    this.idx = 0;
  }

  componentWillUnmount(){
    clearInterval(this.intervalId);
  }
  componentDidMount(){
    let { windowHeight } = this.props;
    
    this.props.dispatch(changeChronicleMap({
      zoom: this.timelineZoomLevelScale(windowHeight)
    }));

    
    this.intervalId = setInterval(() => {

      this.props.dispatch(changeCurrentTimeStamp(this.timeScale(this.idx)));
      this.idx = (this.idx + 1) % 1000;
    }, 150);


  }
  render() {
    return (
      <Fragment>
        <TimelineScroller />
        <ProgressMapContainer />
      </Fragment>
    )
  }
}

let mapStateToProps = state => {
  return {
    windowWidth: state.windowWidth,
    windowHeight: state.windowHeight
  };
}

export default connect(mapStateToProps)(MapProgress);