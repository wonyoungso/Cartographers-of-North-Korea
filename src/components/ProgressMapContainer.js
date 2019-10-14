import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeMapLoaded, changeCurrentSeq, changeOsmUserHistoriesIdx } from '../actions';
import { LayerGenerator } from './';
import { toWgs84 } from 'reproject';
import proj4 from 'proj4';
import turf from 'turf';
import { randomBetween } from '../utils';
import * as d3 from 'd3';
import _ from 'lodash';

class ProgressMapContainer extends Component {

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
    this.map.on('styledata', this.handleRender.bind(this));


  }

  handleRender(e) {
  }

  handleStyleLoad(e) {
    console.log("load");
    let { currentFeature, currentTimeStamp } = this.props;
    this.props.dispatch(changeMapLoaded(true));

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

    this.addWorldMap();
    this.map.resize();
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


  componentDidUpdate(prevProps) {
    let { nkTile, cholopleth, currentFeature, zoom, center, currentTimeStamp, currentIndividual, choloplethMode, selectedOsmUserResponse, osmUserHistories, osmUserHistoriesIdx } = this.props;


    let nkTileVisibility = nkTile ? 'visible' : 'none';

    if (window.map.isStyleLoaded()) {
      this.map.resize();

      this.map.setLayoutProperty('nk-line-layer', 'visibility', nkTileVisibility);
      this.map.setLayoutProperty('nk-polygon-layer', 'visibility', nkTileVisibility);
      this.map.setLayoutProperty('nk-point-layer', 'visibility', nkTileVisibility);

      // console.log("currentFeature", currentFeature);
      if (_.isNull(currentFeature)) {
        this.map.stop();
        // this.map.flyTo({ center: center, zoom: zoom });
        if (!_.isUndefined(this.map.getLayer("currentFeature-point"))) {

          this.map.removeLayer("currentFeature-point");
          this.map.removeLayer("currentFeature-line");
          this.map.removeLayer("currentFeature-fill");
          this.map.removeSource("currentFeature");
        }
      } else {
        this.updateCurrentFeature(currentFeature);
      }


      this.map.setFilter('nk-line-layer', ["<", "t", currentTimeStamp]);
      this.map.setFilter('nk-polygon-layer', ["<", "t", currentTimeStamp]);
      this.map.setFilter('nk-point-layer', ["<", "t", currentTimeStamp]);
    }
  }


  render() {
    let { windowHeight } = this.props;
    return (
      <div ref={c => { this.refsMapContainer = c; }} className="map-container" style={{ height: windowHeight }}>
      </div>
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

export default connect(mapStateToProps)(ProgressMapContainer);