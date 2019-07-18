import React, { Component } from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components';
import mixins from '../stylesheets/mixins';
import {changeWorldMapIndividual } from '../actions';
import {KoreanLegend, IndividualInfo, NumberContributionLegend} from './';
// import {SectionContainer, Box, Sticky} from '../stylesheets/components';
// import osm_stats from '../constants/osm_users.json';
import * as d3 from 'd3';
import { numberWithDelimiter } from '../utils';
import _ from 'lodash';
import axios from 'axios';

const ContributorsGraphBox = styled.div`
  background-color: white;
  border: 1px solid #ccc;
  width: 80%;
  margin: 0 auto;
  position: relative;
`;

const Title = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  top: 20px;
  color: black;
  font-size: 0.9em;

  div.disclaimer {
    ${mixins.LABEL_ITALIC_TYPE}
    margin-top:5px;
    font-size:0.7em;
    text-align: center;
    color:#AAA;
  }
`;

const Tooltip = styled.div`
  position:absolute;
  line-height: 1;
  padding: 10px;
  background: #E7F7FB;
  color: black;
  z-index:6;
  ${mixins.LABEL_BOLD_TYPE}
  font-size:0.8em;
  transition: 0.4s opacity;

  width: calc(200px - 24px);
  &:after {
    content: " ";
    position: absolute;
    top: 100%; /* At the bottom of the tooltip */
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #E7F7FB transparent transparent transparent;
  }

  hr {
    border:none;
    margin: 0;
    margin-bottom: 10px;
    padding: 0;
    border-bottom: 1px solid black;
  }
`;
const ToolTipLabelArea = styled.div`  
  display: flex;
  align-items:center;
  justify-content: space-between;
  /* padding-bottom:5px; */
  margin-bottom:5px;
`;

 const ToolTipLabel = styled.div`
  ${mixins.LABEL_REGULAR_TYPE}
  font-size:0.9em;
`;

const ToolTipValue = styled.div`
  ${mixins.LABEL_BOLD_TYPE}
  font-size: 0.9em;
`;



class ContributorsGraph extends Component {
  constructor(props){
    super(props);
    // this.osmUsersData = osm_stats.stats.osm_users;


    this.margin = {
      top: 30, 
      right: 60,
      bottom: 30,
      left: 60
    };

    this.refGraph = React.createRef();   
    this.colorScale = d3.scaleLog()
      .domain([1, 2, 3, 10, 100, 1000, 5000, 10000, 100000])
      .range(["#ffffcc",
        "#d6efc2",
        "#acdeb7",
        "#81ceba",
        "#56bec1",
        "#3caac2",
        "#3391bc",
        "#2b77b4",
        "#2855a4",
        "#253494"]);

    this.state = {
      currentHover: null,
      osmUsersData: null
    }
  
  }

  componentDidMount(){
    this.loadData();
  }

  loadData(){
    axios.all([axios.get('https://nkosm.wonyoung.so/summaries.json')])
    .then(axios.spread((response) => {
      if (response.data.success) {

        this.setState({
          osmUsersData: response.data
        });
      }
    }));
  }

  initSimulation(props){

    var simulation = d3.forceSimulation(this.state.osmUsersData.stats.osm_users)
      .force("x", d3.forceX(d => { return this.xScale(d.all_count); }).strength(1))
      .force("y", d3.forceY(props.height / 2 - 20))
      .force("collide", d3.forceCollide(props.padding))
      .stop();

    for (var i = 0; i < 200; ++i) simulation.tick();
  }
  
  d3Init(){
    let { width, height } = this.props;    
    const svg = d3.select(this.refGraph.current);
    this.xScale.range([this.margin.left, width - this.margin.right]);

    this.initSimulation(this.props);

    this.xAxisFunction = g => g
      .attr("transform", `translate(0,${height - this.margin.bottom})`)
      .call(d3.axisBottom(this.xScale)
        .ticks(width / 80)
        .tickFormat(d => {
          var log = Math.log(d) / Math.LN10;
          return Math.abs(Math.round(log) - log) < 1e-6 ? numberWithDelimiter(d) : '';
        })
        .tickSizeOuter(0));
    
    this.xAxis = svg.append("g")
      .call(this.xAxisFunction);

    var _this = this;
    this.circleGraph = svg.append("g")
      .selectAll("circle")
      .data(this.state.osmUsersData.stats.osm_users)
      .enter().append("circle")
      .attr("fill", d => { return this.colorScale(d.all_count) })
      .attr("stroke", "#eee")
      .style('cursor', 'pointer')
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", this.props.radius)
      .on('mouseover touchend', function (d) {
        _this.setState({
          currentHover: {
            ...d,
            cx: d3.select(this).attr('cx'),
            cy: d3.select(this).attr('cy')
          }
        });

        d3.select(this)
          .transition()
          .attr('r', _this.props.radius + 2)
          .attr('fill', '#ff0000');
      })
      .on('mouseout', function (d) {
        _this.setState({
          currentHover: null
        });

        let circleColor = _this.setCircleColor(_this.props, d);
        d3.select(this)
          .transition()
          .attr('r', _this.props.radius)
          .attr('fill', circleColor);
      })
      .on('click', d => {
        if (this.props.cholopleth) {
          this.setState({
            currentHover: d
          });
          this.props.dispatch(changeWorldMapIndividual(d));
          d3.select(this)
            .transition()
            .attr('r', _this.props.radius + 2)
            .attr('fill', '#ff0000');
        }
      });

  }

  d3Update() {
    let { width, height } = this.props;
    this.xScale.range([this.margin.left, width - this.margin.right]);
    
    this.initSimulation(this.props);

    this.xAxisFunction = g => g
      .attr("transform", `translate(0,${height - this.margin.bottom})`)
      .call(d3.axisBottom(this.xScale)
        .ticks(width / 80)
        .tickFormat(d => {
          var log = Math.log(d) / Math.LN10;
          return Math.abs(Math.round(log) - log) < 1e-6 ? numberWithDelimiter(d) : '';
        })
        .tickSizeOuter(0))

    this.xAxis
      .transition()
      .call(this.xAxisFunction);

    this.circleGraph
      .transition()
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
  }

  setCircleColor(props, d) {
    let { graphMode, choloplethMode, cholopleth, currentIndividual } = props;

    if (cholopleth) {
      graphMode = choloplethMode;
      // console.log("final graphmode is:", graphMode);
    }
    //top20, top5
    if (!_.isNull(currentIndividual) && !_.isUndefined(currentIndividual)) {

      return d.id === currentIndividual.id ? "#FF0000" : "#DDD";

    } else {
      if (graphMode === "korean") {
        return d.korean ? "#FF0000" : "#DDD";

      } else if (graphMode === "all") {

        return this.colorScale(d.all_count);

      } else if (graphMode === "top20") {

        return d.rank > 0 && d.rank <= 20 ? "#253494" : "#DDD";

      } else if (graphMode === "top5") {

        return d.rank > 0 && d.rank <= 5 ? "#253494" : "#DDD";

      }
    }

  }

  componentDidUpdate(prevProps, prevState){
    let { graphMode, choloplethMode, cholopleth, currentIndividual } = this.props;
   
    if (prevState.osmUsersData !== this.state.osmUsersData) {

      if (!_.isNull(this.state.osmUsersData)) {
        this.xScale = d3.scaleLog()
          .domain(d3.extent(this.state.osmUsersData.stats.osm_users, d => d.all_count));
        this.d3Init();

      }
      
    }
   
    if (!_.isNull(this.state.osmUsersData)){

      if (prevProps.width !== this.props.width || prevProps.height !== this.props.height) {
        this.d3Update();
        console.log("d3update called");
      }
      
      if (cholopleth) {
        graphMode = choloplethMode;
      }
      
      if (!_.isUndefined(this.circleGraph)) {

        if (!_.isNull(currentIndividual) && !_.isUndefined(currentIndividual)) {
  
          this.circleGraph.transition().attr("fill", d => {
    
            if (d.id === currentIndividual.id) {
            
              return "#FF0000";
            
            } else {
    
              return "#DDD";
            
            }
    
          })
    
        } else {
          //top20, top5
          if (graphMode === "korean") {
    
            this.circleGraph.transition().attr("fill", d => {
              return d.korean ? "#FF0000" : "#DDD";
            })
    
          } else if (graphMode === "all") {
            this.circleGraph.transition().attr("fill", d => {
              return this.colorScale(d.all_count)
            });
    
          } else if (graphMode === "top20") {
            
            this.circleGraph.transition().attr("fill", d => {
              return d.rank > 0 && d.rank <= 20 ? "#253494" : "#DDD"; // this.colorScale(d.all_count)
            })
    
          } else if (graphMode === "top5") {
            this.circleGraph.transition().attr("fill", d => {
              return d.rank > 0 && d.rank <= 5 ? "#253494" : "#DDD";
            }) //this.colorScale(d.all_count)
          }
        }
      }
      
    }
    
  }

  render() {
    let { currentHover } = this.state;
    let { graphMode, choloplethMode, cholopleth, currentIndividual } = this.props;

    if (cholopleth) {
      graphMode = choloplethMode;
      // console.log("final graphmode is:", graphMode);
    }

    if (!_.isNull(currentHover)) {
      console.log(currentHover.cx, currentHover.cy);

    }
    
    return (

        <ContributorsGraphBox style={{ height: this.props.height }}>
          <Title>
            Distribution of Contributors by # of Contribution

            <div className="disclaimer">
              * Names have been anonymized for privacy
            </div>
          </Title>
          <svg ref={this.refGraph} width={this.props.width} height={this.props.height}>
          </svg>

          {
            _.isNull(currentHover) ? 
            null : 
            <Tooltip style={{ left: currentHover.cx - 100, top: Number(currentHover.cy) - 140 }}>
              P{ currentHover.id }*
              <hr />
              <ToolTipLabelArea>
                <ToolTipLabel>
                  Total Contribution
                </ToolTipLabel>
                <ToolTipValue>
                  { numberWithDelimiter(currentHover.all_count) }
                </ToolTipValue>
              </ToolTipLabelArea>
              <ToolTipLabelArea>
                <ToolTipLabel>
                  # of Changesets 
                </ToolTipLabel>
                <ToolTipValue>
                  { numberWithDelimiter(currentHover.total_contribution_count) }
                </ToolTipValue>
              </ToolTipLabelArea>
              <ToolTipLabelArea>
                <ToolTipLabel>
                  % of Contribution in Korean
                </ToolTipLabel>
                <ToolTipValue>
                  {numberWithDelimiter(Math.floor(currentHover.korean_pct * 100))}% 
                </ToolTipValue>
              </ToolTipLabelArea>
            </Tooltip>
          }
          <KoreanLegend show={graphMode === "korean"} />
          <NumberContributionLegend scale={this.colorScale} show={!cholopleth && graphMode !== "korean"} />
          {
            _.isNull(currentIndividual) || _.isUndefined(currentIndividual) ? 
            null : <IndividualInfo />
          }
          
        </ContributorsGraphBox>
    )
  }
}

let mapStateToProps = state => {
    return {
      graphMode: state.graphMode,
      choloplethMode: state.choloplethMode,
      cholopleth: state.cholopleth,
      currentIndividual: state.currentIndividual
    }
};

export default connect(mapStateToProps)(ContributorsGraph);