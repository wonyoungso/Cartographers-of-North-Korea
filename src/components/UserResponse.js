import React, { Component } from 'react'
import _ from 'lodash';
export default class UserResponse extends Component {
  render() {
    
    return (
      <div>
        {
          _.map(this.props.responses, response => {
            return (
              <span key={response.id}>
                { response.resp }
              </span> 
            );
          })
        }
        <div>
          { this.props.osm_user }
        </div>
      </div>
    )
  }
}
