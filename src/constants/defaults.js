import moment from 'moment';

export const DEFAULT_STATE = {
  windowWidth: 1024,
  windowHeight: 768,
  titleHeader: false,
  mapLoaded: false,
  nkTile: false,
  cholopleth: false,
  timelineUI: false,
  textVisualization: false,
  legend: false,
  currentSeq: 0,
  currentFeature: null,
  currentTimeStamp: 1167609600,
  zoom: 6,
  graphMode: "all", // all, korean
  choloplethMode: "all", //top20, top5, individual
  currentIndividual: null,
  center: [125.75432, 39.03385]
};

export const INTERESTING_NAMES = [
  {dataPoint: "p=4109493330", id: 4109493330, title: "위대한 수령 김일성동지 기념비"},
  {dataPoint: "p=3090640091", id: 3090640091, title: "평양려관 5층 차집"},
  {dataPoint: "p=5485334795", id: 5485334795, title: "사진꽃방 (1층)"},
  {dataPoint: "pg=500783829", id: 500783829,  title: "Missile Launchpad"},
  {dataPoint: "pg=408248450", id: 408248450,  title: "위대한 수령 김일성동지의 개선연설 자필기념비"},
  {dataPoint: "pg=554071936", id: 554071936,  title: "Prison Workers Unit 3 Village"}
]

export const SUBCATEGORY_SELECT = {
  1: ['Why did they map North Korea?', '1'],
  2: ['How did they get the geospatial information?', '2'],
  3: ['North Korea and Open Mapping', '3']
}

// 1448928000
// 1448928052