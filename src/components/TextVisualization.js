import React, { Component } from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components';
import { UserResponse } from './';
import axios from 'axios';
import _ from 'lodash';
import { SUBCATEGORY_SELECT } from '../constants/defaults';

const GridBox = styled.div`
  column-count: 8;
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
const LeftBar = styled.div`
  width: 150px;

  section {
    padding: 10px;
    margin-bottom: 30px;
  }

  h3 {
    font-size: 1.4em;
    line-height: 1.1;
    color:black;
    margin-bottom: 8px;
  }

  p {
    color: #888;
    line-height: 1.2;
  }

  a {
    font-size: 0.9em;
    display: block;
    margin-bottom: 10px;
    line-height: 1.0;
  }
`;

const Right = styled.div`
  margin-left: 50px;
  width:calc(100% - 250px);
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

  render() {
    let { textVisualization } = this.props;
    let { osm_users, responseCategories } = this.state;
    let subCategories = _.groupBy(responseCategories, c => { return c.subcategory_id; });

    return (
      <TextVizContainer style={{ opacity: 1 }}>
        <LeftBar>
          <section>
            <h3>
              Responses<br/>
              211
            </h3>
            <p>
              from 889<br/>
              contributors
            </p>
          </section>

          {
            _.map(subCategories, (categories, key) => {
              return (
                <section key={key}>
                  <h3>
                    { SUBCATEGORY_SELECT[Number(key)][0] }
                  </h3>
                  {
                    _.map(categories, c => {
                      return (
                        <a href="javascript:void(0);" key={c.id}>{c.category_name}</a>
                      )
                    })
                  }
                </section>
                
              );
            })
          }
        </LeftBar>
        <Right>
          <GridBox>
            {
              _.map(osm_users, ou => {
                return (
                  <UserResponse {...ou} key={ou.osm_user} />
                )
              })
            }
          </GridBox>
        </Right>
      </TextVizContainer>
    )
  }
}

let mapStateToProps = state => {
  return {
    textVisualization: state.textVisualization
  }
}
export default connect(mapStateToProps)(TextVisualization);