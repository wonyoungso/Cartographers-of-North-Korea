

export const reset = () => {
  return {
    type: 'RESET',
    payload: {}
  }
}

export const changeTextVisualization = (textVisualization) => {
  return {
    type: 'CHANGE_TEXT_VISUALIZATION',
    payload: {
      textVisualization: textVisualization
    }
  }
}


export const changeIntro = (params) => {
  return {
    type: 'CHANGE_INTRO',
    payload: {
      nkTile: false,
      zoom: params.zoom,
      center: [127.09741740583831, 40.395224876339796],
      timelineUI: false,
      currentTimeStamp: 0,
      legend: false,
      titleHeader: false,
      currentFeature: null
    }
  }
}

export const changeEmptyMap = (params) => {
  return {
    type: 'CHANGE_EMPTY_MAP',
    payload: {
      nkTile: false,
      zoom: params.zoom,
      center: [127.09741740583831, 40.395224876339796],
      timelineUI: false,
      currentTimeStamp: 0,
      legend: false,
      titleHeader: true,
      currentFeature: null
    }
  }
};

export const wrapupChronicleMap = () => {
  return {
    type: 'WRAPUP_CHRONICLE_MAP',
    payload: {
      timelineUI: false,
      currentTimeStamp : 1539016223,
      legend: false,
      titleHeader: true
    }
  }
}

export const changeChronicleMap = (params) => {
  return {
    type: 'CHANGE_CHRONICLE_MAP',
    payload: {
      nkTile: true,
      zoom: params.zoom,
      center: [127.31301436214687, 40.48099092278639],
      currentFeature: null,
      timelineUI: true,
      legend: true,
      titleHeader: true
    }
  }
};

export const changeInterestingPOIs = () => {
  return {
    type: 'CHANGE_INTERESTING_POIS',
    payload: {
      nkTile: true,
      titleHeader: true
    }
  }
}

export const initGraphScene = (params) => {
  return {
    type: 'INIT_GRAPH_SCENE',
    payload: {
      nkTile: true,
      legend : false,
      currentFeature : null,
      timelineUI: false,
      zoom: params.zoom,
      center: [127.31301436214687, 40.48099092278639],
      graphMode: "all",
      titleHeader: true
    }
  }
};

export const changeGraphKorean = (params) => {
  return {
    type: 'CHANGE_GRAPH_KOREAN',
    payload: {
      nkTile : true,
      graphMode: "korean",
      zoom: params.zoom,
      center: [127.31301436214687, 40.48099092278639],
      cholopleth: false,
      choloplethMode: "all", //top20, top5, individual
      currentIndividual: null,
      currentFeature: null,
      titleHeader: true
    }
  }
};

export const initWorldMap = (params) => {
  return {
    type: 'INIT_WORLD_MAP',
    payload: {
      nkTile: false,
      cholopleth: true,
      choloplethMode: "all", //top20, top5, individual
      currentIndividual: null,
      currentFeature: null,
      titleHeader: true,
      legend: false,
      zoom : params.zoom,
      center: [152.4583090179674, 18.892423140497797]
    }
  }
};

export const changeWorldMapHeavyContributor = () => {
  return {
    type: 'CHANGE_WORLD_MAP_HEAVY_CONTRIBUTOR',
    payload: {
      cholopleth: true,
      choloplethMode: "top20", //top20, top5, individual
      currentIndividual: null,
      currentFeature: null,
      legend: false
    }
  }
};

export const changeWorldMapHeaviestContributor = () => {
  return {
    type: 'CHANGE_WORLD_MAP_HEAVIEST_CONTRIBUTOR',
    payload: {
      cholopleth: true,
      choloplethMode: "top5", //top20, top5, individual
      currentIndividual: null,
      currentFeature: null,
      legend: false
    }
  }
};

export const changeWorldMapIndividual = (individual) => {
  return {
    type: 'CHANGE_WORLD_MAP_INDIVIDUAL',
    payload: {
      cholopleth: true,
      currentIndividual: individual,
      currentFeature: null,
      legend: false
    }
  }
};

export const windowResize = (dimension) => {
  return {
    type: 'WINDOW_RESIZE',
    payload: {
      windowWidth: dimension.width,
      windowHeight: dimension.height
    }
  }
}

export const changeMapLoaded = (mapLoaded) => {
  return {
    type: 'CHANGE_MAP_LOADED',
    payload: {
      mapLoaded: mapLoaded
    }
  }
}

export const changeCurrentSeq = (currentSeq) => {
  return {
    type: 'CHANGE_CURRENT_SEQ',
    payload: {
      currentSeq: currentSeq
    }
  }
}

export const changeCurrentFeature = (currentFeature) => {
  return {
    type: 'CHANGE_CURRENT_FEATURE',
    payload: {
      currentFeature: currentFeature,
      timelineUI: false,
      currentTimeStamp: 1539016223,
      legend: true,
      titleHeader: true
    }
  }
}

export const changeCurrentTimeStamp = (currentTimeStamp) => {
  return {
    type: 'CHANGE_CURRENT_TIMESTAMP',
    payload: {
      currentTimeStamp: currentTimeStamp
    }
  }
}

export const changeDataLoaded = (dataLoaded) => {
  return {
    type: 'CHANGE_DATA_LOADED',
    payload: {
      dataLoaded: dataLoaded
    }
  }
}