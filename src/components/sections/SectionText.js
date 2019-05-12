import React, { Component } from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components';
import mixins from '../../stylesheets/mixins';
import { TextVisualizationResponses } from '../';
import {SectionContainer, Box, Sticky, NonSticky, Gutter } from '../../stylesheets/components';
import _ from 'lodash';

const SectionTextContainer = styled(SectionContainer)`
  transition: 0.4s all;
  background: rgba(231, 247, 251);
  opacity: 1;

  &.hide {
    opacity: 0;
    pointer-events: none;
  }
`;


const GradientSticky = styled.div`
  position: sticky;
  background-image: linear-gradient(-180deg, rgba(231, 247, 251, 0.83) 22%, rgba(231, 247, 251, 0.00) 81%);
  top: 0;
  width: 100%;
  z-index:2;
  height: ${props => props.height }px;
`;

class SectionText extends Component {
  render() {
    let { selectedOsmUserResponse, windowHeight } = this.props;
    return (
      <SectionTextContainer className={selectedOsmUserResponse ? "hide" : "" } style={{ height: 8000}}>
        <div style={{ height: this.props.windowHeight }}></div>
    

        <NonSticky className="trigger" data-action-name="initTextVisualization" style={{ zIndex: 11 }}>
          Thus, I asked all of the contributors to know more about the motivations and strategies. Here are the responses from 211 contributors.
        </NonSticky>
        <Gutter h={200} />
        <TextVisualizationResponses />
        <Gutter h={500} />
        <NonSticky className="trigger" data-action-name="changeTextVisualizationWhy" style={{ zIndex: 11 }}>
          Although the contributors' motivation is mostly for fun and pure curiosity—such as searching for empty space in OSM—, they were motivated by specific and more altruistic reasons; in particular, with the respect of advocating open mapping, they wanted North Koreans to use the map in near future, such as for escaping their territory. 
        </NonSticky>
        <Gutter h={1500} />
        <NonSticky className="trigger" data-action-name="changeTextVisualizationHow" style={{ zIndex: 11 }}>
          Contributors mostly uses satellite imagery to contribute data to North Korea, as OpenStreetMap provides Microsoft Bing satellite images. However, some contributors have the first-hand knowledge as they have been to Pyeongyang. Moreover, they often combine resources on the internet to contribute street-level information to the OSM.
        </NonSticky>
         <Gutter h={1500} />
        <NonSticky className="trigger" data-action-name="changeTextVisualizationStory" style={{ zIndex: 11 }}>
          Some contributors have interests because of similar national history (German citizens) or personal history, and they have followed from the news media and thought about reunification of Korean peninsula. You can toggle and click to see individual responses.
        </NonSticky>

      </SectionTextContainer>
    )
  }
}

let mapStateToProps = state => {
  return {
    windowHeight: state.windowHeight,
    selectedOsmUserResponse: !_.isNull(state.selectedOsmUserResponse)
  }
}

export default connect(mapStateToProps)(SectionText);