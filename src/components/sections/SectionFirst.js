import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import mixins from '../../stylesheets/mixins';
import {SectionContainer, Box, Sticky, NonSticky} from '../../stylesheets/components';

const IntroContainer = styled(SectionContainer)``;

class SectionFirst extends Component {
  render() {
    return (
      <IntroContainer style={{ 
        height: this.props.windowHeight * 0.7
      }} className="trigger" data-action-name="changeEmptyMap">
        <NonSticky>
          The residents of North Korea has limited accessibility to the internet for research purposes, almost all of the citizens have access to an intranet called “Kwangmyong,” and the internet connectivity has not offered to the public.
        </NonSticky>

      </IntroContainer>
    );
  }
}

let mapStateToProps = state => {
  return {
    windowHeight: state.windowHeight
  }
}

export default connect(mapStateToProps)(SectionFirst);