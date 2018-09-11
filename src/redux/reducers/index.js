import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import task from './task';

export default combineReducers({
  router: routerReducer,
  tasks: task
});



