import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeMapLoaded, changeOsmUserHistoriesIdx } from '../actions';
import { toWgs84 }  from 'reproject';
import proj4 from 'proj4';
import turf from 'turf';
import { randomBetween } from '../utils';
import country_analysis_all from '../constants/country_analysis_all.json';
import country_analysis_top_20 from '../constants/country_analysis_top_20.json';
import country_analysis_top_5 from '../constants/country_analysis_top_5.json';
import * as d3 from 'd3';
import _ from 'lodash';

class MapContainer extends Component {

  componentDidMount() {
    window.mapboxgl.accessToken = 'pk.eyJ1Ijoic2Vuc2VhYmxlIiwiYSI6ImxSNC1wc28ifQ.hst-boAjFCngpjzrbXrShw';

    this.map = new window.mapboxgl.Map({
      container: this.refsMapContainer,
      style: 'mapbox://styles/senseable/cjqd080el9i9y2rl7aarmzsbu',
      zoom: 6.2,
      // minZoom: 4,
      center: [127.1205757172753, 38.76675314095931],
      // interactive: false

    });


    window.map = this.map;
    this.map.on('style.load', this.handleStyleLoad.bind(this));
    this.map.on('moveend', this.handleMoveEnd.bind(this));
    this.map.on('styledata', this.handleRender.bind(this));
    
    
  }

  handleRender(e){
  }
  
  handleStyleLoad(e) {
  
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
      "layout": {
        'visibility': 'none'
      },
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
      "layout": {
        'visibility': 'none'
      },
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

    this.addWorldMap();
    this.map.resize();

    this.props.dispatch(changeMapLoaded(true));
  }

  addWorldMap(){
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


  componentDidUpdate(prevProps){
    let { nkTile, cholopleth, currentFeature, zoom, center, currentTimeStamp, currentIndividual, choloplethMode, osmUserHistories, osmUserHistoriesIdx, mapLoaded } = this.props;


    let nkTileVisibility = nkTile ? 'visible' : 'none';

    if (mapLoaded){
      this.map.resize();
  
      this.map.setLayoutProperty('nk-line-layer', 'visibility', nkTileVisibility);
      this.map.setLayoutProperty('nk-polygon-layer', 'visibility', nkTileVisibility);
      this.map.setLayoutProperty('nk-point-layer', 'visibility', nkTileVisibility);
  
      if (_.isNull(currentFeature)) {
        this.map.stop();
        this.map.flyTo({ center: center, zoom: zoom });
        if (!_.isUndefined(this.map.getLayer("currentFeature-point"))) {
  
          this.map.removeLayer("currentFeature-point");
          this.map.removeLayer("currentFeature-line");
          this.map.removeLayer("currentFeature-fill");
          this.map.removeSource("currentFeature");
        }
      } else {
        this.updateCurrentFeature(currentFeature);
      }
  
      
      this.updateCurrentCholopleth(cholopleth, choloplethMode, currentIndividual);
  
      this.map.setFilter('nk-line-layer', ["<", "t", currentTimeStamp]);
      this.map.setFilter('nk-polygon-layer', ["<", "t", currentTimeStamp]);
      this.map.setFilter('nk-point-layer', ["<", "t", currentTimeStamp]);  

      if (_.isNull(prevProps.selectedOsmUserResponse) && !_.isNull(this.props.selectedOsmUserResponse)){
        
        this.map.stop();
        this.map.flyTo({ center: [127.1205757172753, 38.76675314095931], zoom: 6.2 });
      
      } else if (!_.isNull(prevProps.selectedOsmUserResponse) && _.isNull(this.props.selectedOsmUserResponse)) {

        this.map.stop();
        this.map.flyTo({ center: center, zoom: zoom });
      }


      if (!_.isNull(osmUserHistories)) {
        if (!_.isUndefined(osmUserHistories[osmUserHistoriesIdx])){
          this.updateOsmUserHistory(osmUserHistories[osmUserHistoriesIdx]);
        }
      } else {
        if (!_.isUndefined(this.map.getLayer('osm-user-history'))){
          this.map.removeLayer('osm-user-history');
          this.map.removeLayer('osm-user-history-circle');
          this.map.removeSource('osm-user-history-source');

          this.map.removeLayer('osm-user-history-bbox');
          this.map.removeSource('osm-user-history-bbox-source');
        }
      }
    }



    
  }

  updateOsmUserHistory(osmUserHistory){

    
    let feature4326 = toWgs84(osmUserHistory.features[0], proj4('EPSG:3857'));

    let bbox = turf.bbox(feature4326);
    let buffered = turf.buffer(turf.bboxPolygon(bbox), 1, "miles");
    let finalBbox = turf.bbox(buffered)


    // if (window.map.isStyleLoaded()){

      if (_.isUndefined(this.map.getLayer('osm-user-history'))){
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

      this.map.stop();
      this.map.fitBounds([[finalBbox[0], finalBbox[1]],
      [finalBbox[2], finalBbox[3]]], {
          padding: { top: 100, bottom: 100, left: 100, right: 100 }
        }, { osmUserHistory: true });
    } catch (e) {
      this.handleMoveEnd({ osmUserHistory: true });
    }
  }

  updateCurrentCholopleth(cholopleth, choloplethMode, currentIndividual) {

    // turning on and off 
    let choloplethVisibility = cholopleth ? 'visible' : 'none';

    this.map.setLayoutProperty("world-map-layer", 'visibility', choloplethVisibility);
    this.map.setLayoutProperty("world-map-line-layer", 'visibility', choloplethVisibility);

    let currentCountryJSON = null;

    if (!_.isNull(currentIndividual)) {
      // debugger;
      currentCountryJSON = currentIndividual;

    } else if (choloplethMode === "all") {

      currentCountryJSON = { 
        country_counts: country_analysis_all 
      };

    } else if (choloplethMode === "top20"){
      
      currentCountryJSON = {
        country_counts: country_analysis_top_20
      };

    } else { // top5
      
      currentCountryJSON = {
        country_counts: country_analysis_top_5
      };

    }

    if (!_.isNull(currentCountryJSON) && cholopleth) {
      this.updateCurrentCountryJSON(currentCountryJSON);
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

    var extent = [0, d3.max(currentCountryJSON.country_counts, cc => {
      return cc.count;
    })];


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


    expression.push("#ffffcc");

    this.map.setPaintProperty("world-map-layer", "fill-color", expression);
  }

  updateCurrentFeature(currentFeature) {
      console.log("======updateCurrentFeature======", currentFeature);
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
        this.map.stop();
        this.map.flyTo({
          center: feature4326.features[0].geometry.coordinates,
          zoom: randomBetween(12, 14)
        }, { zoomInData: true });

      } else {
       
        let bbox = turf.bbox(feature4326);
        let buffered = turf.buffer(turf.bboxPolygon(bbox), 1, "miles");
        let finalBbox = turf.bbox(buffered)

        try {

          this.map.stop();
          this.map.fitBounds([[finalBbox[0], finalBbox[1]],
          [finalBbox[2], finalBbox[3]]], {
              padding: { top: 100, bottom: 100, left: 100, right: 100 }
            }, { zoomInData: true });
        } catch (e) {
          this.handleMoveEnd({ zoomInData: true });
        }
      }

  }

  handleMoveEnd(e){
    // console.log(e);
    
    if (e.osmUserHistory) {
      _.delay(() => {
        try {
          let nextNum = (this.props.osmUserHistoriesIdx + 1) % this.props.osmUserHistories.length;
          this.props.dispatch(changeOsmUserHistoriesIdx(nextNum));    
        } catch(e){

        }
        
      }, 4000);

    }
    
  }


  render() {
    let { windowHeight } = this.props;
    return (
      <div ref={ c => { this.refsMapContainer = c; }} className="map-container" style={{height: windowHeight}}>
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
    mapLoaded: state.mapLoaded,
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

export default connect(mapStateToProps)(MapContainer);