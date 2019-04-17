import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeMapLoaded, changeCurrentSeq } from '../actions';
import { LayerGenerator } from './';
import { dispatchToGlobal, numberWithDelimiter, randomBetween } from '../utils';
import * as d3 from 'd3';
import _ from 'lodash';

const Fragment = React.Fragment;
class MapContainer extends Component {

  componentDidMount() {
    window.mapboxgl.accessToken = 'pk.eyJ1Ijoic2Vuc2VhYmxlIiwiYSI6ImxSNC1wc28ifQ.hst-boAjFCngpjzrbXrShw';

    this.map = new window.mapboxgl.Map({
      container: this.refsMapContainer,
      style: 'mapbox://styles/senseable/cjnr299am1ljs2spk9a4t2sdz',
      zoom: 0.3431335719213704,
      center: [9.629819343809345, 30.34808136525487],
      interactive: false
    });
    // window.map = this.map;
    this.map.on('style.load', this.handleStyleLoad.bind(this));
    this.map.on('moveend', this.handleMoveEnd.bind(this));
  }
  
  handleStyleLoad(e){
    this.map.addSource("world-map-source", {
      type: 'vector',
      url: 'mapbox://senseable.8x6k6499'
    });

   this.map.addLayer({
      "id": "world-map-layer",
      "source": "world-map-source",
      "source-layer": "world_assoc-c3znvj",
      "type": "fill",
      "paint": {
        'fill-opacity': 0.7,
        'fill-color': '#FFFFFF'
      }
    }, 'waterway-label');

   this.map.addLayer({
      "id": "world-map-line-layer",
      "source": "world-map-source",
      "source-layer": "world_assoc-c3znvj",
      "type": "line",
      "paint": {
        'line-opacity': 0.2,
        'line-color': '#BBB',
        'line-width': 1
      }
    }, 'waterway-label');


  }

  componentWillReceiveProps(newProps) {
    let { currentFeature } = newProps;

    if (!_.isNull(currentFeature)){

      if (_.isNull(this.props.currentFeature)) {
        this.updateCurrentFeature(currentFeature);
      } else if (currentFeature.osm_id != this.props.currentFeature.osm_id) {
        this.updateCurrentFeature(currentFeature);
      }
    }
    
  }

  updateCurrentFeature(currentFeature){

    var expression = ["match", ["get", "py_id"]];

    // Calculate color for each state based on the unemployment rate
    
    let colorScale = d3.scaleLinear()
      .domain([1184972887, 
               1346511620, 
               1360958163, 
               1378200802, 
               1395305792, 
               1438380051, 
               1479834657, 
               1502367226, 
               1510168743, 
               1516131630])
      .range(["#ffffcc",
              "#d6efc2",
              "#acdeb7",
              "#81ceba",
              "#56bec1",
              "#3caac2",
              "#3391bc",
              "#2b77b4",
              "#2855a4",
              "#253494"])

    var extent = d3.extent(currentFeature.osm_user.country_counts, cc => {
      return cc.count;
    })


    var finalDomain = [extent[0], 
                       extent[0] + (extent[1] - extent[0]) / 9 * 1,
                       extent[0] + (extent[1] - extent[0]) / 9 * 2,
                       extent[0] + (extent[1] - extent[0]) / 9 * 3,
                       extent[0] + (extent[1] - extent[0]) / 9 * 4,
                       extent[0] + (extent[1] - extent[0]) / 9 * 5,
                       extent[0] + (extent[1] - extent[0]) / 9 * 6,
                       extent[0] + (extent[1] - extent[0]) / 9 * 7,
                       extent[0] + (extent[1] - extent[0]) / 9 * 8,
                       extent[0] + (extent[1] - extent[0]) / 9 * 9];


    colorScale.domain(finalDomain);

    _.each(currentFeature.osm_user.country_counts, cc => {

      expression.push(cc.world_id, colorScale(cc.count));
    });


    expression.push("rgba(0,0,0,0)");

    this.map.setPaintProperty("world-map-layer", "fill-color", expression);

  }

  componentDidUpdate(){
    this.map.resize();
  }


  handleMoveEnd(e){

    
  }


  render() {
    let { currentFeature } = this.props;
    let width = 300;
    let colorScale = d3.scaleLinear()
      .range(["#ffffcc",
              "#d6efc2",
              "#acdeb7",
              "#81ceba",
              "#56bec1",
              "#3caac2",
              "#3391bc",
              "#2b77b4",
              "#2855a4",
              "#253494"])

    var extent = d3.extent(currentFeature.osm_user.country_counts, cc => {
      return cc.count;
    })

    var finalDomain = [extent[0], 
                       extent[0] + (extent[1] - extent[0]) / 9 * 1,
                       extent[0] + (extent[1] - extent[0]) / 9 * 2,
                       extent[0] + (extent[1] - extent[0]) / 9 * 3,
                       extent[0] + (extent[1] - extent[0]) / 9 * 4,
                       extent[0] + (extent[1] - extent[0]) / 9 * 5,
                       extent[0] + (extent[1] - extent[0]) / 9 * 6,
                       extent[0] + (extent[1] - extent[0]) / 9 * 7,
                       extent[0] + (extent[1] - extent[0]) / 9 * 8,
                       extent[0] + (extent[1] - extent[0]) / 9 * 9];


    colorScale.domain(finalDomain);

    return (
      <Fragment>
        <div ref={ c => { this.refsMapContainer = c; }} className="map-container-choropleth" style={{width: "100%", height: 500}}>
        </div>
        
        <div className="sub-legend">
          <div className="title">
            기여 횟수
          </div>
          {
            _.map(finalDomain, (val, i) => {
              if (_.isUndefined(val)) {
                return null;
              } else {
                return (
                  <div key={i} className="legend-sub-area">
                    <div className="color-box" style={{ backgroundColor: colorScale(val) }}>
                    </div>
                    <div className="value">
                      { numberWithDelimiter(Number(val.toFixed(0))) }
                    </div>
                  </div>
                ); 
              }

              
            })
          }
        </div>

      </Fragment>

    );
  }
}

let mapStateToProps = state => {
  return {
    currentSeq: state.currentSeq,
    currentFeature: state.currentFeature,
    currentTimeStamp: state.currentTimeStamp
  }
}

export default connect(mapStateToProps)(MapContainer);