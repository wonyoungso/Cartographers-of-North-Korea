import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ContributorsGraph } from '../';
import styled from 'styled-components';
import mixins from '../../stylesheets/mixins';
import {SectionContainer,} from '../../stylesheets/components';

const SectionThirdContainer = styled(SectionContainer)`
`;

const GradientSticky = styled.div`
  position: sticky;
  background-image: linear-gradient(-180deg, rgba(231, 247, 251, 0.83) 22%, rgba(231, 247, 251, 0.00) 81%);
  top: 0;
  width: 100%;
  z-index:2;
  height: ${props => props.height }px;
`;

const NonSticky = styled.div`
  width: 400px;
  position:relative;
  margin: 0 auto;
  z-index:5;
  ${mixins.BOLD_TYPE}
  font-size:1.2em;
  border: 1px solid #BBB;
  padding: 10px 15px;
  background: #E7F7FB;
  color: black;
  @media (max-width: 768px) {
    width: calc(100% - 40px);
  }
`;

const StickyGraphArea = styled.div`
  position:sticky;
  z-index:4;
  top: 50%;
  transform: translate(0, -50%);
`;

class SectionThird extends Component {
  render() {
    let { windowHeight, windowWidth} = this.props;

    let graphHeight = windowHeight * 0.4 < 400 ? 400 : windowHeight * 0.4;

    let graphWidth = windowWidth < 768 ? windowWidth - 20 : this.props.windowWidth * 0.8;
    let radius = windowWidth < 768 ? 2 : 4;
    return (
      <SectionThirdContainer>
        <GradientSticky height={this.props.windowHeight} />
        <NonSticky className="trigger" data-action-name="initGraphScene">
          Although it is hard to know about the contributors only by the OSM data, but the data shows some characteristics about them. First, the plot shows that the top 10 contributors drew 61 percent of the map, thus forming a power-law graph.
        </NonSticky>

        <div style={{
          height: this.props.windowHeight * 0.2
        }}>
        </div>


        <StickyGraphArea>
          <ContributorsGraph 
            radius={radius}
            padding={radius * 1.5}
            width={graphWidth} 
            height={graphHeight} /> 
        </StickyGraphArea>
        
        <div style={{
          height: this.props.windowHeight * 0.8
        }}>
        </div>
        
        <NonSticky className="trigger" data-action-name="changeGraphKorean">
          Second, 62% of the contributors labeled map objects in Korean, including the top five contributors.
        </NonSticky>
        

        <div style={{
          height: this.props.windowHeight * 1.5
        }}>
        </div>

      </SectionThirdContainer>
    );
  }
}

let mapStateToProps = state => {
  return {
    windowWidth: state.windowWidth,
    windowHeight: state.windowHeight
  }
}

export default connect(mapStateToProps)(SectionThird);