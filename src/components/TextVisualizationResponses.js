import React, { Component } from 'react'
import styled from 'styled-components';
import { UserResponse } from './';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import _ from 'lodash';
import { CATEGORIES_COLORS } from '../constants/defaults';

const GridBox = styled.div`
  column-count: 15;
  column-gap: 5px;
  /* height: 2000px; */
  width: calc(100% - 10px);


  @media (max-width: 768px) {

    column-count: 10;
    column-gap: 1px;
  }

`;

const Main = styled.div`
  /* left: 180px; */
  position: sticky;
  z-index: 8;
  margin-left: 180px;
  top: 10px;
  transition: 0.4s opacity;
  width: calc(100% - 180px);
  /* top: 20px; */
  
  @media (max-width: 768px) {

    margin-left: 5px;
    top: 10px;
    width: 100%;
    height: calc(100vh - 15px);
    overflow: hidden;
  }
  

  /* padding-top: 9px; */
`;

class TextVisualizationResponses extends Component {

  constructor(props){
    super(props);

    this.fontSizeScale = d3.scaleLinear().domain([1024, 1280, 1440, 2560]).clamp(true).range([2.2, 2.4, 3.2, 5]);
    this.lineHeightScale = d3.scaleLinear().domain([1024, 1280, 1440, 2560]).clamp(true).range([1.7, 1.7, 1.5, 1.4]);
  }
  
  render() {

    let { osmUsers, responseCategories, textVisualization, windowWidth } = this.props;
    let colorScale = d3.scaleOrdinal().domain(_.map(responseCategories, rc => { return rc.id})).range(CATEGORIES_COLORS);

    return (
      <Main style={{opacity: textVisualization ? 1 : 0 }}>
        <GridBox>
          {
            _.map(osmUsers, (ou, i) => {
              return (
                <UserResponse {...ou} fontSize={this.fontSizeScale(windowWidth)} lineHeight={Math.ceil(this.lineHeightScale(windowWidth) * 10)/10} key={i} colorScale={colorScale} />
              )
            })
          }
        </GridBox>
      </Main>
    )
  }
}

let mapStateToProps = state => {
  return {
    osmUsers: state.osmUsers,
    windowWidth: state.windowWidth,
    textVisualization: state.textVisualization,
    responseCategories: state.responseCategories,
    selectedTextCategory: state.selectedTextCategory
  }
}

export default connect(mapStateToProps)(TextVisualizationResponses);