import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ContributorsGraph } from '../';
import mixins from '../../stylesheets/mixins';
import {SectionContainer, Box, Sticky, NonSticky} from '../../stylesheets/components';

const SectionFourthContainer = styled(SectionContainer)`
`;

const Gutter = styled.div`
  height: ${props => props.height }px;
`;

const StickyBottomGraphContainer = styled.div`
  position: sticky;
  top: calc(100% - ${props => props.height * 0.3 + 20}px);
`;


class SectionFourth extends Component {
  render() {
    return (
      <SectionFourthContainer style={{ height: this.props.windowHeight * 3.5}}>
        <NonSticky className="trigger" data-action-name="initWorldMap">
          Contributors' activity can also be estimated by means of OSM changesets, which are a history of each user’s past contributions. Using these changesets, one can see which regions other than North Korea contributors have also worked on. 
        </NonSticky>
        

        <Gutter height={150} />

        <StickyBottomGraphContainer height={this.props.windowHeight} style={{ height: this.props.windowHeight * 0.3 }}>
          <ContributorsGraph 
            radius={2.5}
            padding={3.5}
            width={this.props.windowWidth * 0.8} 
            height={this.props.windowHeight * 0.3} />
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