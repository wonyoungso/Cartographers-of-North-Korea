import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import { numberWithDelimiter } from '../utils';
import _ from 'lodash';

const HIST = [{"key":0,"value":0},{"key":756.82,"value":854.0},{"key":2268.46,"value":17.0},{"key":3780.1000000000004,"value":4.0},{"key":5291.740000000001,"value":4.0},{"key":6803.38,"value":0.0},{"key":8315.02,"value":1.0},{"key":9826.66,"value":1.0},{"key":11338.300000000001,"value":2.0},{"key":12849.94,"value":0.0},{"key":14361.580000000002,"value":1.0},{"key":15873.220000000001,"value":0.0},{"key":17384.86,"value":0.0},{"key":18896.5,"value":0.0},{"key":20408.140000000003,"value":0.0},{"key":21919.780000000002,"value":0.0},{"key":23431.420000000002,"value":0.0},{"key":24943.06,"value":1.0},{"key":26454.7,"value":0.0},{"key":27966.34,"value":0.0},{"key":29477.980000000003,"value":0.0},{"key":30989.620000000003,"value":0.0},{"key":32501.260000000002,"value":1.0},{"key":34012.9,"value":0.0},{"key":35524.54,"value":0.0},{"key":37036.18,"value":0.0},{"key":38547.82,"value":0.0},{"key":40059.46,"value":0.0},{"key":41571.100000000006,"value":0.0},{"key":43082.740000000005,"value":0.0},{"key":44594.380000000005,"value":0.0},{"key":46106.020000000004,"value":0.0},{"key":47617.66,"value":0.0},{"key":49129.3,"value":0.0},{"key":50640.94,"value":0.0},{"key":52152.58,"value":0.0},{"key":53664.22,"value":0.0},{"key":55175.86,"value":0.0},{"key":56687.50000000001,"value":0.0},{"key":58199.14000000001,"value":0.0},{"key":59710.780000000006,"value":0.0},{"key":61222.420000000006,"value":0.0},{"key":62734.060000000005,"value":0.0},{"key":64245.700000000004,"value":0.0},{"key":65757.34000000001,"value":0.0},{"key":67268.98000000001,"value":0.0},{"key":68780.62000000001,"value":0.0},{"key":70292.26000000001,"value":0.0},{"key":71803.90000000001,"value":0.0},{"key":73315.54000000001,"value":0.0},{"key":74827.18000000001,"value":1.0}];


class ContDistribution extends Component {
  componentDidMount(){
    this.d3Render(this.props);
  }

  componentWillReceiveProps(newProps){
    this.d3Render(newProps);
  }

  d3Render(props){
      // HIST.push({key: _.last(HIST).key + 0, value: 0});
      
      let xDomain = [_.first(HIST).key, _.last(HIST).key];
      let yDomain = [0, d3.max(HIST, h => { return h.value })];
      // HIST.unshift({key: 0, value: 0});

      this.xScale = d3.scaleLinear()
        .domain(xDomain)
        .range([30, props.width - 30]);

      this.yScale = d3.scaleLinear()
        .domain(yDomain)
        .clamp(true)
        .range([props.height - 30, 50]);


      var svg = d3.select(this.svgContainer);
      svg.selectAll("*").remove();

      let lineDraw = d3.line()
        // .curve(d3.curveCardinal)
        .x(d => {
          return this.xScale(d.key)
        })
        .y(d => {
          return this.yScale(d.value)
        });




      svg.append("path")
        .data([HIST])
        .attr("class", "line")
        .attr("fill", "#ECF7FA")
        .attr("stroke", "#727272")
        .attr("stroke-width", 1)
        .attr("d", lineDraw);


      var xAxis = svg.append("g")
        .attr("transform", `translate(0, ${props.height - 10})`);

      xAxis.append("line")
        .attr("stroke", "#727272")
        .attr("stroke-width", 0.5)
        .attr("x1", 0)
        .attr("y1", -19)
        .attr("x2", props.width)
        .attr("y2", -19)

      
      xAxis.selectAll("text")
          .data([0, 10000, 30000, 50000, 70000])
        .enter().append("text")
          .attr("fill", "#AAAAAA")
          .style("font-size", "0.6em")
          .attr("text-anchor", d => { return d == 60 ? "end" : "middle" })
          .attr("x", d => { return this.xScale(d) })
          .attr("y", -2)
          .text(d => { return d == 0.0 ? "0" : `${numberWithDelimiter(d / 1000)}K` });

      xAxis.selectAll("text")
          .data(HIST)
        .enter().append("text")




        svg.append("line")
          .attr("stroke", "black")
          .attr("stroke-width", 2)
          .attr("x1", this.xScale(props.allCount))
          .attr("y1", 15)
          .attr("x2", this.xScale(props.allCount))
          .attr("y2", props.height - 25)

    
      
      // svg.append("text")
      //     .attr("fill", "#AAAAAA")
      //     .attr("x", 0)
      //     .attr("y", this.yScale(yDomain[0]) - 5)
      //     .text(yDomain[0]);

      // svg.append("text")
      //     .attr("fill", "#AAAAAA")
      //     .attr("x", 0)
      //     .attr("y", this.yScale(yDomain[1]) + 5)
      //     .text( numberWithDelimiter(yDomain[1]) );



    
  }

  render() {
    return (
      <svg className={`distribution-index${this.props.className}`} style={{ width: this.props.width, height: this.props.height }}>
        <g ref={ c => { this.svgContainer = c; } }>
        </g>
        { this.props.children }
      </svg>
    );
  }
}

let mapStateToProps = state => {
  return {

  }
};

export default connect(mapStateToProps)(ContDistribution);
