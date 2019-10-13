import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {SectionContainer, NonSticky} from '../../stylesheets/components';


const SectionFifthContainer = styled(SectionContainer)`
  background-image: linear-gradient(-180deg, rgba(231, 247, 251, 0.83) 22%, rgba(231, 247, 251, 0.00) 81%);
`;


const Gutter = styled.div`
  height: ${props => props.height }px;
`;

const NonStickyFinal = styled(NonSticky)`
  width: 800px;
`;

const MethodologyTitle = styled.h4`
  font-size:0.7em;
  color: #777;
  line-height:1.2;
`;

const MethodologyPG = styled.p`
  font-size:0.7em;
  color: #777;
  width: 60%;
`;

class SectionFifth extends Component {
  render() {
    return (
      <SectionFifthContainer style={{height: this.props.windowHeight}}>
        <Gutter height={100}></Gutter>
        <NonStickyFinal className="trigger" data-action-name="final">
          Although most cartographers of North Korea do not live in the country, they are motivated by issues there. Like data analysts and investigative journalists, they combine information obtained from different sources by a variety of methods to produce place-level knowledge remotely. However, because of the inherent limitations of remotely contributed data, it is questionable whether these strategies can be applied to other crowdsourced projects. We should also consider who ultimately benefits from the OSM process. As mapping is a combination of technical, political, and social capabilities and intentions and open data can be accessed not only by citizens but also by institutions, unexpected outcomes are frequently observed.
          
          <Gutter height={50}></Gutter>
          <MethodologyTitle>
            * Methodology
          </MethodologyTitle>
          <MethodologyPG>
            OpenStreetMap data is used for the research. The OSM data is under the Open Database License (ODbL) version 1.0 share-alike license. For aggregating the changeset data, I used the centroid point of each changeset boundary. All contributors' screen name is anonymized for protecting the individual privacy.
          </MethodologyPG>
        </NonStickyFinal>
      </SectionFifthContainer>
    );
  }
}

let mapStateToProps = state => {
  return {
    windowHeight: state.windowHeight
  }
}

export default connect(mapStateToProps)(SectionFifth);