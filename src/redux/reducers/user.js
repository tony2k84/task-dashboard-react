import { combineReducers } from 'redux';
import {
	LOGIN_PENDING,
	LOGIN_FULFILLED,
	LOGIN_REJECTED,
	LOGOUT_PENDING,
	LOGOUT_FULFILLED,
	LOGOUT_REJECTED,
	REGISTER_PENDING,
	REGISTER_FULFILLED,
	REGISTER_REJECTED,
} from '../actions/action-types';

import {PURGE} from 'redux-persist';

const initialMetaState = {
	LOGIN_STATUS: 'DEFAULT',
	LOGOUT_STATUS: 'DEFAULT',
	REGISTER_STATUS: 'DEFAULT',
}

const initialDataState = {
	token: '',
	userDetails: {
		name: '',
		members: [],
	}
}

function metaReducer(state = initialMetaState, action) {
	// listen to only the action interested for this reducer
	switch (action.type) {
		case LOGIN_PENDING:
			return { ...state, LOGIN_STATUS: 'PENDING' }
		case LOGIN_FULFILLED:
			return { ...state, LOGIN_STATUS: 'SUCCESS' }
		case LOGIN_REJECTED:
			return { ...state, LOGIN_STATUS: 'FAILED' }
		case LOGOUT_PENDING:
			return { ...state, LOGOUT_STATUS: 'PENDING' }
		case LOGOUT_FULFILLED:
			return { ...state, LOGOUT_STATUS: 'SUCCESS' }
		case LOGOUT_REJECTED:
			return { ...state, LOGOUT_STATUS: 'FAILED' }	
		case REGISTER_PENDING:
			return { ...state, REGISTER_STATUS: 'PENDING' }
		case REGISTER_FULFILLED:
			return { ...state, REGISTER_STATUS: 'SUCCESS' }
		case REGISTER_REJECTED:
			return { ...state, REGISTER_STATUS: 'FAILED' }
		case PURGE:
			return initialMetaState;
		default:
			return state;
	}
}

function dataReducer(state = initialDataState, action) {
	switch (action.type) {
		case LOGIN_FULFILLED:
			return { ...state, token: action.payload.data.token, userDetails: action.payload.data.user }
		case PURGE:
			return initialDataState;
		default:
			return state;
	}
}

export default combineReducers({
	meta: metaReducer,
	data: dataReducer
});
