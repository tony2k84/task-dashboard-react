import axios from 'axios';
const PROJECT_URL = 'http://localhost:9001/v1/project';
const PROJECT_MEMBER_URL = 'http://localhost:9001/v1/project/add-member';


var _getProjects = (token) => {
    return axios.get(PROJECT_URL, {headers: {'Authorization': token}});
}

var _addProject = (token, name) => {
    return axios.post(PROJECT_URL, {name}, {headers: {'Authorization': token}});
}

var _addMember = (token, projectId, projectName, email) => {
    return axios.post(PROJECT_MEMBER_URL, {projectId, projectName, email}, {headers: {'Authorization': token}});
}

var _selectProject = (token, projectId, projectName) => {
    return new Promise((resolve, reject) => {
        // call api and either return resolve o/**/r reject
        resolve({data: {projectId, projectName}});
    })
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

export const addMember = (token, projectId, projectName, email) => {
    return dispatch => dispatch({
        type: 'ADD_PROJECT_MEMBER',
        payload: _addMember(token, projectId, projectName, email)
    });
}

export const selectProject = (token, projectId, projectName) => {
    return dispatch => {
        // select the project
        dispatch({
            type: 'SELECT_PROJECT',
            payload: _selectProject(token, projectId, projectName)
        });
        // get tasks for the project
        dispatch({
            type: 'GET_PROJECT_TASKS',
        });
    }
}