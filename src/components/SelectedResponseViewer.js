import React, { Component } from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components';
import _ from 'lodash';
import mixins from '../stylesheets/mixins';
import { Gutter } from '../stylesheets/components';
import { changeSelectedOsmUserResponse, changeOsmUserHistories, changeOsmUserHistoriesIdx } from '../actions';
import axios from 'axios';
import * as d3 from 'd3';
import moment from 'moment';

const Fragment = React.Fragment;
const RespContainer = styled.div`

  position: fixed;
  bottom: 10px;
  left: 10px;
  z-index:20;
  background-color: white;
  padding: 10px;
  width: 50%;
  border: 1px solid #ccc;
  line-height: 1.6;
  word-break: break-word;

  .rela-cont {
    position:relative;
  }

  .resp-content {
    
    max-height: 300px;
    overflow-y: scroll;
    line-height: 1.6;
  }
  span {
    padding: 3px 5px;
  }

  .close-btn {
    position:absolute;
    right: 10px;
    top: 2px;
  }
`;

const DataInfoContainer = styled.div`
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index:20;
  background-color: white;
  border: 1px solid #ccc;
  padding: 10px;
`;


const POIBox = styled.div`
  color: black;
  display:flex;
  justify-content: space-between;
  width: 250px;
`;

const TitleArea = styled.div`
  width:125px;
`;

const Label = styled.h4`
  ${mixins.LABEL_BOLD_TYPE}
  font-size:0.7em;
  color:#777; 
  margin-bottom: 5px;
`;

const Value = styled.div`
  font-size: 0.9em;
  color: black;
  padding-right: 10px;
`;

const Date = styled.div`
  ${mixins.LABEL_REGULAR_TYPE}
  font-size:0.8em;
  margin-top: -3px;
  color: #AAA;
`;

const CategorySpan = styled.span`
  font-size: 0.8em;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  padding: 2px 5px;
  line-height: 1.7;
  margin-right: 5px;
  word-break: break-all;
`

const RespInfoArea = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  
  bottom: 0px;
  padding-top: 5px;
  background: white;
  width: calc(100% - 10px);


  div.left-inner {
    width: calc(100% - 150px);
  }

   div.right-inner {
     width: 120px;
   }

  div.left-inner {
    line-height: 1.6;
  }

  div.right-inner {
    text-align:right;
    font-size:0.9em;
    color:#777;
  }

  i {
    font-style: italic;
  }
`;

class SelectedResponseViewer extends Component {
  constructor(props){
    super(props);
    
    this.intervalId = null;
  }
  componentDidMount(){
    document.body.style.overflow = 'hidden';

    this.loadOsmUserSampleData();
  }

  loadOsmUserSampleData(){

    let { selectedOsmUserResponse } = this.props;
    axios.get(`https://nkosm.wonyoung.so/api/osm_users/${selectedOsmUserResponse.id}.json`)
      .then((response) => {
        this.props.dispatch(changeOsmUserHistories(response.data.osm_user.histories));

        // response.data.osm_user.histories

      })
      .catch(function (error) {
        console.log(error);
      })
  }

  componentWillUnmount(){
    document.body.style.overflow = 'auto';
    // clearInterval(this.intervalId);
  }

  handleClose(e){
    this.props.dispatch(changeSelectedOsmUserResponse(null));
    this.props.dispatch(changeOsmUserHistories(null));
  }

  getSelectedColorCategories(selectedOsmUserResponse, responseCategories, colorScale){
    let respCategories = _.uniq(_.compact(_.map(selectedOsmUserResponse.responses, response => {
      return response.category_id === 12 ? null : response.category_id
    })));

    let result = [];
    _.each(respCategories, respCategory => {
      let c = _.find(responseCategories, rc => { return rc.id === respCategory });
      result.push({
        ...c,
        color: colorScale(c.id)
      });
    })

    return result;
  }
  
  componentDidUpdate(prevProps){
   
  }

  render() {
    let { selectedOsmUserResponse, responseCategories, osmUserHistories, osmUserHistoriesIdx } = this.props;
    // debugger;
    let colorScale = d3.scaleOrdinal(d3.schemeSet3).domain(_.map(responseCategories, rc => { return rc.id}));
    let selectedColorCategories = this.getSelectedColorCategories(selectedOsmUserResponse, responseCategories, colorScale);
    let osmHistory;

    if (!_.isNull(osmUserHistories)) {
      if (!_.isUndefined(osmUserHistories[osmUserHistoriesIdx])){
        osmHistory = osmUserHistories[osmUserHistoriesIdx].features[0];

      }
    }
    
    return (
      <Fragment>

        <RespContainer>
          <div className='rela-cont'>
            <button className="close-btn" onClick={this.handleClose.bind(this)}><img src="./assets/close_btn.svg" alt="close_btn" /></button>

            <div className="resp-content">
              
              <div>
                -
              </div>

              {
                _.map(selectedOsmUserResponse.responses, (r, i) => {
                  
                  let bgColor = r.category_id === 12 ? "transparent": colorScale(r.category_id);
                  
                  return (
                    <span key={i} style={{backgroundColor: bgColor}}>
                      {r.resp}
                    </span>
                  )
                })
              }

              <Gutter h={70}></Gutter>
            

            </div>

            <RespInfoArea>

              <div className="left-inner">
                {
                  _.map(selectedColorCategories, scc => {
                    return (
                      <CategorySpan key={scc.id} style={{ backgroundColor: scc.color }}>
                        {scc.category_name}
                      </CategorySpan>
                    )
                  })
                }
              </div>
              <div className="right-inner">
                - P{ selectedOsmUserResponse.id }<br/>
                <i>Heavy Contributor</i>
              </div>
            </RespInfoArea>
          </div>
          
          
        
        </RespContainer>
        {
          !_.isUndefined(osmHistory) ?
          <DataInfoContainer>
            <POIBox>
              <TitleArea>
                <Label>
                  Name
              </Label>
                <Value>
                    {_.isNull(osmHistory.properties.name_en) ? (_.isNull(osmHistory.properties.name) ? "–" : osmHistory.properties.name) : osmHistory.properties.name_en }
                </Value>
              </TitleArea>
              <TitleArea>
                <Label>
                  Contributed Date
                </Label>
                <Date>
                  {moment.unix(osmHistory.properties.osm_timestamp).format("MMMM DD, YYYY")}
                </Date>
              </TitleArea>
            </POIBox>
          </DataInfoContainer> : null
        }
        
      </Fragment>
    )
  }
}

let mapStateToProps = state => {
  return {
    selectedOsmUserResponse: state.selectedOsmUserResponse,
    responseCategories: state.responseCategories,
    osmUserHistories: state.osmUserHistories,
    osmUserHistoriesIdx: state.osmUserHistoriesIdx
  }
};

export default connect(mapStateToProps)(SelectedResponseViewer);