import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeMapLoaded, changeCurrentSeq } from '../actions';
import { LayerGenerator } from './';
import { dispatchToGlobal, numberWithDelimiter, randomBetween } from '../utils';
import * as d3 from 'd3';
import country_analysis_all from '../constants/country_analysis_all.json';
import country_analysis_top_20 from '../constants/country_analysis_top_20.json';
import country_analysis_top_5 from '../constants/country_analysis_top_5.json';
import _ from 'lodash';

const Fragment = React.Fragment;
class CholoplethLegend extends Component {
  constructor(props) {
    super(props);
    this.colorScale = d3.scaleLinear()
      .range(["#ffffcc",
        "#d6efc2",
        "#acdeb7",
        "#81ceba",
        "#56bec1",
        "#3caac2",
        "#3391bc",
        "#2b77b4",
        "#2855a4",
        "#253494"])

  }

  componentDidMount() {
  }
  updateCurrentCholopleth(cholopleth, choloplethMode, currentIndividual) {

    let currentCountryJSON = null;

    if (!_.isNull(currentIndividual)) {

      currentCountryJSON = currentIndividual;

    } else if (choloplethMode == "all") {

      currentCountryJSON = {
        country_counts: country_analysis_all
      };

    } else if (choloplethMode == "top20") {

      currentCountryJSON = {
        country_counts: country_analysis_top_20
      };

    } else { // top5

      currentCountryJSON = {
        country_counts: country_analysis_top_5
      };

    }

    if (!_.isNull(currentCountryJSON) && cholopleth) {
      let width = 300;

      var extent = [0, d3.max(currentCountryJSON.country_counts, cc => {
        return cc.count;
      })]

      var finalDomain = [extent[0],
      extent[0] + (extent[1] - extent[0]) / 9 * 1,
      extent[0] + (extent[1] - extent[0]) / 9 * 2,
      extent[0] + (extent[1] - extent[0]) / 9 * 3,
      extent[0] + (extent[1] - extent[0]) / 9 * 4,
      extent[0] + (extent[1] - extent[0]) / 9 * 5,
      extent[0] + (extent[1] - extent[0]) / 9 * 6,
      extent[0] + (extent[1] - extent[0]) / 9 * 7,
      extent[0] + (extent[1] - extent[0]) / 9 * 8,
      extent[0] + (extent[1] - extent[0]) / 9 * 9];
      return {
        opacity: 1,
        finalDomain: finalDomain
      }
    } else {
      return {
        opacity: 0,
        finalDomain: [0, 1]
      }
    }
  }

  render() {
    let { cholopleth, choloplethMode, currentIndividual } = this.props;
    console.log("cholopleth", cholopleth, "choroplethMode", choloplethMode, "currentIndividual", currentIndividual);
    let result = this.updateCurrentCholopleth(cholopleth, choloplethMode, currentIndividual);

    this.colorScale.domain(result.finalDomain);

    return (
      <div className="sub-legend" style={{ opacity: result.opacity }}>
        <div className="title">
          # of Contribution
        </div>
        {
          result.opacity == 1 ? 
          _.map(result.finalDomain, (val, i) => {
            if (_.isUndefined(val)) {
              return null;
            } else {
              return (
                <div key={i} className="legend-sub-area">
                  <div className="color-box" style={{ backgroundColor: this.colorScale(val) }}>
                  </div>
                  <div className="value">
                    {numberWithDelimiter(Number(val.toFixed(0)))}
                  </div>
                </div>
              );
            }


          }) : null
        }
      </div>

    );
  }
}

let mapStateToProps = state => {
  return {

    choloplethMode: state.choloplethMode,
    currentIndividual: state.currentIndividual,
    cholopleth: state.cholopleth
    // currentSeq: state.currentSeq,
    // currentFeature: state.currentFeature,
    // currentTimeStamp: state.currentTimeStamp
  }
}

export default connect(mapStateToProps)(CholoplethLegend);