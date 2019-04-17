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
          Third, OpenStreetMap has changesets, which is history of past contributions of each user. Using this datasets, it can be seen which regions, other than North Korea, have been the contributors’ interests. When summing up every changesets of 887 contributors, it does not give much insights, although there are some countries that has been in good relationship with North Korea such as Germany, China, and Russia.
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
          However, there are some countries coming up with heavy contributors. For instance, the top 20 contributors who use Korean also contributed to the countries as follows: China, Germany, India, United States, and South Korea.
        </NonSticky>  
        

        <Gutter height={ this.props.windowHeight } />


        <NonSticky className="trigger" data-action-name="changeWorldMapHeaviestContributor">
          If the number of contributor is reduced to 5, the list of countries changed as follows: India, Germany, Ukraine, Russia, and Japan. It is also interesting to see the individual user’s spatial distribution of contributions.
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