import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ContributorsGraph } from '../';
import mixins from '../../stylesheets/mixins';
import {SectionContainer, Box, Sticky, NonSticky} from '../../stylesheets/components';


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
        <NonStickyFinal className="trigger">
          Because of the limitations of the data, these contributors would be still unknown unless they wrote an article about who they are and why they contributed. Identifying them might be not ethically a good idea. Nevertheless, regarding the complicated situation where there are fundamental differences between the beneficiaries (like, the random people on the internet from the first world) and the actual residents who live in the territory, asking the questions and imagining the reason why the 887 people have contributed data to North Korea appears to touch several things from the ideals that the internet and the open source culture have given to us, to North Korea’s surveillance- and defense-optimized, and state-controlled intranet that is founded on the open source culture. Particularly, with the respect to many POIs which are labeled in a conformist way, this “open source map” is truly oddly situated in the open source culture.
          
          <Gutter height={50}></Gutter>
          <p>
            For a companion posting to this project visit:<br/>
            <a href="https://medium.com/@wonyoungso/cartographers-of-north-korea-23af22a22b22" target="_blank">https://medium.com/@wonyoungso/cartographers-of-north-korea-23af22a22b22</a>
          </p>

          <Gutter height={30}></Gutter>
          <MethodologyTitle>
            * Methodology
          </MethodologyTitle>
          <MethodologyPG>
            OpenStreetMap data is used for the research. and this data is under the Open Database License (ODbL) version 1.0 share-alike license for data. for aggregating the changeset data, I used the center point of each boundary that each changeset has.
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