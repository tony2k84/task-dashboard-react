import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import task from './task';
import user from './user';
import tasktype from './task-type';
import project from './project';

export default combineReducers({
  router: routerReducer,
  user: user,
  task: task,
  taskType: tasktype,
  project: project
});



