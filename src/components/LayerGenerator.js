import { scaleLinear } from 'd3';

class LayerGenerator {
  constructor(params){
    this.layerName = params.layerName;
    this.source = params.source;
    this.sourceLayer = params.sourceLayer;
    this.type = params.type;
    this.sourceType = params.sourceType;
    this.layers = [];

    this.extent = [1199145600, 1230768000, 1262304000, 1293840000, 1325376000, 1356998400, 1388534400, 1420070400, 1451606400, 1500714426];
    this.increment_count = 50;
  }

  getPaintProperty(color) {
    if (this.type === "circle"){

      return {
        "circle-radius": 1.5,
        "circle-color": color
      };

    } else if (this.type === "line") {

      return {
        "line-color": color,
        "line-width": 1,
        "line-opacity": 0.2
      };

    } else if (this.type === "fill") {

      return {
        'fill-color': color,
        'fill-opacity': 0.5
      }
      
    }
  }

  getLayers(){

    if (this.layers.length === 0){

      this.layers = [];
      this.scale = scaleLinear()
        .domain(this.extent)
        // .interpolate(interpolate)
        .range(["#0000ff", "#4400cc", "#880088", "#cc0044", "#ff0000", "#ff4400", "#ff8800", "#ffcc00", "#ffff00"]);
      // debugger;
      var increment = (this.extent[this.extent.length - 1] - this.extent[0]) / this.increment_count;
      var idx = 0;
      var i = 0;


      for (i = this.extent[0]; i < this.extent[this.extent.length - 1]; i += increment){
        var style_id = `${this.layerName}--current__${idx}`;
        var color = this.scale(i);
        var filter =['all',
          [ '>=', "unix",  i ],
          [ '<',  "unix",  i + increment ],
          [ "==", "$type", this.sourceType]
        ];

        this.layers.push({
          "id": style_id,
          "type": this.type,
          "source": this.source,
          "source-layer": this.sourceLayer,
          "filter": filter,
          "paint": this.getPaintProperty(color)
        });
        idx++;
      }

      this.layers.push({
        "id": `${this.layerName}--current__${idx + 1}`,
        "type": this.type,
        "source": this.source,
        "source-layer": this.sourceLayer,
        "filter": ['all',
          [ '>=', "unix", this.extent[this.extent.length - 1] ],
          [ "==", "$type", this.sourceType]
        ],
        "paint": this.getPaintProperty(color)
      });
    }

    return this.layers;
  }
}

export default LayerGenerator;