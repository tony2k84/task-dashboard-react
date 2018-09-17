// report related actions
import axios from 'axios';
const ADD_TASK_URL = 'http://localhost:9001/v1/task';

var getOverDueTasks = (sessionId, projectId) => {
    //return axios.get(GET_REPORTS_API_URL(sessionId)); 
    return new Promise((resolve, reject) => {
        // call api and either return resolve o/**/r reject
        resolve({
            data: [
                {
                    type: 'SSL Renewal',
                    application: 'SMART',
                    owner: 'John Doe',
                    due: 1533500575032,
                },
                {
                    type: 'SSL Renewal',
                    application: 'SMART',
                    owner: 'John Doe',
                    due: 1536548804107,
                }
            ]
        });
    })

}

var getUpcomingTasks = (sessionId, projectId) => {
    //return axios.get(GET_REPORTS_API_URL(sessionId)); 
    return new Promise((resolve, reject) => {
        // call api and either return resolve o/**/r reject
        resolve({
            data: [
                {
                    type: 'SSL Renewal',
                    application: 'SMART',
                    owner: 'John Doe',
                    due: 1538500575032,
                    last: 1536500575032
                }
            ]
        });
    })

}

var _addTask = (token, projectId, type, group, nextRun, owner) => {
    return axios.post(ADD_TASK_URL,
        { projectId, type, group, nextRun, owner },
        { headers: { 'Authorization': token } });
}

//action creators
export const addTask = (token, projectId, type, group, nextRun, owner) => {
    return dispatch => dispatch({
        type: 'ADD_TASK',
        payload: _addTask(token, projectId, type, group, nextRun, owner)
    });
}

export const doGetOverDueTasks = (sessionId, projectId) => {
    return dispatch => dispatch({
        type: 'GET_OVERDUE_TASKS',
        payload: getOverDueTasks(sessionId, projectId)
    });
}

export const doGetUpcomingTasks = (sessionId, projectId) => {
    return dispatch => dispatch({
        type: 'GET_UPCOMING_TASKS',
        payload: getUpcomingTasks(sessionId, projectId)
    });
}
