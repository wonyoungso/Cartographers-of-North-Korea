import React, { Component } from 'react'
import _ from 'lodash';
import styled from 'styled-components';
import { changeSelectedOsmUserResponse } from '../actions';
import { connect } from 'react-redux';
import chroma from 'chroma-js';

const TextSpan = styled.span`
  word-break: break-word;
  
  color: ${props => props.color};
  background-color: ${props => props.color};
  transition: 0.4s all;

`;

const RespArea = styled.div`
  margin-bottom: 20px;
  font-size: 5px;
  line-height: 8px;
  cursor:pointer;
  transition: 0.4s all;
  -webkit-column-break-inside: avoid;
  page-break-inside: avoid;
  break-inside: avoid;

  &:hover {
    opacity: 0.6;
  }
`;

class UserResponse extends Component {
  handleClick(response){
    this.props.dispatch(changeSelectedOsmUserResponse({
      ...this.props
    })) 
  }

  render() {
    let { selectedTextCategory } = this.props;
    return (
      <RespArea onClick={this.handleClick.bind(this)}>
        {
          _.map(this.props.responses, response => {
            let selected = !_.isUndefined(selectedTextCategory[response.category_id]);
            
            return (
              <TextSpan key={response.id} color={selected ? this.props.colorScale(response.category_id) : "#CCC"}>
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
    selectedTextCategory: state.selectedTextCategory
  }
};

export default connect(mapStateToProps)(UserResponse);