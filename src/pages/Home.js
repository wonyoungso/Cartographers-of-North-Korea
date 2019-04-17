import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MapContainer, ContributorInfo, CenterMarker, TitleHeader, TimelineScroller, CholoplethLegend} from '../components';
import { changeGraphKorean, changeIntro,  wrapupChronicleMap, changeEmptyMap, changeChronicleMap, initGraphScene, changeCurrentFeature, changeCurrentTimeStamp, initWorldMap, changeWorldMapHeaviestContributor, changeWorldMapHeavyContributor, initTextVisualization} from '../actions';
import { dispatchToGlobal, randomBetween } from '../utils';
import loadSequence from '../constants/nk_osm_seq.json';
import axios from 'axios';
import 'intersection-observer';
import scrollama from 'scrollama';
import { Intro, SectionFirst, SectionSecond, SectionThird, SectionFourth, SectionFifth, SectionOddPOIs, SectionText } from '../components/sections';
import { HeaderContainer } from '../components';
import _ from 'lodash';
import interestingPOIs from '../constants/interesting_pois.json';
import { scaleLinear } from 'd3';

const Fragment = React.Fragment;

class Home extends Component {
  constructor(props){
    super(props);

    this.timeScale = scaleLinear().domain([0, 1]).clamp(true).range([1184971551, 1539016223]);
    this.introZoomLevelScale = scaleLinear()
      .domain([
        375, 
        667, 
        750, 
        800, 
        1440
      ])
      .range ([
        5.129678844315936 - 0.1,
        5.95692370701329 - 0.1,
        6.169505942965738 - 0.1,
        6.285137881074422 - 0.1,
        7.083247699254196 - 0.1
      ]);

    this.timelineZoomLevelScale = scaleLinear()
      .domain([
        375, 
        667, 
        750, 
        800, 
        1440
      ])
      .range ([
        5.129678844315936,
        5.95692370701329,
        6.169505942965738,
        6.285137881074422,
        7.083247699254196
      ]);

    this.worldMapZoomLevelScale = scaleLinear()
      .domain([
        375,
        667,
        750,
        800,
        1440
      ])
      .range([
        0.8913299194094557,
        0.8913299194094557,
        1.04073926761343,
        1.234294902868799,
        1.234294902868799
      ]);

  }
  componentDidMount(){
    document.body.style.overflowY = "hidden";
  }

  componentDidUpdate(prevProps, prevState){
    if (prevProps.mapLoaded !== this.props.mapLoaded && this.props.mapLoaded) {


        this.scroller = scrollama();
        this.scroller.setup({
          step: '.trigger',
          container: '.scroll-container',
          offset: 0.8,
          order: true,
          progress: true
        })
          .onStepEnter(this.handleStepEnter.bind(this))
          .onStepProgress(_.throttle(this.handleStepProgress.bind(this), 250))
          .onStepExit(this.handleStepExit.bind(this));
      _.delay(() => {
        window.scroll(0, 0);
      }, 400);
      

      document.body.style.overflowY = "auto";
    }

    if (prevProps.windowHeight !== this.props.windowHeight && !_.isUndefined(this.scroller)) {
      this.scroller.resize();
    }
  }
  checkActive(){
    // for (var key in this.activeStepByIndex) {
    //   if (activeStepByIndex[key]) {
    //     console.log('index ' + key + ' is active');
        
    //   }
    // }
  }

  handleStepProgress(e){
    let actionName = e.element.dataset.actionName;
    if (actionName === "changeChronicleMap") {
      
      this.props.dispatch(changeCurrentTimeStamp(this.timeScale(e.progress)));

    }
  }

  handleStepEnter(e){
    // console.log(e.index);
    // console.log(e);
    // console.log(e.index);
    let { windowHeight } = this.props;
    let actionName = e.element.dataset.actionName;
    // console.log(actionName, "enter");
    
    if (!_.isUndefined(actionName)){

      switch(actionName) {
        case "changeIntro": 
          this.props.dispatch(changeIntro({
            zoom: this.introZoomLevelScale(windowHeight)
          }));
          break;
        case "changeEmptyMap":
          this.props.dispatch(changeEmptyMap({
            zoom: this.introZoomLevelScale(windowHeight)
          }));
          break;
        case "changeChronicleMap":
          this.props.dispatch(changeChronicleMap({
            zoom: this.timelineZoomLevelScale(windowHeight)
          }));
          break;
        case "wrapupChronicleMap":
          this.props.dispatch(wrapupChronicleMap());
          break;
        case "changeInterestingPOIs":
          
          let poi = _.find(interestingPOIs, iPoi => {
            return iPoi.op == e.element.dataset.poiId;
          });
          
          this.props.dispatch(changeCurrentFeature(poi));
          break;
        case "initGraphScene":
          this.props.dispatch(initGraphScene({
            zoom: this.timelineZoomLevelScale(windowHeight)
          }));
          break;
        case "changeGraphKorean":
          this.props.dispatch(changeGraphKorean({
            zoom: this.timelineZoomLevelScale(windowHeight)
          }));
          break;
        case 'initWorldMap':
          this.props.dispatch(initWorldMap({
            zoom: this.worldMapZoomLevelScale(windowHeight)
          }));
          break;
        case 'changeWorldMapHeavyContributor':
          this.props.dispatch(changeWorldMapHeavyContributor());
          break;
        case 'changeWorldMapHeaviestContributor':
          this.props.dispatch(changeWorldMapHeaviestContributor());
          break;
        case 'initTextVisualization':
          this.props.dispatch(initTextVisualization());
        default: 
          break;
      }

      
    }
    
  }

  handleStepExit(e){
    // console.log(e.index);
// console.log(e);
    let {windowHeight} = this.props;

    let actionName = e.element.dataset.actionName;
    // console.log(actionName, "exit", e.direction);
    if (!_.isUndefined(actionName)) {

      switch (actionName) {
     
        case "changeGraphKorean":
          if (e.direction == "up") {
            this.props.dispatch(initGraphScene({
              zoom: this.timelineZoomLevelScale(windowHeight)
            }));
          }
          break;
        case 'initWorldMap': 
          if (e.direction == "up") {
            this.props.dispatch(changeGraphKorean({
              zoom: this.timelineZoomLevelScale(windowHeight)
            }));
          }
          break;
        default: 
          break;
      }


    }
  }

  render() {
    let { currentFeature } = this.props;

    return (
      <Fragment>
        <div className="scroll-container">
          <Intro />
          <SectionFirst />
          <SectionSecond />
          <SectionOddPOIs />
          <SectionThird />
          <SectionFourth />
          <SectionText />
          <SectionFifth />
        </div>
        <TimelineScroller />
        <TitleHeader />
        <CholoplethLegend />
        <TextVisualization />
        <MapContainer />
      </Fragment>
    );
  }
}

let mapStateToProps = state => {
  return {
    mapLoaded: state.mapLoaded,
    windowWidth: state.windowWidth,
    windowHeight: state.windowHeight
  }
}

export default connect(mapStateToProps)(Home);