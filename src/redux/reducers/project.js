import { combineReducers } from 'redux';
import {
	GET_PROJECTS_PENDING,
	GET_PROJECTS_FULFILLED,
	GET_PROJECTS_REJECTED,
	ADD_PROJECT_PENDING,
	ADD_PROJECT_FULFILLED,
	ADD_PROJECT_REJECTED,
	ADD_PROJECT_MEMBER_PENDING,
	ADD_PROJECT_MEMBER_FULFILLED,
	ADD_PROJECT_MEMBER_REJECTED,
	SELECT_PROJECT_FULFILLED,
} from '../actions/action-types';

import { PURGE } from 'redux-persist';

const initialMetaState = {
	GET_PROJECTS_STATUS: 'DEFAULT',
	ADD_PROJECT_STATUS: 'DEFUALT',
	ADD_PROJECT_MEMBER_STATUS: 'DEFAULT',
}

const initialDataState = {
	selectedProject: {},
	projects: []
}

function metaReducer(state = initialMetaState, action) {
	// listen to only the action interested for this reducer
	switch (action.type) {
		case GET_PROJECTS_PENDING:
			return { ...state, GET_PROJECTS_STATUS: 'PENDING' }
		case GET_PROJECTS_FULFILLED:
			return { ...state, GET_PROJECTS_STATUS: 'SUCCESS' }
		case GET_PROJECTS_REJECTED:
			return { ...state, GET_PROJECTS_STATUS: 'FAILED' }
		case ADD_PROJECT_PENDING:
			return { ...state, ADD_PROJECT_STATUS: 'PENDING' }
		case ADD_PROJECT_FULFILLED:
			return { ...state, ADD_PROJECT_STATUS: 'SUCCESS' }
		case ADD_PROJECT_REJECTED:
			return { ...state, ADD_PROJECT_STATUS: 'FAILED' }
		case ADD_PROJECT_MEMBER_PENDING:
			return { ...state, ADD_PROJECT_MEMBER_STATUS: 'PENDING' }
		case ADD_PROJECT_MEMBER_FULFILLED:
			return { ...state, ADD_PROJECT_MEMBER_STATUS: 'SUCCESS' }
		case ADD_PROJECT_MEMBER_REJECTED:
			return { ...state, ADD_PROJECT_MEMBER_STATUS: 'FAILED' }
		case PURGE:
			return initialMetaState;
		default:
			return state;
	}
}

function dataReducer(state = initialDataState, action) {
	switch (action.type) {
		case GET_PROJECTS_FULFILLED:
			return { ...state, projects: action.payload.data.projects }
		case SELECT_PROJECT_FULFILLED:
			return { ...state, selectedProject: action.payload.data }
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

