import React, { Component } from 'react';
import { windowResize } from './actions';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Home from './pages/Home';

import MapProgress from './pages/MapProgress';
import Pois from './pages/Pois';
import Interviews from './pages/Interviews';

const Fragment = React.Fragment;

class App extends Component {
  componentWillMount(){

  }

  componentDidMount(){

    window.addEventListener('resize', this.resizeHandler.bind(this));
    this.resizeHandler();
  }




  resizeHandler(e){
    this.props.dispatch(windowResize({
      width: window.innerWidth,
      height: window.innerHeight
    }));
    
  }


  render() {

    return (
      <BrowserRouter>
        <Fragment>
          <Route exact path={process.env.PUBLIC_URL + '/'} component={Home} />
          <Route exact path={process.env.PUBLIC_URL + '/map-progress'} component={MapProgress} />
          <Route exact path={process.env.PUBLIC_URL + '/pois'} component={Pois} />
          <Route exact path={process.env.PUBLIC_URL + '/interviews'} component={Interviews} />
        </Fragment>
      </BrowserRouter>
    );
  }
}

let mapStateToProps = state => {
  return {
    width: state.windowWidth,
    height: state.windowHeight
  }
};

export default connect(mapStateToProps)(App);