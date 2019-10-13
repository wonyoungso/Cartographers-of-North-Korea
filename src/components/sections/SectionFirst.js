import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {SectionContainer, NonSticky} from '../../stylesheets/components';

const IntroContainer = styled(SectionContainer)``;

class SectionFirst extends Component {
  render() {
    return (
      <IntroContainer style={{ 
        height: this.props.windowHeight * 0.7
      }} className="trigger" data-action-name="changeEmptyMap">
        <NonSticky>
          The population of North Korea only has extremely limited internet access; while a select group of people can access the internet for research purposes, almost everybody else can only access a countrywide intranet called Kwangmyong.
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