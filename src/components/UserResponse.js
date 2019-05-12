import React, { Component } from 'react'
import _ from 'lodash';
import styled from 'styled-components';
import { changeSelectedOsmUserResponse } from '../actions';
import { connect } from 'react-redux';
import chroma from 'chroma-js';
import * as d3 from 'd3';

const TextSpan = styled.span`
  word-break: break-word;

  transition: 0.4s all;

`;

const RespArea = styled.div`
  margin-bottom: 5px;
  font-size: 4px;
  line-height: 1.5;
  cursor:pointer;
  transition: 0.4s all;
  -webkit-column-break-inside: avoid;
  page-break-inside: avoid;
  break-inside: avoid;

  &:hover {
    background-color: white;
  }
`;

class UserResponse extends Component {
  handleClick(response){
    this.props.dispatch(changeSelectedOsmUserResponse({
      ...this.props
    })) 
  }

  render() {
    let { selectedTextCategory, fontSize, lineHeight } = this.props;
    return (
      <RespArea style={{ fontSize: `${fontSize}px`, lineHeight: lineHeight }} onClick={this.handleClick.bind(this)}>
        {
          _.map(this.props.responses, response => {
            let selected = !_.isUndefined(selectedTextCategory[response.category_id]);
            
            return (
              <TextSpan key={response.id} style={{
                color: selected ? this.props.colorScale(response.category_id) : "#999",
                backgroundColor: selected ? this.props.colorScale(response.category_id) : "transparent"
              }}>
                { response.resp }
              </TextSpan> 
            );
          })
        }
      </RespArea>
    )
  }
}

let mapStateToProps = state => {
  return {
    windowWidth: state.windowWidth,
    selectedTextCategory: state.selectedTextCategory
  }
};

export default connect(mapStateToProps)(UserResponse);