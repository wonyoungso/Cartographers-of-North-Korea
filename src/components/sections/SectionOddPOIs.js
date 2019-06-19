import React, { Component } from 'react';
import { connect } from 'react-redux';
import { InterestingPOIs } from '../';
import styled from 'styled-components';
import mixins from '../../stylesheets/mixins';
import { SectionContainer, Box, Sticky } from '../../stylesheets/components';
import interestingPOIs from '../../constants/interesting_pois.json';
import _ from 'lodash';

const SecondContainer = styled(SectionContainer)`
  margin: 200px 0;
`;

class SectionOddPOIs extends Component {
  render() {
    var interestingPOIs2 = _.shuffle(interestingPOIs).splice(0, 5);

    return (
      <SecondContainer>
        <Sticky className="trigger" data-action-name="wrapupChronicleMap">
          <Box>
            It is particularly interesting to note that there are a number of street-level points of interest.
          </Box>
        </Sticky>
        
        <div style={{ height: this.props.windowHeight}}>
        </div>

        {
          _.map(interestingPOIs2, (interestingPOI, i) => {
            return (
              <InterestingPOIs {...interestingPOI} key={i}  />
            )
          })
        }
      </SecondContainer>
    );
  }
}

let mapStateToProps = state => {
  return {
    windowHeight: state.windowHeight
  }
}

export default connect(mapStateToProps)(SectionOddPOIs);