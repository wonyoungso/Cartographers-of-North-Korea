import React, { Component } from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components';
import { TextVisualizationResponses } from '../';
import {SectionContainer,  NonSticky, Gutter } from '../../stylesheets/components';
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



class SectionText extends Component {
  render() {
    let { selectedOsmUserResponse } = this.props;
    return (
      <SectionTextContainer className={selectedOsmUserResponse ? "hide" : "" } style={{ height: 8000}}>
        <div style={{ height: this.props.windowHeight }}></div>
    

        <NonSticky className="trigger" data-action-name="initTextVisualization" style={{ zIndex: 11 }}>
          To know more about their motivations and mapping strategies, we sent a letter to all of the contributors; here are the responses from 211 contributors.
        </NonSticky>
        <Gutter h={200} />
        <TextVisualizationResponses />
        <Gutter h={500} />
        <NonSticky className="trigger" data-action-name="changeTextVisualizationWhy" style={{ zIndex: 11 }}>
          First, although the contributors' motivation is mostly for fun and pure curiosity—such as searching for empty space in OSM—, they were motivated by diverse reasons; in particular, with the respect of advocating open mapping, they wanted North Koreans to use the map in the near future, such as for escaping their territory. 
        </NonSticky>
        <Gutter h={1500} />
        <NonSticky className="trigger" data-action-name="changeTextVisualizationHow" style={{ zIndex: 11 }}>
          Contributors mostly use satellite imagery to contribute data to North Korea, as OpenStreetMap provides Microsoft Bing satellite images. However, some contributors have first-hand knowledge as they have been to Pyeongyang. Moreover, they often combine resources on the internet to contribute street-level information to the OSM.
        </NonSticky>
         <Gutter h={1500} />
        <NonSticky className="trigger" data-action-name="changeTextVisualizationStory" style={{ zIndex: 11 }}>
          Some contributors have been interested in North Korea because of similar national history (e.g., German citizens) or they have personal history (e.g., their father was deployed to the Korean War), thus they have followed the news about North Korea. They have some thought about the reunification of the Korean peninsula. To explore more, please toggle and click to see individual responses.
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