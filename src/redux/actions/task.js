// report related actions
import axios from 'axios';
const HOST_NAME = process.env.REACT_APP_API_URI;
const ADD_TASK_URL = `${HOST_NAME}/task/add`;
const COMPLETE_TASK_URL = `${HOST_NAME}/task/complete`;

var _addTask = (token, projectId, type, group, description, nextRun, owner) => {
    return axios.post(ADD_TASK_URL,
        { projectId, type, group, description, nextRun, owner },
        { headers: { 'Authorization': token } });
}

var _completeTask = (token, projectId, taskId, lastRun, nextRun) => {
    return axios.post(COMPLETE_TASK_URL,
        { projectId, taskId, lastRun, nextRun },
        { headers: { 'Authorization': token } });
}

//action creators
export const addTask = (token, projectId, type, group, description, nextRun, owner) => {
    return dispatch => dispatch({
        type: 'ADD_TASK',
        payload: _addTask(token, projectId, type, group, description, nextRun, owner)
    });
}

export const completeTask = (token, projectId, taskId, lastRun, nextRun) => {
    return dispatch => dispatch({
        type: 'COMPLETE_TASK',
        payload: _completeTask(token, projectId, taskId, lastRun, nextRun)
    });
}
