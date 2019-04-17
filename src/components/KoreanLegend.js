import React, { Component } from 'react'
import styled from 'styled-components';
import mixins from '../stylesheets/mixins';

const LegendBox = styled.div`
  background-color: white;
  border: 1px solid #ccc;
  padding: 10px;
  position: absolute;
  right: 10px;
  top: 10px;
  transition: 0.4s opacity;
  opacity: 0;
  display: flex;
`;

const RedCircle = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 20px;
  background-color: red;
  margin-top: 3px;
`;

const Label = styled.div `
  margin-left: 7px;
  ${mixins.LABEL_REGULAR_TYPE}
  font-size:0.7em;
  color:#999;
`;

class KoreanLegend extends Component {
  render() {
    return (
      <LegendBox style={{ opacity: this.props.show ? 1 : 0 }}>
        <RedCircle />
        <Label>
          Contributed in Korean
        </Label>
      </LegendBox>
    )
  }
}

export default KoreanLegend;