import { DEFAULT_STATE } from '../constants/defaults';

export default function screenReducer(state = DEFAULT_STATE, action){
  switch(action.type) {
    case "WINDOW_RESIZE":
      return {
        ...state,
        windowWidth: action.payload.windowWidth,
        windowHeight: action.payload.windowHeight
      }
      break;
    case "CHANGE_MAP_LOADED":
      return {
        ...state,
        mapLoaded: action.payload.mapLoaded
      }
    case 'CHANGE_INTRO': 
      return {
        ...state,
        nkTile: action.payload.nkTile,
        titleHeader: action.payload.titleHeader,
        zoom: action.payload.zoom,
        center: action.payload.center,
        currentFeature: action.payload.currentFeature
      }
    case 'CHANGE_EMPTY_MAP':
      return {
        ...state,
        nkTile: action.payload.nkTile,
        zoom: action.payload.zoom,
        center: action.payload.center,
        timelineUI: action.payload.timelineUI,
        currentTimeStamp : action.payload.currentTimeStamp,
        legend : action.payload.legend,
        titleHeader: action.payload.titleHeader,
        currentFeature: action.payload.currentFeature
      };
    case 'CHANGE_CHRONICLE_MAP':
      return {
        ...state,
        nkTile: action.payload.nkTile,
        zoom: action.payload.zoom,
        center: action.payload.center,
        currentFeature: action.payload.currentFeature,
        timelineUI: action.payload.timelineUI,
        legend: action.payload.legend,
        titleHeader: action.payload.titleHeader
      };
    case 'WRAPUP_CHRONICLE_MAP':
      return {
        ...state,
        timelineUI: action.payload.timelineUI,
        currentTimeStamp: action.payload.currentTimeStamp,
        legend: action.payload.legend,
        titleHeader: action.payload.titleHeader
      }

    case 'CHANGE_INTERESTING_POIS':
      return {
        ...state
      };
    case 'INIT_GRAPH_SCENE':
      return {
        ...state,
        nkTile: action.payload.nkTile,
        legend: action.payload.legend,
        timelineUI: action.payload.timelineUI,
        currentFeature: action.payload.currentFeature,
        zoom: action.payload.zoom,
        center: action.payload.center,
        graphMode: action.payload.graphMode,
        titleHeader: action.payload.titleHeader
      };
    case 'CHANGE_GRAPH_KOREAN':
      return {
        ...state,
        nkTile: action.payload.nkTile,
        graphMode: action.payload.graphMode,
        zoom: action.payload.zoom,
        center: action.payload.center,
        cholopleth: action.payload.cholopleth,
        titleHeader: action.payload.titleHeader
      };
    case 'INIT_WORLD_MAP':
      return {
        ...state,
        nkTile: action.payload.nkTile,
        zoom: action.payload.zoom,
        center: action.payload.center,
        currentFeature: action.payload.currentFeature,
        cholopleth: action.payload.cholopleth,
        choloplethMode: action.payload.choloplethMode, //top20, top5, individual
        currentIndividual: action.payload.currentIndividual,
        legend: action.payload.legend,
        titleHeader: action.payload.titleHeader
      };
    case 'CHANGE_WORLD_MAP_HEAVY_CONTRIBUTOR':
      return {
        ...state,
        nkTile: action.payload.nkTile,
        cholopleth: action.payload.cholopleth,
        currentFeature: action.payload.currentFeature,
        choloplethMode: action.payload.choloplethMode, //top20, top5, individual
        currentIndividual: action.payload.currentIndividual,
        legend: action.payload.legend
      };
    case 'CHANGE_WORLD_MAP_HEAVIEST_CONTRIBUTOR':
      return {
        ...state,
        nkTile: action.payload.nkTile,
        cholopleth: action.payload.cholopleth,
        currentFeature: action.payload.currentFeature,
        choloplethMode: action.payload.choloplethMode, //top20, top5, individual
        currentIndividual: action.payload.currentIndividual,
        legend: action.payload.legend,
      };
    case 'CHANGE_WORLD_MAP_INDIVIDUAL':
      return {
        ...state,
        nkTile: action.payload.nkTile,
        currentFeature: action.payload.currentFeature,
        currentIndividual: action.payload.currentIndividual        
      }
    case "RESET":
      return {
        ...state
      }
    case "CHANGE_CURRENT_SEQ":
      return {
        ...state,
        currentSeq: action.payload.currentSeq
      }
    case "CHANGE_CURRENT_TIMESTAMP":
      return {
        ...state,
        currentTimeStamp: action.payload.currentTimeStamp
      }
    case "CHANGE_CURRENT_FEATURE":
      return {
        ...state,
        nkTile: true,
        currentFeature: action.payload.currentFeature,
        legend: true
      }
  }

  return state;
};