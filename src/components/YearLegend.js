import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import * as d3 from 'd3';
import _ from 'lodash';

class YearLegend extends Component {

  render() {
    let { legend } = this.props;
    let domain = [1184972887, 
              1346511620, 
              1360958163, 
              1378200802, 
              1395305792, 
              1438380051, 
              1479834657, 
              1502367226, 
              1510168743, 
              1516131630]
    let yearScale = d3.scaleLinear()
      .domain(domain)
      .range(["#ffffcc",
                "#d6efc2",
                "#acdeb7",
                "#81ceba",
                "#56bec1",
                "#3caac2",
                "#3391bc",
                "#2b77b4",
                "#2855a4",
                "#253494"]);

    return (
      <div className="year-legend" style={{ opacity: legend ? 1 : 0 }}>
        <div className="title">
          Date of Contribution
        </div>
        {
          _.map(domain, (val, i) => {
            if (_.isUndefined(val)) {
              return null;
            } else {
              return (
                <div key={i} className="legend-sub-area">
                  <div className="color-box" style={{ backgroundColor: yearScale(val) }}>
                  </div>
                  <div className="value">
                    { moment.unix(val).format("YYYY MMM") }
                    {
                      !(i + 1 > domain.length - 1) ? 
                      `-${moment.unix(domain[i + 1]).format("YYYY MMM")}` :
                      "-"
                    }
                  </div>
                </div>
              ); 
            }

            
          })
        }
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    legend: state.legend
  }
}


export default connect(mapStateToProps)(YearLegend);
