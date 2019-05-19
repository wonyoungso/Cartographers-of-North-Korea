import React, { Component } from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components';
import mixins from '../stylesheets/mixins';
import world_data from '../constants/world_data.json';
import { numberWithDelimiter } from '../utils';
import {changeWorldMapIndividual} from '../actions';
import _ from 'lodash';

const Box = styled.div`
  position: absolute;
  left: 50%;
  background-color: white;
  border: 1px solid #ccc;
  padding: 10px 5px;
  font-size:1.1em;
  top: 50px;
  transform: translate(-50%, -100%);
  display: flex;
  width: 300px;
	justify-content: space-between;
`;

const Area = styled.div`
  width: 50%;
  padding: 0 5px;
`;

const Label = styled.h4`
  ${mixins.LABEL_BOLD_TYPE}
  font-size:0.65em;
  color:#777;
`;

const Value = styled.div `
  font-size: 0.9em;
  color: black;
  padding-right: 10px;
`;

const SmallSize = styled.span`
  ${mixins.LABEL_BOLD_TYPE}
  font-size: 0.7em;   
  position: relative;
  top: -1px;
`;

const CloseButton = styled.a`
  position: absolute;
  right: 8px;
  top: 1px;
  ${mixins.LABEL_BOLD_TYPE}

`;

const Fragment = React.Fragment;

class IndividualInfo extends Component {
  componentDidMount(){
    
  }

  getTop5Countries(currentIndividual) {

    let worldIds = _.map(_.filter(_.sortBy(currentIndividual.country_counts, country => country.count).reverse().splice(0, 5), c => c.count > 0), country => {
      return {
        id: country.world_id,
        count: country.count
      };
    });

    let labels = _.map(worldIds, worldId => {
      let label = _.find(world_data, w => {
        return w.id === worldId.id
      });

      label.count = worldId.count;

      return label;
    });

    return labels;
  }

  handleClick(e){
    this.props.dispatch(changeWorldMapIndividual(null));
  }

  render() {
    let { currentIndividual } = this.props;
    let top5Countries = this.getTop5Countries(currentIndividual);

    return (
      <Box>
        <CloseButton onClick={this.handleClick.bind(this)} href="javascript:void(0);">
          ⨯
        </CloseButton>
        <Area>
          <Label>
            Name
          </Label>
          <Value>
            P{currentIndividual.id}
          </Value>
        </Area>
        <Area>
          <Label>
            Top {top5Countries.length} Countries
          </Label>
          <Value>
            {
              _.map(top5Countries, (c, i) => {
                return (
                  <div key={i}>
                    {c.name_en} <SmallSize>{ numberWithDelimiter(c.count) }</SmallSize>
                  </div>
                )
              })
            }
          </Value>
        </Area>
      </Box>
    )
  }
}

let mapStateToProps = state => {
  return {
    currentIndividual: state.currentIndividual
  }
};

export default connect(mapStateToProps)(IndividualInfo);