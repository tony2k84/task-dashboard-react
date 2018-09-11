import { combineReducers } from 'redux';
import {
	GET_OVERDUE_TASKS_PENDING,
	GET_OVERDUE_TASKS_FULFILLED,
    GET_OVERDUE_TASKS_REJECTED,
    GET_UPCOMING_TASKS_PENDING,
    GET_UPCOMING_TASKS_FULFILLED,
    GET_UPCOMING_TASKS_REJECTED
} from '../actions/action-types';

const initialMetaState = {
    GET_OVERDUE_TASKS_STATUS: 'DEFAULT',
    GET_UPCOMING_TASKS_STATUS: 'DEFAULT',
}

const initialDataState = {
	overDueTasks: [],
	upcomingTasks: [],
}

function metaReducer(state = initialMetaState, action) {
	// listen to only the action interested for this reducer
	switch (action.type) {
		case GET_OVERDUE_TASKS_PENDING:
			return { ...state, GET_OVERDUE_TASKS_STATUS: 'PENDING' }
		case GET_OVERDUE_TASKS_FULFILLED:
			return { ...state, GET_OVERDUE_TASKS_STATUS: 'SUCCESS' }
		case GET_OVERDUE_TASKS_REJECTED:
            return { ...state, GET_OVERDUE_TASKS_STATUS: 'FAILED' }
        case GET_UPCOMING_TASKS_PENDING:
			return { ...state, GET_UPCOMING_TASKS_STATUS: 'PENDING' }
		case GET_UPCOMING_TASKS_FULFILLED:
			return { ...state, GET_UPCOMING_TASKS_STATUS: 'SUCCESS' }
		case GET_UPCOMING_TASKS_REJECTED:
			return { ...state, GET_UPCOMING_TASKS_STATUS: 'FAILED' }    
		default:
			return {...state};
	}
}

function dataReducer(state = initialDataState, action) {
	switch (action.type) {
		case GET_OVERDUE_TASKS_FULFILLED:
			return { ...state, overDueTasks: action.payload.data }
        case GET_UPCOMING_TASKS_FULFILLED:
				return { ...state, upcomingTasks: action.payload.data }
		default:
			return {...state};
	}
}

export default combineReducers({
	meta: metaReducer,
	data: dataReducer
});
