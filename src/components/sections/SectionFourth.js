import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ContributorsGraph } from '../';
import {SectionContainer,  NonSticky} from '../../stylesheets/components';

const SectionFourthContainer = styled(SectionContainer)`
`;

const Gutter = styled.div`
  height: ${props => props.height }px;
`;

const StickyBottomGraphContainer = styled.div`
  position: sticky;
  top: ${props => props.graphStickyTop}px;
`;


class SectionFourth extends Component {
  render() {
    let { windowWidth, windowHeight } = this.props;
    let minHeight = 350;
    let graphHeight = windowWidth < 768 ? minHeight : windowHeight * 0.3;

    let graphWidth = windowWidth < 768 ? windowWidth - 20 : windowWidth * 0.8;
    let radius = windowWidth < 768 ? 1.5 : 2;
    let graphStickyTop =  windowWidth < 768 ? windowHeight - minHeight - 10 : windowHeight - (windowHeight * 0.3) - 10;

    return (
      <SectionFourthContainer style={{ height: this.props.windowHeight * 3.5}}>
        <NonSticky className="trigger" data-action-name="initWorldMap">
          Contributors' activity can also be estimated by means of OSM changesets, which are a history of each user’s past contributions. Using these changesets, one can see which regions other than North Korea contributors have also worked on. 
        </NonSticky>
        

        <Gutter height={150} />

        <StickyBottomGraphContainer graphStickyTop={graphStickyTop} style={{ height: graphHeight }}>
          <ContributorsGraph 
            radius={radius}
            padding={radius * 1.5}
            width={graphWidth} 
            height={graphHeight} />
        </StickyBottomGraphContainer>
        
        <Gutter height={this.props.windowHeight * 0.5} />

        <NonSticky className="trigger" data-action-name="changeWorldMapHeavyContributor">
          For instance, the top 20 contributors who used Korean to label map objects also contributed to the OSM dataset for China, Germany, India, the United States, and South Korea.
        </NonSticky>  
        

        <Gutter height={ this.props.windowHeight } />


        <NonSticky className="trigger" data-action-name="changeWorldMapHeaviestContributor">
          For the top five contributors, this list changes slightly: India, Germany, Ukraine, Russia, and Japan.
        </NonSticky>
      </SectionFourthContainer>
    );
  }
}

let mapStateToProps = state => {
  return {
    windowHeight: state.windowHeight,
    windowWidth: state.windowWidth
  }
}

export default connect(mapStateToProps)(SectionFourth);