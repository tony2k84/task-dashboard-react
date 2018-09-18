import { combineReducers } from 'redux';
import {
	GET_PROJECT_TASKS_PENDING,
	GET_PROJECT_TASKS_FULFILLED,
	GET_PROJECT_TASKS_REJECTED
} from '../actions/action-types';

import { PURGE } from 'redux-persist';

const initialMetaState = {
	GET_TASKS_STATUS: 'DEFAULT',
}

const initialDataState = {
	tasks: [],
}

function metaReducer(state = initialMetaState, action) {
	// listen to only the action interested for this reducer
	switch (action.type) {
		case GET_PROJECT_TASKS_PENDING:
			return { ...state, GET_TASKS_STATUS: 'PENDING' }
		case GET_PROJECT_TASKS_FULFILLED:
			return { ...state, GET_TASKS_STATUS: 'SUCCESS' }
		case GET_PROJECT_TASKS_REJECTED:
			return { ...state, GET_TASKS_STATUS: 'FAILED' }
		case PURGE:
			return initialMetaState;
		default:
			return state;
	}
}

function dataReducer(state = initialDataState, action) {
	switch (action.type) {
		case GET_PROJECT_TASKS_FULFILLED:
			return { ...state, tasks: action.payload.data.tasks }
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
