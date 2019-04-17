import React, { Component } from 'react';
import { connect } from 'react-redux';
import { InterestingPOIs } from '../';
import styled from 'styled-components';
import mixins from '../../stylesheets/mixins';
import {SectionContainer, Box, Sticky, NonSticky} from '../../stylesheets/components';
import { rgba } from 'style-value-types';

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
            However, the quality of OSM data in North Korea is simply amazing; 889 users contributed 324,415 data points. But, Who gets benefits from this map? Definitely not the residents of North Korea.
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