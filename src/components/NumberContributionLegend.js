import React, { Component } from 'react'
import styled from 'styled-components';
import mixins from '../stylesheets/mixins';
import _ from 'lodash';
import { numberWithDelimiter } from '../utils';

const LegendBox = styled.div`
  background-color: white;
  border: 1px solid #ccc;
  padding: 10px;
  position: absolute;
  right: 10px;
  top: 10px;
  transition: 0.4s opacity;
  opacity: 0;
  


  @media (max-width: 768px) {
    right: 0;
    top: -100px;
  }

  h4 {
    ${mixins.LABEL_BOLD_TYPE}
    font-size:0.7em;
    color:#999;
  }

  div.legend-inner { 
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    align-content: stretch;    
    width: 200px;

  }
  div.legend {
    width: 65px;
    display: flex;
  }
`;

const Circle = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 20px;
  margin-top: 3px;
`;

const Label = styled.div `
  margin-left: 7px;
  ${mixins.LABEL_REGULAR_TYPE}
  font-size:0.7em;
  color:#999;
`;

class NumberContributionLegend extends Component {
  render() {
    
    return (
      <LegendBox style={{ opacity: this.props.show ? 1 : 0 }}>
        <h4>
          # of Contribution 
        </h4>
        
        <div className="legend-inner">
          
          {
            _.map(this.props.scale.domain(), (d, i) => {
              return (
                <div className="legend" key={i}>
                  <Circle style={{ backgroundColor: this.props.scale(d) }} />
                  <Label>
                    { numberWithDelimiter(d) }
                  </Label>
                </div>
              )
            })
          }

        </div>
      </LegendBox>
    )
  }
}

export default NumberContributionLegend;