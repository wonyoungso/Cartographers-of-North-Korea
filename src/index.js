import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import AppState from './reducers';
import "./stylesheets/style.scss";

render(
  <Provider store={AppState}>
    <App />
  </Provider>,
  document.getElementById('root')
);