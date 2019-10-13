import React, { Component } from 'react';
import { windowResize } from './actions';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/Home';
// import SummaryPage from './pages/SummaryPage';

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
          <Route path={process.env.PUBLIC_URL + '/'} component={Home} />
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