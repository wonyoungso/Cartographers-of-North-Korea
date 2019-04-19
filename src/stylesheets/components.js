import styled from 'styled-components';
import mixins from './mixins';

const SectionContainer = styled.section`
  width: 100%;
  position: relative;
`;

const Gutter = styled.div`
  height: ${props => props.h}px;
`;

const Sticky = styled.div`
  position:sticky;
  top: 10px;
  height:auto;
`;

const NonSticky = styled.div`
  width: 400px;
  position:relative;
  margin: 0 auto;
  z-index:5;
  ${mixins.BOLD_TYPE}
  font-size:1.2em;
  line-height:1.4;
  border: 1px solid #BBB;
  padding: 10px 15px;
  background: #E7F7FB;
  color: black;
`;


const Box = styled.div`
  /* ${mixins.ABSOLUTE_CENTER} */
  /* position: absolute; */
  /* left: 50%; */
  /* top: 0; */
  width: 450px;
  margin: 0 auto;
  height: auto;
  
  ${mixins.BOLD_TYPE}
  font-size:1.2em;
  border: 1px solid #BBB;
  padding: 10px 15px;
  background: #E7F7FB;
  color: black;
`;

export {
  SectionContainer,
  Box,
  Sticky,
  NonSticky,
  Gutter
};