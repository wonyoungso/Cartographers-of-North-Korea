import React, { Component } from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';
import { addTextCategorySelected, removeTextCategorySelected, changeOsmUserReponseData } from '../actions';
import _ from 'lodash';
import { SUBCATEGORY_SELECT, CATEGORIES_COLORS } from '../constants/defaults';
import * as d3 from 'd3';
import {TextVisualizationResponses } from './';

const Fragment = React.Fragment;
const Bar = styled.div`
  position: fixed;
  z-index: 8;
  top: 0;
  opacity: 0;
  transition: 0.4s opacity;
  width: 170px;

  section {
    padding: 10px;
    margin-bottom: 20px;
  }

  h3 {
    font-size: 1.0em;
    line-height: 1.1;
    color: black;
    margin-bottom: 7px;
    font-weight: 700;
    text-indent: -4px;
  }

  p {
    color: #888;
    line-height: 1.2;
    font-family: "Roboto", sans-serif;
    font-size:0.8em;
  }

  
`;

const CategoryLink = styled.a`
  font-size: 0.7em;
  display: inline-block;
  margin-bottom: 6px;
  margin-left: -5px;
  padding: 4px;
  line-height: 1.2;
  cursor: pointer;
  background:white;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  color:black;
`

const UnCategoryLink = styled.a`
  font-size: 0.7em;
  display: inline-block;
  margin-bottom: 6px;
  margin-left: -5px;
  line-height: 1.2;
  padding: 4px;
  cursor: pointer;
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  color:white;
  position:relative;
  padding-right:20px;

  
  .close-btn {
    font-size:1.2em;

    top: 1px;
    right: 6px;
    position: absolute;
  }
`
const ArrowArea = styled.div`
  position: fixed;
  z-index: 9;
  opacity: 1;
  transition: 0.4s opacity;
  left: 180px;
  height: 32px;
  width: calc(100% - 190px);
  bottom: 20px;
  display: flex;
  justify-content: space-between;
  
  hr {
    border:none;
    position:absolute;
    top:20px;
    border:1px solid #888;
    width:100%;
  }
`;


class TextVisualization extends Component {
  
  componentDidMount(){
    axios.all([axios.get('https://nkosm.wonyoung.so/api/osm_users.json')])
    .then(axios.spread((response) => {
      if (response.data.success) {
        this.props.dispatch(changeOsmUserReponseData(response.data.osm_users, response.data.response_categories));
      }
    }));

  }
  
  handleAddTextCategory(c) {
    let { selectedTextCategory } = this.props;
    
    if ( !_.isUndefined(selectedTextCategory[c.id]) ) {

      this.props.dispatch(removeTextCategorySelected(c.id));
    } else {
    
      this.props.dispatch(addTextCategorySelected(c.id, {id: c.id }));
    
    }
  }

  render() {
    let { textVisualization, selectedTextCategory, responseCategories } = this.props;
    let subCategories = _.groupBy(responseCategories, c => { return c.subcategory_id; });
    let colorScale = d3.scaleOrdinal().domain(_.map(responseCategories, rc => { return rc.id})).range(CATEGORIES_COLORS);
    
    return (
      <Fragment>
        <Bar style={{left: 0, opacity: textVisualization ? 1 : 0}}>
          {
            _.map(subCategories, (categories, key) => {
              return (
                <section key={key}>
                  <h3>
                    { SUBCATEGORY_SELECT[Number(key)][0] }
                  </h3>
                  {
                    _.map(categories, c => {
                
                      let selected = _.isUndefined(selectedTextCategory[c.id]);
                      return selected ? 
                        <CategoryLink onClick={this.handleAddTextCategory.bind(this, c)} key={c.id}>{c.category_name}</CategoryLink> : 
                        <UnCategoryLink style={{backgroundColor: colorScale(c.id)}} onClick={this.handleAddTextCategory.bind(this, c)} key={c.id}>
                          {c.category_name} <span className="close-btn">⨯</span>
                        </UnCategoryLink>;
                    })
                  }
                </section>
                
              );
            })
          }
        </Bar>
        
       

        <ArrowArea style={{opacity: textVisualization ? 1 : 0}}>
          <img src={`${process.env.PUBLIC_URL}/assets/more_data_arrow.svg`} alt="more data contributed" />
          <img src={`${process.env.PUBLIC_URL}/assets/less_data_arrow.svg`} alt="less data contributed" />
        </ArrowArea>

        {/* <Bar style={{right: 0, opacity: textVisualization ? 1 : 0}}>
          <section>
            <h3>
              Responses<br />
              211
            </h3>
            <p>
              from 889<br />
              contributors
            </p>
          </section>
        </Bar> */}
      </Fragment>
    )
  }
}

let mapStateToProps = state => {
  return {
    textVisualization: state.textVisualization,
    selectedTextCategory: state.selectedTextCategory,
    responseCategories: state.responseCategories

  }
}
export default connect(mapStateToProps)(TextVisualization);