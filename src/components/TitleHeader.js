import React, { Component } from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components';
import mixins from '../stylesheets/mixins';

const HeaderContainer = styled.div`
  position: fixed;
  left: 10px;
  top: 10px;
  z-index: 5;
  opacity: ${props => props.titleHeader ? 1 : 0};
  ${mixins.TITLE_TYPE}
  transition: 0.4s opacity;
  border: 1px solid #CCCCCC;
  padding: 7px;
  background-color: white;
  font-size: 0.8em;
  color: black;

  .ko {
    ${mixins.BOLD_TYPE}
    color: black;
    font-size: 0.9em;
  }
`;

const DateArea = styled.div`
  position:absolute;

  border: 1px solid #CCCCCC;
  padding: 4px 5px;
  background-color: white;
  
  ${mixins.LABEL_REGULAR_TYPE}
  right: 0;
  top: 2px;
  transform: translate(87%, 0);
  width: auto;
  font-size:0.9em;
  color: #888;
`;

class TitleHeader extends Component {
  render() {
    return (
      <HeaderContainer titleHeader={this.props.titleHeader}>    
        Cartographers of North Korea &nbsp;<span className="ko">북한의 지도 제작자</span>
      </HeaderContainer>
    )
  }
}

let mapStateToProps = state => {
  return {
    titleHeader: state.titleHeader
  }
}
export default connect(mapStateToProps)(TitleHeader);