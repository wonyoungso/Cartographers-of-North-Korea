import React, { Component } from 'react';
import { windowResize, changeDataLoaded, changeTrips, changeCurrentTime } from './actions';
import { connect } from 'react-redux';
import axios from 'axios';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
// import SummaryPage from './pages/SummaryPage';
import LandingPage from './pages/LandingPage';

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
          <Route path={process.env.PUBLIC_URL + '/'} component={LandingPage} />
          <Route path={process.env.PUBLIC_URL + '/viz'} component={Home} />
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