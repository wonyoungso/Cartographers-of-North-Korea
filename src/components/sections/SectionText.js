import React, { Component } from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components';
import mixins from '../../stylesheets/mixins';
import { TextVisualizationResponses } from '../';
import {SectionContainer, Box, Sticky, NonSticky } from '../../stylesheets/components';

const SectionTextContainer = styled(SectionContainer)`
  background-image: linear-gradient(-180deg, rgba(231, 247, 251, 0.83) 22%, rgba(231, 247, 251, 0.00) 81%);
`;


const GradientSticky = styled.div`
  position: sticky;
  background-image: linear-gradient(-180deg, rgba(231, 247, 251, 0.83) 80%, rgba(231, 247, 251, 0.00) 81%);
  top: 0;
  width: 100%;
  z-index:2;
  height: ${props => props.height }px;
`;

class SectionText extends Component {
  render() {
    return (
      <SectionTextContainer style={{height: this.props.windowHeight * 4.5}}>
        <GradientSticky height={this.props.windowHeight} />
        <div style={{ height: 100 }}></div>
        <NonSticky className="trigger" data-action-name="initTextVisualization">
          Here are the responses from 211 contributors.
        </NonSticky>

        <TextVisualizationResponses />
      </SectionTextContainer>
    )
  }
}

let mapStateToProps = state => {
  return {
    windowHeight: state.windowHeight
  }
}

export default connect(mapStateToProps)(SectionText);