import React, { Component } from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components';
import mixins from '../stylesheets/mixins';
import { Gutter } from '../stylesheets/components';
import { scaleLinear } from 'd3';
import moment from 'moment';
import { YearLegend } from './';

const Fragment = React.Fragment;

const Container = styled.div`
  position: fixed;
  right: 10px;
  top: 10px;
  z-index:4;
  opacity: ${props => props.show ? 1 : 0};
  transition: 0.4s opacity;


  @media (max-width: 768px) {
    top:50px;
    right: 11px;
  }
`;

const RightStat = styled.div`
 
  border: 1px solid #ccc;
  padding:10px;
  background-color: white;
`;

const Label = styled.h4`
  ${mixins.LABEL_BOLD_TYPE}
  text-align: right;
  font-size: 0.7em;
  color: #777;
`;

const Value = styled.p`
  ${mixins.TITLE_TYPE}
  font-size:1.5em;
  color:black;
  text-align: right;
`;


const Timeline = styled.div`

  border: 1px solid #ccc;
  padding:15px 10px;
  background-color: white;
  height: 300px;
  width: 15px;
  position: relative;
  float: right;
`;

const Line = styled.div`
  position: absolute;
  left: 50%;
  width: 3px;
  transform: translate(-50%, 0);
  background-color: ${ props => props.color };
  height: calc(${ props => props.height }% - 30px);
  transition: 0.2s height;
`;

const Date = styled.div`
  position: absolute;
  right: 27px;
  z-index: 6;
  width: max-content;
  ${mixins.LABEL_REGULAR_TYPE}
  font-size:0.7em;
  top: calc(${ props => props.top }% - 30px);
  border: 1px solid #ccc;
  padding:10px;
  background-color: white;
  transition: 0.2s top;
`;

class TimelineScroller extends Component {
  render() {
    let timeScale = scaleLinear().domain([1184971551, 1539016223]).clamp(true).range([0, 100]);
    let { timelineUI, currentTimeStamp } = this.props;
    return (
      <Fragment>
        <Container show={timelineUI}>
          <RightStat>
            <Label>
              Total Contributors
            </Label>
            <Value>
              889
            </Value>
            <Gutter></Gutter>
            <Label>
              Total Contributions
            </Label>
            <Value>
              324,415
            </Value>
          </RightStat>
          <Gutter h={15}></Gutter>
          <Timeline>
            <Date top={timeScale(currentTimeStamp)}>
              {moment.unix(currentTimeStamp).format("MMMM DD, YYYY")}
            </Date>
            <Line color="#ddd" height={100} />
            <Line color="#000" height={timeScale(currentTimeStamp)} />
          </Timeline>
        </Container>
        <YearLegend />
      </Fragment>
    )
  }
}

let mapStateToProps = state => {
  return {
    timelineUI: state.timelineUI,
    currentTimeStamp: state.currentTimeStamp
  }
}

export default connect(mapStateToProps)(TimelineScroller);