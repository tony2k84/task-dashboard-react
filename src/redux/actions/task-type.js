import axios from 'axios';
const HOST_NAME = process.env.REACT_APP_API_URI;
const TASK_TYPE_URL = `${HOST_NAME}/task-type`;

var _getTaskTypes = (token) => {
    return axios.get(TASK_TYPE_URL, {headers: {'Authorization': token}});
}

var _addTaskType = (token, type) => {
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