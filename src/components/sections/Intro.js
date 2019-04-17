import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import mixins from '../../stylesheets/mixins';
import { SectionContainer } from '../../stylesheets/components';

const SubtitleKo = styled.div`
  ${mixins.BOLD_TYPE}
  font-size: 0.85em;
  text-align: center;
`;

const IntroContainer = styled(SectionContainer)`
  background-image: linear-gradient(-180deg, rgba(231, 247, 251, 0.83) 22%, rgba(231, 247, 251, 0.00) 81%);
`;

const TitleContainer = styled.div`
  width: 600px;
  margin: 0 auto;
  padding-top: 120px;
`;

const H1 = styled.h1`
  ${mixins.TITLE_TYPE}
  text-align: center;
  font-size:2.5em;
  line-height: 1.2;
  margin: 10px 0;
`;

const SubParagraph = styled.p`
  ${mixins.BOLD_TYPE}
  text-align: center;
  font-size:1.5em;
  line-height: 1.35;
  margin-top: 10px;
`;

const DateBox = styled.div`
  ${mixins.LABEL_REGULAR_TYPE}
  border: 1px solid #CCCCCC;
  padding: 5px;
  text-align: center;
  background-color: white;
  display: block;
  font-size:0.8em;
  line-height:1.5;
  color: #888;

  text-align: center;
  margin: 20px auto;
  width: 105px;

`;

const Prompt = styled.div`
  position: absolute;
  width: 48px;
  height: 26px;
  bottom: 3rem;
  left: 50%;
  margin-left: -24px;
  animation: bounce 2s infinite;
  opacity: ${props => props.titleHeader ? 0 : 1};
  transition: .5s opacity;
`;

class Intro extends Component {
  render() {
    let { titleHeader } = this.props;
    return (
      <IntroContainer className="trigger" data-action-name="changeIntro" style={{ height: this.props.windowHeight}}>
      
        <TitleContainer>
          <SubtitleKo>
            북한의 지도 제작자
          </SubtitleKo>

          <H1>
            Cartographers <br/>
            of North Korea
          </H1>

          <SubParagraph>
            An analysis of the OpenStreetMap data in North Korea: Who are the contributors? What is the relationship between  them and the North Korean Government?
          </SubParagraph>

          <DateBox>
            January 5th<br/>Wonyoung So
          </DateBox>
        </TitleContainer>

        <Prompt titleHeader={titleHeader}>
          <svg x="0px" y="0px" width="48px" height="26px" viewBox="0 0 48 26" enableBackground="new 0 0 48 26">
            <g>
              <path fill="#222" d="M24.146,26c-0.53,0-1.039-0.284-1.414-0.659L0.586,3.158c-0.781-0.781-0.781-2.066,0-2.846
                c0.78-0.781,2.048-0.791,2.828-0.009L24.137,21.02L44.576,0.305c0.776-0.787,2.042-0.796,2.829-0.021
                c0.786,0.776,0.794,2.042,0.019,2.828L25.57,25.332C25.196,25.711,24.686,26,24.153,26C24.151,26,24.149,26,24.146,26z"></path>
            </g>
          </svg>
        </Prompt>

      </IntroContainer>
    );
  }
}

let mapStateToProps = state => {
  return {
    windowHeight: state.windowHeight,
    titleHeader: state.titleHeader
  }
}

export default connect(mapStateToProps)(Intro);