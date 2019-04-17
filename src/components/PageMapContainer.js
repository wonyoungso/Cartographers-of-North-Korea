import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeMapLoaded } from '../actions';
import turf from 'turf';
import { toWgs84 }  from 'reproject';
import proj4 from 'proj4';
import _ from 'lodash';

var isFirstTransition = false;
class PageMapContainer extends Component {

  componentDidMount() {
    window.mapboxgl.accessToken = 'pk.eyJ1Ijoic2Vuc2VhYmxlIiwiYSI6ImxSNC1wc28ifQ.hst-boAjFCngpjzrbXrShw';

    this.map = new window.mapboxgl.Map({
      container: this.refsPageMapContainer,
      style: 'mapbox://styles/senseable/cjnr299am1ljs2spk9a4t2sdz',
      zoom: 7.133251225192166,
      // minZoom: ,
      center: [129.39850149741085, 40.36695472501947],
      interactive: false
    });


    window.map = this.map;
    this.map.on('style.load', this.handleStyleLoad.bind(this));
  }
  
  handleStyleLoad(e){
    this.props.dispatch(changeMapLoaded(true));

    this.map.addSource('currentFeature-bbox', {
      type: 'geojson',
      data: {
        type: 'Feature',
        coordinates: [[[-67.13734351262877, 45.137451890638886],
                       [-66.96466, 44.8097],
                       [-67.13734351262877, 45.137451890638886]]]
      }
    });

    this.map.addSource('nk-line', {
      type: 'vector',
      tiles: ['http://rc.libremaps.net:3005/services/vector-tiles/nk_osm_line/{z}/{x}/{y}.pbf']
    })

    this.map.addSource('nk-polygon', {
      type: 'vector',
      tiles: ['http://rc.libremaps.net:3005/services/vector-tiles/nk_osm_polygon/{z}/{x}/{y}.pbf']
    })
  
    this.map.addSource('nk-point', {
      type: 'vector',
      tiles: ['http://rc.libremaps.net:3005/services/vector-tiles/nk_osm_point/{z}/{x}/{y}.pbf;']
    })

    this.map.addLayer({
      id: 'currentFeature-bbox-layer',
      source: 'currentFeature-bbox',
      type: 'fill',
      paint: {
        'fill-color': '#FF0000',
        'fill-opacity': 0.3
      }
    });

    this.map.addLayer({
      "id": "nk-line-layer",
      "source": "nk-line",
      "source-layer": "nk_osm_line_4326",
      "type": "line",
      "paint": {
        'line-opacity': 0.25,
        'line-color':  {
          property: 't',
          stops: [
            [1184972887, "#ffffcc"],
            [1346511620, "#d6efc2"],
            [1360958163, "#acdeb7"],
            [1378200802, "#81ceba"],
            [1395305792, "#56bec1"],
            [1438380051, "#3caac2"],
            [1479834657, "#3391bc"],
            [1502367226, "#2b77b4"],
            [1510168743, "#2855a4"],
            [1516131630, "#253494"]
          ]
        }
      },
      "filter": ["<", 't', 1384972887]
    }, 'place-city-sm');

    this.map.addLayer({
      "id": "nk-polygon-layer",
      "source": "nk-polygon",
      "source-layer": "nk_osm_polygon_4326",
      "type": "fill",
      "paint": {
        'fill-opacity': 0.5,
        'fill-color':  {
          property: 't',
          stops: [
            [1184972887, "#ffffcc"],
            [1346511620, "#d6efc2"],
            [1360958163, "#acdeb7"],
            [1378200802, "#81ceba"],
            [1395305792, "#56bec1"],
            [1438380051, "#3caac2"],
            [1479834657, "#3391bc"],
            [1502367226, "#2b77b4"],
            [1510168743, "#2855a4"],
            [1516131630, "#253494"]
          ]
        }
      },
      "filter": ["<", 't', 1384972887]
    }, 'place-city-sm');

    this.map.addLayer({
      "id": "nk-point-layer",
      "source": "nk-point",
      "source-layer": "nk_osm_point_4326",
      "type": "circle",
      "paint": {
        'circle-radius': 2,
        'circle-color':  {
          property: 't',
          stops: [
            [1184972887, "#ffffcc"],
            [1346511620, "#d6efc2"],
            [1360958163, "#acdeb7"],
            [1378200802, "#81ceba"],
            [1395305792, "#56bec1"],
            [1438380051, "#3caac2"],
            [1479834657, "#3391bc"],
            [1502367226, "#2b77b4"],
            [1510168743, "#2855a4"],
            [1516131630, "#253494"]
          ]
        }
      },
      "filter": ["<", 't', 1384972887]
    }, 'place-city-sm');


  }

  componentWillReceiveProps(newProps) {



    let { currentFeature, currentTimeStamp, currentSeq } = newProps;
   
    if (!_.isNull(currentFeature)){
      
      if (currentSeq != this.props.currentSeq) {
         console.log(currentFeature, "newProps.currentseq: ", currentSeq, "this.props.currentSeq:", this.props.currentSeq);
        console.log("will do transition");
        this.updateCurrentFeature(currentFeature);
      } else if (isFirstTransition) {
        isFirstTransition = false;
         console.log(currentFeature, "newProps.currentseq: ", currentSeq, "this.props.currentSeq:", this.props.currentSeq);

        console.log("will do transition but it's first");
        this.updateCurrentFeature(currentFeature);
      } else {
        console.log("will not");

      }
    } 
    if (currentTimeStamp != this.props.currentTimeStamp) {
      this.map.setFilter('nk-line-layer', ["<", "t", currentTimeStamp]);
      this.map.setFilter('nk-polygon-layer', ["<", "t", currentTimeStamp]);
      this.map.setFilter('nk-point-layer', ["<", "t", currentTimeStamp]);  
    }
  }

  componentWillUnmount(){

  }

  componentDidUpdate(){
    this.map.resize();

  }

  updateCurrentFeature(currentFeature) {

    let feature4326 = toWgs84(currentFeature.feature, proj4('EPSG:3857'));

    
    let bbox = turf.bbox(feature4326);
    let buffered = turf.buffer(turf.bboxPolygon(bbox), 25, "miles");

    this.map.getSource('currentFeature-bbox').setData(buffered);

  }
  render() {
    let { windowHeight } = this.props;
    return (
      <div ref={ c => { this.refsPageMapContainer = c; }} className="map-container" style={{height: windowHeight }}>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    windowWidth: state.windowWidth,
    windowHeight: state.windowHeight,
    currentSeq: state.currentSeq,
    currentFeature: state.currentFeature,
    currentTimeStamp: state.currentTimeStamp
  }
}

export default connect(mapStateToProps)(PageMapContainer);