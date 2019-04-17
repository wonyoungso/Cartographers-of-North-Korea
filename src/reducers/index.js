import { createStore, combineReducers } from 'redux';
import mainReducer from './main';

export default createStore(mainReducer);
