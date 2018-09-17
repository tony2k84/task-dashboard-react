import axios from 'axios';
const TASK_TYPE_URL = 'http://localhost:9001/v1/task-type';

var _getTaskTypes = (token) => {
    return axios.get(TASK_TYPE_URL, {headers: {'Authorization': token}});
}

var _addTaskType = (token, type) => {
    console.log(token, type);
    return axios.post(TASK_TYPE_URL, {type}, {headers: {'Authorization': token}});
}

//action creators
export const addTaskType = (token, type) => {
    return dispatch => dispatch({
        type: 'ADD_TASK_TYPE',
        payload: _addTaskType(token, type)
    });
}

export const getTaskTypes = (token) => {
    return dispatch => dispatch({
        type: 'GET_TASK_TYPES',
        payload: _getTaskTypes(token)
    });
}