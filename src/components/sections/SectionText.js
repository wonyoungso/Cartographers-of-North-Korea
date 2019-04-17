import React, { Component } from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components';
import mixins from '../../stylesheets/mixins';
import {SectionContainer, Box, Sticky} from '../../stylesheets/components';

const SectionTextContainer = styled(SectionContainer)`
  background-image: linear-gradient(-180deg, rgba(231, 247, 251, 0.83) 22%, rgba(231, 247, 251, 0.00) 81%);
`;



class SectionText extends Component {
  render() {
    return (
      <SectionFifthContainer style={{height: this.props.windowHeight}}>
        <NonSticky className="trigger" data-action-name="initTextVisualization">
          Init Text
        </NonSticky>
      </SectionFifthContainer>
    )
  }
}

let mapStateToProps = state => {
  return {
    windowHeight: state.windowHeight
  }
}

export connect(mapStateToProps)(SectionText);