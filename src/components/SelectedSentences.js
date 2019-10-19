import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import axios from 'axios';
import { changeOsmUserReponseData } from '../actions';
import _ from 'lodash';
import { CATEGORIES_COLORS } from '../constants/defaults';
import styled from 'styled-components';
import * as d3 from 'd3';
import { numberWithDelimiter } from '../utils';
import Typist from 'react-typist';
import { Gutter } from '../stylesheets/components';
const Container = styled.div`
  display: flex;
  align-items:center;
  justify-content: center;
  height: 100vh;
`;

const BigText = styled.div`
  width: 1500px;
  div.main {
    font-size:5.0em;
    line-height: 1.1;
    text-indent: -20px;
  }

  p.info {
    font-family: "Roboto";
    font-size:1.5em;
    line-height: 1.4;
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
      selectedResponses: [],
      chosenCategoryId: 1,
      responseStr: "",
      typing: true
    };

    this.initRolling = this.initRolling.bind(this);
  }
  componentWillUnmount(){
    clearInterval(this.intervalId);

  }
  componentDidMount() {
    document.body.style.transition = "0.5s background-color";
    axios.all([axios.get('https://nkosm.s3.amazonaws.com/osm_users_exhibition.json')])
      .then(axios.spread((response) => {
        if (response.data.success) {
          this.props.dispatch(changeOsmUserReponseData(response.data.osm_users, response.data.response_categories));

          this.initRolling();
        }
      }));

  }

  initRolling(){
    _.delay(() => {
      let { osmUsers } = this.props;
      let osmUsersFiltered = _.filter(osmUsers, o => { return o.responses.length > 0; });
      let osmUser = osmUsersFiltered[_.random(0, osmUsersFiltered.length - 1)];
      let responses = [];
      let chosenCategoryId;
    
      if (osmUser) {
        let filtered = _.filter(osmUser.responses, r => {
          return r.category_id !== 12;
        });

        console.log("filtered.length", filtered.length);
        if (filtered.length === 0) {
          osmUser = osmUsers[0];
          filtered = _.filter(osmUser.responses, r => {
            return r.category_id !== 12;
          });
        }
        // let filtered = osmUser.responses;
        if (filtered.length === 1) {
          responses = [filtered[0]];
          chosenCategoryId = filtered[0].category_id;
        } else {
          // choose random category
          let categoryIds = _.map(filtered, r => r.category_id);
          chosenCategoryId = categoryIds[_.random(0, categoryIds.length - 1)];

          responses = _.filter(filtered, r => {
            return r.category_id === chosenCategoryId;
          })

        }
      }

      console.log(osmUser, responses);

      let responseStrArray = _.map(responses, (r, i) => {
        return `“${r.resp}”`;
      });

      let finalStr = [];

      _.each(responseStrArray, (str, i) => {
        if ((finalStr + str).length <= 280) {
          finalStr.push(str);
        } else {
          if (i === 0) {

            finalStr.push(_.truncate(str, { omission: "...”", length: 280 }));
          }
        }
      })



      
      this.setState({
        selectedOsmUser: osmUser,
        selectedResponses: responses,
        chosenCategoryId: chosenCategoryId,
        responseStr: finalStr.join(" ... "),
        typing: false
      }, () => {
        this.setState({ typing: true });
      });

    }, 6000);

  }

  render() {
    let { selectedOsmUser, selectedResponses, responseStr, chosenCategoryId } = this.state;
    let { responseCategories } = this.props;
    let selectedCategory = null;
    let categoryName;
    let subCategoryName;
    let colorScale;

    if (selectedResponses.length > 0) {
      colorScale = d3.scaleOrdinal().domain(_.map(responseCategories, rc => { return rc.id })).range(CATEGORIES_COLORS);
      document.body.style.backgroundColor = colorScale(selectedResponses[0].category_id);
    }
    console.log("responseStr", responseStr);
    
    if (responseCategories.length > 0) {

      if (chosenCategoryId === 12) {

        categoryName = "Others";
        subCategoryName = "Comments";
        document.body.style.backgroundColor = colorScale(12);
      }else {

        
        selectedCategory = _.find(responseCategories, c => {
          return c.id === chosenCategoryId;
        });

        console.log("selectedCategory", chosenCategoryId, selectedCategory)
        categoryName = selectedCategory.category_name;
        subCategoryName = SUBCATEGORY[selectedCategory.subcategory_id];

      }
    }
    return (
      <Fragment>
        <Container>
          {
            selectedResponses.length > 0 ?
            <BigText>
              <div className="main">
                { 
                  this.state.typing ?
                  <Typist 
                    avgTypingDelay={30}
                    cursor={{
                      show: true,
                      blink: true,
                      element: '|',
                      hideWhenDone: false,
                      hideWhenDoneDelay: 1000
                    }}
                    onTypingDone={this.initRolling}>
                    {responseStr}
                  </Typist> : null 
                }
              </div>

              <Gutter h={20} />
              <p className="info">
                —P{selectedOsmUser.id}<br/>
                {numberWithDelimiter(selectedOsmUser.all_count)} Contribution
              </p>
            </BigText> : null
          }
        </Container>
        
        {
          responseCategories.length > 0 ? 
          <Fragment>
            <Category>
                {subCategoryName }
            </Category>
            <SubCategory>
                {categoryName }
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
