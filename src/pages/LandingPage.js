import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import mixins from '../stylesheets/mixins';
import { Gutter } from '../stylesheets/components';

const Fragment = React.Fragment;

const SubtitleKo = styled.div`
  ${mixins.BOLD_TYPE}
  font-size: 0.85em;
`;

const H1 = styled.h1`
  ${mixins.TITLE_TYPE}
  font-size:2.5em;
  line-height: 1.2;
  margin: 10px 0;
`;

const Container = styled.div`
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  padding: 60px;

  div.column:first-child {
    width: calc(60% - 50px);
  }

  div.column:last-child {
    width: calc(40% - 50px);
  }

  p.name {
    font-family: "Caponi Display";
    font-weight: 700;
  }

  p.subtitle { 
    font-family: "Roboto";
    font-weight: 700;
    font-size:0.9em;
    margin-bottom: 5px;
  }

  p.desc {
    font-family: "Caponi Display";
    font-weight: 400;
    line-height: 1.4;
    font-size:1.5em;
  }
`;

const AppLink = styled(Link)`
  background-color: black;
  color: white;
  display: inline-block;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 1.3em;
  font-family: "Caponi Display";
  font-weight: 700;
  line-height: 1.2;
`;


const BackgroundContainer = styled.div`
  background: url(./assets/back_project_page.png) no-repeat center bottom;
  background-size: 100% auto;
`;


class LandingPage extends Component {
  render() {
    return (
      <BackgroundContainer>
        <Container>
          <div className="column">

            <SubtitleKo>
              북한의 지도 제작자
            </SubtitleKo>

            <H1>
              Cartographers <br />
              of North Korea
            </H1>

            <p className="name">
              Wonyoung So
            </p>
          </div>
          
          <div className="column" style={{fontSize: "0.8em"}}>
            <Gutter h={30} />
            6.894<br/>
            Interactive Data Visualization
            <br/><br/>
            Massachusettes<br/>
            Institute<br/>
            of Technology
          </div>
        </Container>

        <Gutter h={70} />

        <Container>
          <div className="column">
            <p className="subtitle">
              Abstract
            </p>
            <p className="desc">
              The focus of this project is to discuss the collaborative mapping strategies of contributors in uncharted territories, using North Korea as a case study. OpenStreetMap (OSM) enables “armchair mappers” to map a territories such as North Korea in which the government has controlled internet access to its residents. Here, I ask the questions of who is mapping to North Korea, which tools and methods the contributors use to have access and represent North Korea, and which are the motivations behind such mapping endeavor. To do this, I analyze the technical aspects of OSM data in North Korea, and analyze the structured correspondence I exchanged with 889 contributors. 
            </p>
          </div>
          <div className="column">
            <AppLink to="/viz">
              Launch<br />
              The Application
            </AppLink>
          </div>
        </Container>

        <Container>
          <div className="column">
            <p className="subtitle">
              Video
            </p>
            
            <iframe width="100%" height="315" src="https://www.youtube.com/embed/jT7cqkCgtPw" frameborder="0" allow="encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
          <div className="column">

            <p className="subtitle">
              Paper
            </p>

            <a href="#">
              Wonyoung So. Cartographers of North Korea: Technical, political, and social aspects inherent to mapping.
            </a>
          </div>
        </Container>

        <Container>
          <div className="column">
            <p className="subtitle">
              License
            </p>

            <p>
              OpenStreetMap data is under the Open Database License (ODbL) version 1.0 share-alike license for data. for aggregating the changeset data, I used the center point of each boundary.
            </p>
          </div>
        </Container>
      </BackgroundContainer>
    )
  }
}

let mapStateToProps = state => {
  return {
    windowWidth: state.windowWidth,
    windowHeight: state.windowHeight
  }
}

export default connect(mapStateToProps)(LandingPage);