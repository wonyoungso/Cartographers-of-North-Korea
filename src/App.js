import React, { Component } from 'react';
import { windowResize, changeDataLoaded, changeTrips, changeCurrentTime } from './actions';
import { connect } from 'react-redux';
import axios from 'axios';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import SummaryPage from './pages/SummaryPage';

const Fragment = React.Fragment;

class App extends Component {
  componentWillMount(){

    window.addEventListener('resize', this.resizeHandler.bind(this));
    this.resizeHandler();
  }

  componentDidMount(){

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
          <Route exact path="/" component={Home} />
          <Route exact path="/summary" component={SummaryPage} />
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