import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {SectionContainer, Box, Sticky } from '../../stylesheets/components';

const SecondContainer = styled(SectionContainer)`
  padding: 200px 0;
`;

class SectionSecond extends Component {
  componentDidMount(){

  }
  
  render() {
    return (
      <SecondContainer className="trigger" data-action-name="changeChronicleMap">
        <Sticky>
          <Box>
            For a country that is closed to the internet, the quality of OSM data in North Korea is extraordinary: 324,415 data points drawn by 889 contributors since 2007.
          </Box>
        </Sticky>

        
        <div style={{ height: this.props.windowHeight * 1.5}}>
        </div>
      </SecondContainer>
    );
  }
}

let mapStateToProps = state => {
  return {
    windowHeight: state.windowHeight
  }
}

export default connect(mapStateToProps)(SectionSecond);