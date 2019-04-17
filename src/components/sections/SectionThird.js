import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ContributorsGraph } from '../';
import styled from 'styled-components';
import mixins from '../../stylesheets/mixins';
import {SectionContainer, Box, Sticky} from '../../stylesheets/components';

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
`;

const StickyGraphArea = styled.div`
  position:sticky;
  z-index:4;
  top: 50%;
  transform: translate(0, -50%);
`;

class SectionThird extends Component {
  render() {
    let { windowHeight } = this.props;

    let graphHeight = windowHeight * 0.4 < 400 ? 400 : windowHeight * 0.4;


    return (
      <SectionThirdContainer>
        <GradientSticky height={this.props.windowHeight} />
        <NonSticky className="trigger" data-action-name="initGraphScene">
          It is true that it is hard to know the contributors only studying the OSM data, but the data shows some characteristics about them. First, the plot shows that the contributors are formed a power-law distribution, and the top 10 contributors drew 61 percent of the map.
        </NonSticky>

        <div style={{
          height: this.props.windowHeight * 0.2
        }}>
        </div>


        <StickyGraphArea>
          <ContributorsGraph 
            radius={4}
            padding={6}
            width={this.props.windowWidth * 0.8} 
            height={graphHeight} /> 
        </StickyGraphArea>
        
        <div style={{
          height: this.props.windowHeight * 0.8
        }}>
        </div>
        
        <NonSticky className="trigger" data-action-name="changeGraphKorean">
          Second, In the contributors who labeled a name to the map objects, 62% of the contributors labeled them in Korean. 
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