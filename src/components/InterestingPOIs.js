import React, { Component } from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components';
import mixins from '../stylesheets/mixins';
import {SectionContainer } from '../stylesheets/components';
import moment from 'moment';
import _ from 'lodash';

const InterestingPOIsContainer = styled(SectionContainer)`
  margin: 100px 0;
`;

const POIBox = styled.div`
  position: absolute;
  left: 50%;
  ${mixins.ABSOLUTE_CENTER}
  top: 20px;
  ${mixins.BOLD_TYPE}
  font-size:1.2em;
  border: 1px solid #BBB;
  padding: 10px 15px;
  background: white;
  color: black;
  display:flex;
  justify-content: space-between;
  width: 400px;
`;

const TitleArea = styled.div`
  width:200px;
`;

const Label = styled.h4`
  ${mixins.LABEL_BOLD_TYPE}
  font-size:0.65em;
  color:#777;
  margin-bottom: 5px;
`;

const Value = styled.div`
  font-size: 0.9em;
  color: black;
  padding-right: 10px;
`;

const Date = styled.div `
  ${mixins.LABEL_REGULAR_TYPE}
  font-size:0.6em;
  color: #AAA;
`;

const Disclaimer = styled.div `
  ${mixins.LABEL_ITALIC_TYPE}
  font-size:0.5em;
  color: #AAA;
`;

class InterestingPOIs extends Component {


  render() {
    let name = _.isUndefined(this.props.name_en) ? this.props.name : this.props.name_en;
    
    return (
      <InterestingPOIsContainer className="trigger" data-action-name="changeInterestingPOIs" data-poi-id={this.props.op} style={{ height: this.props.windowHeight}}>
        <POIBox>
          <TitleArea>
            <Label>
              Name
            </Label>
            <Value>
              {name }
            </Value>
          </TitleArea>
          <TitleArea>
            <Label>
              Contributor
            </Label>
            <Value>
              {this.props.osm_user.anonymized_name}*
            </Value>
            <Date>
              {moment.unix(this.props.osm_timestamp).format("MMMM DD, YYYY")}
            </Date>
            <Disclaimer>
              * Names have been changed for privacy
            </Disclaimer>
          </TitleArea>
        </POIBox>
      </InterestingPOIsContainer>
    )
  }
}

let mapStateToProps = state => {
    return state;
};

export default connect(mapStateToProps)(InterestingPOIs);