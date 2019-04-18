import React, { Component } from 'react'
import _ from 'lodash';
import styled from 'styled-components';

const TextSpan = styled.span`
  word-break: break-word;
`;

const RespArea = styled.div`
  margin-bottom: 10px;
  font-size:0.5em;
  line-height: 8px;
`;

export default class UserResponse extends Component {
  render() {
    
    return (
      <RespArea>
        {
          _.map(this.props.responses, response => {
            return (
              <TextSpan key={response.id}>
                { response.resp }
              </TextSpan> 
            );
          })
        }
      </RespArea>
    )
  }
}
