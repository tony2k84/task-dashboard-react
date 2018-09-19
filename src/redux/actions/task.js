// report related actions
import axios from 'axios';
const ADD_TASK_URL = 'http://localhost:9001/v1/task/add';

var _addTask = (token, projectId, type, group, description, nextRun, owner) => {
    return axios.post(ADD_TASK_URL,
        { projectId, type, group, description, nextRun, owner },
        { headers: { 'Authorization': token } });
}



//action creators
export const addTask = (token, projectId, type, group, description, nextRun, owner) => {
    return dispatch => dispatch({
        type: 'ADD_TASK',
        payload: _addTask(token, projectId, type, group, description, nextRun, owner)
    });
}
