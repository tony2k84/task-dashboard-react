import axios from 'axios';
const LOGIN_URL = 'http://localhost:9001/v1/user/login';

var login = (email, password) => {
    return axios.post(LOGIN_URL, {email, password});
}

//action creators
export const doLogin = (email, password) => {
    return dispatch => dispatch({
        type: 'LOGIN',
        payload: login(email, password)
    });
}