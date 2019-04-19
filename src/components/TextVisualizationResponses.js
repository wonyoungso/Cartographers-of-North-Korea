import React, { Component } from 'react'
import styled from 'styled-components';
import { UserResponse } from './';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import _ from 'lodash';

const GridBox = styled.div`
  column-count: 6;
  column-gap: 1em;
  width: calc(100% -20px);
`;

const Main = styled.div`
  margin: 0 auto;
  position: sticky;
  z-index: 5;
  width: 1000px;
  top: 20px;
  padding-top: 9px;
`;

class TextVisualizationResponses extends Component {
  render() {

    let { osmUsers, responseCategories } = this.props;
    let colorScale = d3.scaleOrdinal(d3.schemeSet3).domain(_.map(responseCategories, rc => { return rc.id}));

    return (
      <Main>
        <GridBox>
          {
            _.map(osmUsers, (ou, i) => {
              return (
                <UserResponse {...ou} key={i} colorScale={colorScale} />
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
    responseCategories: state.responseCategories,
    selectedTextCategory: state.selectedTextCategory
  }
}

export default connect(mapStateToProps)(TextVisualizationResponses);