import axios from 'axios';
const HOST_NAME = process.env.REACT_APP_API_URI;
const TASK_TYPE_URL = `${HOST_NAME}/task-type`;

var _getTaskTypes = (token, projectId) => {
    return axios.get(TASK_TYPE_URL, {params: {projectId}, headers: {'Authorization': token}});
}

var _addTaskType = (token, projectId, type) => {
    return axios.post(TASK_TYPE_URL, {projectId, type}, {headers: {'Authorization': token}});
}

//action creators
export const addTaskType = (token, projectId, type) => {
    return dispatch => dispatch({
        type: 'ADD_TASK_TYPE',
        payload: _addTaskType(token, projectId, type)
    });
}

export const getTaskTypes = (token, projectId) => {
    return dispatch => dispatch({
        type: 'GET_TASK_TYPES',
        payload: _getTaskTypes(token, projectId)
    });
}