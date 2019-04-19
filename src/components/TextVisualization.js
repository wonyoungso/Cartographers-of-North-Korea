import React, { Component } from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components';
import { UserResponse } from './';
import axios from 'axios';
import { addTextCategorySelected, removeTextCategorySelected } from '../actions';
import _ from 'lodash';
import { SUBCATEGORY_SELECT } from '../constants/defaults';
import * as d3 from 'd3';

const GridBox = styled.div`
  column-count: 6;
  column-gap: 1em;
  width: calc(100% -20px);
`;

const TextVizContainer = styled.div`
  position:fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 15;
  background:white;
  transition: 0.5s opacity;
  overflow-y:scroll;
  display: flex;
`;
const Bar = styled.div`
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
  line-height: 1.2;
  padding: 5px;
  cursor: pointer;
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  color:white;
  
  .close-btn {
    font-size:1.2em;
    margin-left: 10px;
  }
`
const Main = styled.div`
  margin: 0 25px;
  width:calc(100% - 340px);
  padding-top: 9px;
`;

class TextVisualization extends Component {
  constructor(props){
    super(props);
    this.state = {
      osm_users: [],
      responseCategories: []
    };
  }
  componentDidMount(){
    axios.all([axios.get('http://nkosm.wonyoung.so/api/osm_users.json')])
    .then(axios.spread((response) => {
      if (response.data.success) {
        this.setState({
          osm_users: response.data.osm_users,
          responseCategories: response.data.response_categories
        });
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
    let { textVisualization, selectedTextCategory } = this.props;
    let { osm_users, responseCategories } = this.state;
    let subCategories = _.groupBy(responseCategories, c => { return c.subcategory_id; });
    let colorScale = d3.scaleOrdinal(d3.schemeSet3).domain(_.map(responseCategories, rc => { return rc.id}));
    
    return (
      <TextVizContainer style={{ opacity: 1 }}>
        <Bar>
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
        <Main>
          <GridBox>
            {
              _.map(osm_users, ou => {
                return (
                  <UserResponse {...ou} colorScale={colorScale} key={ou.osm_user} />
                )
              })
            }
          </GridBox>
        </Main>
        <Bar>
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
      </TextVizContainer>
    )
  }
}

let mapStateToProps = state => {
  return {
    textVisualization: state.textVisualization,
    selectedTextCategory: state.selectedTextCategory
  }
}
export default connect(mapStateToProps)(TextVisualization);