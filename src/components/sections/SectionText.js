import React, { Component } from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components';
import mixins from '../../stylesheets/mixins';
import { TextVisualizationResponses } from '../';
import {SectionContainer, Box, Sticky, NonSticky, Gutter } from '../../stylesheets/components';
import _ from 'lodash';

const SectionTextContainer = styled(SectionContainer)`
  transition: 0.4s all;
  background-image: linear-gradient(-180deg, rgba(231, 247, 251, 0.83) 22%, rgba(231, 247, 251, 0.00) 81%);
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
    let { selectedOsmUserResponse } = this.props;
    return (
      <SectionTextContainer className={selectedOsmUserResponse ? "hide" : "" } style={{ height: this.props.windowHeight * 4.5}}>
        <GradientSticky height={this.props.windowHeight} />
        <div style={{ height: 100 }}></div>

        <Sticky className="trigger" data-action-name="initTextVisualization" style={{ zIndex: 11 }}>
          <Box>
            Thus, I asked all of the contributors to know more about the motivations and strategies. Here are the responses from 211 contributors.
          </Box>
        </Sticky>

        <Gutter h={200}></Gutter>

        <TextVisualizationResponses />
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