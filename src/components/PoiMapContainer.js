import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeMapLoaded, changeCurrentSeq, changeChronicleMap, changeCurrentTimeStamp, changeCurrentFeature, changeOsmUserHistoriesIdx } from '../actions';
import { toWgs84 } from 'reproject';
import proj4 from 'proj4';
import turf from 'turf';
import { randomBetween } from '../utils';
import * as d3 from 'd3';
import _ from 'lodash';
import { POIFixed } from './';
import interestingPOIsNotSuffled from '../constants/interesting_pois_full.json';

const interestingPOIs = _.shuffle(interestingPOIsNotSuffled);
const Fragment = React.Fragment;
class PoiMapContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      idx: 0
    }
    this.idxPlayed = _.map(interestingPOIs, poi => {
      return false;
    });

    this.handleMoveEnd = this.handleMoveEnd.bind(this);
  }
  componentDidMount() {
    window.mapboxgl.accessToken = 'pk.eyJ1Ijoic2Vuc2VhYmxlIiwiYSI6ImxSNC1wc28ifQ.hst-boAjFCngpjzrbXrShw';

    this.map = new window.mapboxgl.Map({
      container: this.refsMapContainer,
      style: 'mapbox://styles/senseable/cjqd080el9i9y2rl7aarmzsbu',

      zoom: 6.83,
      // minZoom: 4,
      center: [127.18858907929746, 40.31019960101341],
      // interactive: false

    });


    window.map = this.map;
    this.map.on('style.load', this.handleStyleLoad.bind(this));
    this.map.on('moveend', this.handleMoveEnd);
    // this.map.on('styledata', this.handleRender.bind(this));

  }



  handleStyleLoad(e) {
    // console.log("load");
    let { currentFeature, currentTimeStamp } = this.props;

    this.map.addSource('nk-line', {
      type: 'vector',
      tiles: ['https://tiles.wonyoung.so/services/vector-tiles/nk_osm_line/{z}/{x}/{y}.pbf']
    })

    this.map.addSource('nk-polygon', {
      type: 'vector',
      tiles: ['https://tiles.wonyoung.so/services/vector-tiles/nk_osm_polygon/{z}/{x}/{y}.pbf']
    })

    this.map.addSource('nk-point', {
      type: 'vector',
      tiles: ['https://tiles.wonyoung.so/services/vector-tiles/nk_osm_point/{z}/{x}/{y}.pbf;']
    })

    this.map.addLayer({
      "id": "nk-line-layer",
      "source": "nk-line",
      "source-layer": "nk_osm_line_4326",
      "type": "line",
      "layout": {
        'visibility': 'none'
      },
      "paint": {
        'line-opacity': 0.25,
        'line-color': {
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
      "layout": {
        'visibility': 'none'
      },
      "paint": {
        'fill-opacity': 0.5,
        'fill-color': {
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
      "layout": {
        'visibility': 'none'
      },
      "paint": {
        'circle-radius': 2,
        'circle-color': {
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

    // this.addWorldMap();

    
    this.map.resize();
    this.props.dispatch(changeMapLoaded(true));
    this.sendDispatch(this.state.idx);
  }

  addWorldMap() {
    this.map.addSource("world-map-source", {
      type: 'vector',
      url: 'mapbox://senseable.8x6k6499'
    });

    this.map.addLayer({
      "id": "world-map-layer",
      "source": "world-map-source",
      "source-layer": "world_assoc-c3znvj",
      "type": "fill",
      "layout": {
        'visibility': 'none'
      },
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
      "layout": {
        'visibility': 'none'
      },
      "paint": {
        'line-opacity': 0.2,
        'line-color': '#BBB',
        'line-width': 1
      }
    }, 'waterway-label');

  }





  componentDidUpdate(prevProps, prevState) {
    let { nkTile, cholopleth, currentFeature, zoom, center, currentTimeStamp, currentIndividual, choloplethMode, selectedOsmUserResponse, osmUserHistories, osmUserHistoriesIdx } = this.props;


    let nkTileVisibility = nkTile ? 'visible' : 'none';
    // console.log("currentTimeStamp", currentTimeStamp, "isStyleLoaded", this.map.isStyleLoaded());
    // if (this.map.isStyleLoaded()) {
    try {
      this.map.resize();

      this.map.setLayoutProperty('nk-line-layer', 'visibility', nkTileVisibility);
      this.map.setLayoutProperty('nk-polygon-layer', 'visibility', nkTileVisibility);
      this.map.setLayoutProperty('nk-point-layer', 'visibility', nkTileVisibility);

      // console.log("currentFeature", currentFeature);
      if (_.isNull(currentFeature)) {
        this.map.stop();
        if (!_.isUndefined(this.map.getLayer("currentFeature-point"))) {

          this.map.removeLayer("currentFeature-point");
          this.map.removeLayer("currentFeature-line");
          this.map.removeLayer("currentFeature-fill");
          this.map.removeSource("currentFeature");
        }
      } else {
        this.updateCurrentFeature(currentFeature);
      }


      // this.updateCurrentCholopleth(cholopleth, choloplethMode, currentIndividual);
    // }

        this.map.setFilter('nk-line-layer', ["<", "t", currentTimeStamp]);
        this.map.setFilter('nk-polygon-layer', ["<", "t", currentTimeStamp]);
      this.map.setFilter('nk-point-layer', ["<", "t", currentTimeStamp]);
      // console.log("currentTimeStamp", currentTimeStamp);
    } catch(e){

    }

    // }




  }

  updateOsmUserHistory(osmUserHistory) {


    let feature4326 = toWgs84(osmUserHistory.features[0], proj4('EPSG:3857'));

    let bbox = turf.bbox(feature4326);
    let buffered = turf.buffer(turf.bboxPolygon(bbox), 1, "miles");
    let finalBbox = turf.bbox(buffered)


    // if (window.map.isStyleLoaded()){

    if (_.isUndefined(this.map.getLayer('osm-user-history'))) {
      // var bboxPolygon = turf.bboxPolygon(bbox);
      // console.log(bboxPolygon);

      this.map.addSource("osm-user-history-bbox-source", {
        type: 'geojson',
        data: turf.bboxPolygon(finalBbox)
      });

      this.map.addLayer({
        'id': 'osm-user-history-bbox',
        'type': 'line',
        'source': "osm-user-history-bbox-source",
        'layout': {},
        'paint': {
          'line-color': '#FF0000',
          'line-opacity': 0.8
        }
      });

      this.map.addSource("osm-user-history-source", {
        type: 'geojson',
        data: feature4326
      });

      this.map.addLayer({
        'id': 'osm-user-history',
        'type': 'line',
        'source': "osm-user-history-source",
        'layout': {},
        'paint': {
          'line-color': '#FF0000',
          'line-opacity': 0.8
        },
        "filter": ["in", "$type", "Polygon", "LineString"]
      });

      this.map.addLayer({
        'id': 'osm-user-history-circle',
        'type': 'circle',
        'source': "osm-user-history-source",
        'layout': {},
        'paint': {
          'circle-color': '#FF0000',
          'circle-opacity': 0.8
        },
        "filter": ["==", "$type", "Point"]
      });

    } else {

      this.map.getSource('osm-user-history-source').setData(feature4326);
      this.map.getSource('osm-user-history-bbox-source').setData(turf.bboxPolygon(finalBbox));


    }

    // }


    try {

      this.map.fitBounds([[finalBbox[0], finalBbox[1]],
      [finalBbox[2], finalBbox[3]]], {
        padding: { top: 100, bottom: 100, left: 100, right: 100 }
      }, { osmUserHistory: true });
    } catch (e) {
      this.handleMoveEnd({ osmUserHistory: true });
    }
  }

  updateCurrentCountryJSON(currentCountryJSON) {
    var expression = ["match", ["get", "py_id"]];

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

    var extent = d3.extent(currentCountryJSON.country_counts, cc => {
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

    _.each(currentCountryJSON.country_counts, cc => {

      expression.push(cc.world_id, colorScale(cc.count));
    });


    expression.push("rgba(0,0,0,0)");

    this.map.setPaintProperty("world-map-layer", "fill-color", expression);
  }

  updateCurrentFeature(currentFeature) {

    let feature4326 = toWgs84(currentFeature.feature, proj4('EPSG:3857'));


    if (_.isUndefined(this.map.getSource('currentFeature'))) {
      this.map.addSource('currentFeature', {
        type: 'geojson',
        data: feature4326
      });
      this.map.addLayer({
        "id": "currentFeature-point",
        "type": "circle",
        "source": "currentFeature",
        "paint": {
          "circle-radius": 10,
          "circle-opacity": 0.7,
          "circle-color": "#FF0000"
        },
        filter: ["==", "$type", "Point"]
      }, 'place-city-sm');
      this.map.addLayer({
        "id": "currentFeature-line",
        "type": "line",
        "source": "currentFeature",
        "paint": {
          "line-opacity": 0.7,
          "line-width": 1,
          "line-color": "#FF0000"
        },
        filter: ["in", "$type", "LineString", "Polygon"]
      }, 'place-city-sm');


    } else {

      this.map.getSource('currentFeature').setData(feature4326);
    }


    if (feature4326.features[0].geometry.type === "Point") {
      this.map.flyTo({
        center: feature4326.features[0].geometry.coordinates,
        zoom: randomBetween(12, 14)
      }, { zoomInData: true });

    } else {

      let bbox = turf.bbox(feature4326);
      let buffered = turf.buffer(turf.bboxPolygon(bbox), 1, "miles");
      let finalBbox = turf.bbox(buffered)

      try {

        this.map.fitBounds([[finalBbox[0], finalBbox[1]],
        [finalBbox[2], finalBbox[3]]], {
          padding: { top: 100, bottom: 100, left: 100, right: 100 }
        }, { zoomInData: true });
      } catch (e) {
        // this.handleMoveEnd({ zoomInData: true });
      }
    }

  }

  sendDispatch(idx) {
    let poi = interestingPOIs[idx];
    // console.log(poi)
    this.props.dispatch(changeCurrentFeature(poi));
  }

  handleMoveEnd(e) {
    // console.log(e);

    if (e.osmUserHistory) {
      _.delay(() => {
        try {
          let nextNum = (this.props.osmUserHistoriesIdx + 1) % this.props.osmUserHistories.length;
          this.props.dispatch(changeOsmUserHistoriesIdx(nextNum));
        } catch (e) {

        }

      }, 5000);

    }

    if (e.zoomInData) {

      if (!this.idxPlayed[this.state.idx]) {
        this.idxPlayed[this.state.idx] = true;
        console.log("Transition end, it should wait 4000 and the idx:", this.state.idx);
        // debugger;
        _.delay(() => {
          this.setState({
            idx: (this.state.idx + 1) % interestingPOIs.length
          }, () => {
            this.sendDispatch(this.state.idx);
          });
        }, 5000);

      }
    
      
    }

  }


  render() {
    let { windowHeight } = this.props;
    return (
      <Fragment>
        <POIFixed {...interestingPOIs[this.state.idx]} />
        <div ref={c => { this.refsMapContainer = c; }} className="map-container" style={{ height: windowHeight }}>
        </div>
      </Fragment>
    );
  }
}

let mapStateToProps = state => {

  return {
    windowWidth: state.windowWidth,
    windowHeight: state.windowHeight,
    nkTile: state.nkTile,
    cholopleth: state.cholopleth,
    zoom: state.zoom,
    center: state.center,
    currentSeq: state.currentSeq,
    currentFeature: state.currentFeature,
    currentTimeStamp: state.currentTimeStamp,
    currentIndividual: state.currentIndividual,
    choloplethMode: state.choloplethMode,
    selectedOsmUserResponse: state.selectedOsmUserResponse,
    osmUserHistories: state.osmUserHistories,
    osmUserHistoriesIdx: state.osmUserHistoriesIdx
  }
}

export default connect(mapStateToProps)(PoiMapContainer);