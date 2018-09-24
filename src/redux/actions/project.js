import axios from 'axios';
const HOST_NAME = process.env.REACT_APP_API_URI;
const PROJECT_URL = `${HOST_NAME}/project`;
const PROJECT_MEMBER_URL = `${HOST_NAME}/project/add-member`;
const GET_TASK_URL = `${HOST_NAME}/task`;

var _getProjects = (token) => {
    return axios.get(PROJECT_URL, { headers: { 'Authorization': token } });
}

var _addProject = (token, name) => {
    return axios.post(PROJECT_URL, { name }, { headers: { 'Authorization': token } });
}

var _addMember = (token, projectId, projectName, email) => {
    return axios.post(PROJECT_MEMBER_URL, { projectId, projectName, email }, { headers: { 'Authorization': token } });
}

var _selectProject = (projectId, name) => {
    return new Promise((resolve, reject) => {
        resolve({ data: { projectId, name } });
    })
}

var _getProjectTasks = (token, projectId) => {
    return axios.post(GET_TASK_URL, { projectId }, { headers: { 'Authorization': token } });
}

//action creators
export const addProject = (token, name) => {
    return dispatch => dispatch({
        type: 'ADD_PROJECT',
        payload: _addProject(token, name)
    });
}

export const getProjects = (token) => {
    return dispatch => dispatch({
        type: 'GET_PROJECTS',
        payload: _getProjects(token)
    });
}

export const addMember = (token, projectId, name, email) => {
    return dispatch => dispatch({
        type: 'ADD_PROJECT_MEMBER',
        payload: _addMember(token, projectId, name, email)
    });
}

export const selectProject = (projectId, name) => {
    return dispatch => dispatch({
        type: 'SELECT_PROJECT',
        payload: _selectProject(projectId, name)
    });
}

export const getProjectTasks = (token, projectId) => {
    return dispatch => dispatch({
        type: 'GET_PROJECT_TASKS',
        payload: _getProjectTasks(token, projectId)
    });
}