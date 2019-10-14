import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import axios from 'axios';
import { changeOsmUserReponseData } from '../actions';
import _ from 'lodash';
import { CATEGORIES_COLORS } from '../constants/defaults';
import styled from 'styled-components';
import * as d3 from 'd3';
import { numberWithDelimiter } from '../utils';

const Container = styled.div`
  display: flex;
  align-items:center;
  justify-content: center;
  height: 100vh;
`;

const BigText = styled.div`
  width: 1400px;
  p.main {
    font-size:5.0em;
    line-height: 1.2;
    text-indent: -20px;
  }

  p.info {
    font-family: "Roboto";
    font-size:1.5em;
    line-height: 1.2;
  }
`;

const Category = styled.div`
  font-family: "Roboto";
  font-size:1.5em;
  line-height: 1.2;
  position:fixed;
  left: 50%;
  top: 50px;
  transform: translate(-50%, 0);
`;

const SubCategory = styled.div`

  font-family: "Roboto";
  font-size:1.5em;
  line-height: 1.2;
  position:fixed;
  left: 50%;
  bottom: 50px;
  transform: translate(-50%, 0);
`;

const SUBCATEGORY = {
  1: "Why",
  2: "How",
  3: "Comments"
}

class SelectedSentences extends Component {
  constructor(props){
    super(props);

    this.intervalId = null;
    this.state = { 
      selectedOsmUser: null,
      selectedResponse: null
    };
  }
  componentWillUnmount(){
    clearInterval(this.intervalId);

  }
  componentDidMount() {
    document.body.style.transition = "0.5s background-color";
    axios.all([axios.get('https://nkosm.s3.amazonaws.com/osm_users.json')])
      .then(axios.spread((response) => {
        if (response.data.success) {
          this.props.dispatch(changeOsmUserReponseData(response.data.osm_users, response.data.response_categories));

          this.initRolling();
        }
      }));

  }

  initRolling(){

    this.intervalId = setInterval(() => {
      let { osmUsers } = this.props;

      let osmUser = osmUsers[_.random(0, osmUsers.length)];
      let response = "";

      if (osmUser) {
        let filtered = _.filter(osmUser.responses, r => {
          return r.category_id !== 12;
        });

        console.log("filtered.length", filtered.length);
        if (filtered.length === 0) {
          filtered = osmUser.responses;
          console.log("changed filtered.length", filtered.length);
        }
        // let filtered = osmUser.responses;
        if (filtered.length === 1) {
          response = filtered[0];
        } else {
          response = filtered[_.random(0, filtered.length)];
        }
      }


      this.setState({
        selectedOsmUser: osmUser,
        selectedResponse: response
      });

    }, 7000);

  }

  render() {
    let { selectedOsmUser, selectedResponse } = this.state;
    let { responseCategories } = this.props;

    if (selectedResponse) {
      let colorScale = d3.scaleOrdinal().domain(_.map(responseCategories, rc => { return rc.id })).range(CATEGORIES_COLORS);
      document.body.style.backgroundColor = colorScale(selectedResponse.category_id);
    }

    
    return (
      <Fragment>
        <Container>
          {
            selectedResponse ?
            <BigText>
              <p className="main">
                “{selectedResponse.resp}”
              </p>
              <p className="info">
                —P{selectedOsmUser.id}<br/>
                {numberWithDelimiter(selectedOsmUser.all_count)} Contribution
              </p>
            </BigText> : null
          }
        </Container>
        
        {
          selectedResponse && responseCategories[selectedResponse.category_id] ? 
          <Fragment>
            <Category>
              {SUBCATEGORY[responseCategories[selectedResponse.category_id].subcategory_id]}
            </Category>
            <SubCategory>
                {responseCategories[selectedResponse.category_id].category_name }
            </SubCategory>
          </Fragment> : null
        }

      </Fragment>
    )
  }
}

let mapStateToProps = state => {
  return {
    osmUsers: state.osmUsers,
    responseCategories: state.responseCategories
  }
}

export default connect(mapStateToProps)(SelectedSentences);
