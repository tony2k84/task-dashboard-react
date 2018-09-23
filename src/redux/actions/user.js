import axios from 'axios';
import {persistor} from '../store';

const HOST_NAME = process.env.REACT_APP_API_URI;
const LOGIN_URL = `${HOST_NAME}/user/login`;
const REGISTER_URL = `${HOST_NAME}/user/register`;
const LOGOUT_URL = `${HOST_NAME}/user/logout`;

var _login = (email, password) => {
    return axios.post(LOGIN_URL, { email, password });
}

var _logout = (token) => {
    persistor.purge();
    return axios.post(LOGOUT_URL, {}, { headers: { 'Authorization': token } });
}

var _register = (name, email, password) => {
    return axios.post(REGISTER_URL, { name, email, password });
}

//action creators
export const login = (email, password) => {
    return dispatch => dispatch({
        type: 'LOGIN',
        payload: _login(email, password)
    });
}
export const logout = (token) => {

    return dispatch => {
        dispatch({
            type: 'LOGOUT',
            payload: _logout(token)
        });       
    };

}

export const register = (name, email, password) => {
    return dispatch => dispatch({
        type: 'REGISTER',
        payload: _register(name, email, password)
    });
}