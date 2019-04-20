import React, { Component } from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';
import { addTextCategorySelected, removeTextCategorySelected, changeOsmUserReponseData } from '../actions';
import _ from 'lodash';
import { SUBCATEGORY_SELECT } from '../constants/defaults';
import * as d3 from 'd3';

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
    font-size: 1.4em;
    line-height: 1.1;
    color:black;
    margin-bottom: 5px;
    font-weight: 700;
  }

  p {
    color: #888;
    line-height: 1.2;
    font-family: "Roboto", sans-serif;
    font-size:0.8em;
  }

  
`;

const CategoryLink = styled.a`
  font-size: 0.85em;
  display: block;
  margin-bottom: 8px;
  line-height: 1.2;
  cursor: pointer;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  color:black;
`

const UnCategoryLink = styled.a`
  font-size: 0.85em;
  display: inline-block;
  margin-bottom: 8px;
  margin-left: -5px;
  line-height: 1.2;
  padding: 5px;
  cursor: pointer;
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  color:black;
  position:relative;
  padding-right:20px;

  
  .close-btn {
    font-size:1.2em;

    top: 1px;
    right: 6px;
    position: absolute;
  }
`



class TextVisualization extends Component {
  
  componentDidMount(){
    axios.all([axios.get('http://nkosm.wonyoung.so/api/osm_users.json')])
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
    let colorScale = d3.scaleOrdinal(d3.schemeSet3).domain(_.map(responseCategories, rc => { return rc.id}));
    
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
        
        <Bar style={{right: 0, opacity: textVisualization ? 1 : 0}}>
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
        </Bar>
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