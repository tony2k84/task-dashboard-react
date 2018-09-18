import axios from 'axios';
const LOGIN_URL = 'http://localhost:9001/v1/user/login';
const REGISTER_URL = 'http://localhost:9001/v1/user/register';

var _login = (email, password) => {
    return axios.post(LOGIN_URL, {email, password});
}

var _register = (name, email, password) => {
    return axios.post(REGISTER_URL, {name, email, password});
}

//action creators
export const login = (email, password) => {
    return dispatch => dispatch({
        type: 'LOGIN',
        payload: _login(email, password)
    });
}

export const register = (name, email, password) => {
    return dispatch => dispatch({
        type: 'REGISTER',
        payload: _register(name, email, password)
    });
}