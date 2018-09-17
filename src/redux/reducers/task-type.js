import { combineReducers } from 'redux';
import {
    GET_TASK_TYPES_PENDING,
    GET_TASK_TYPES_FULFILLED,
    GET_TASK_TYPES_REJECTED,
    ADD_TASK_TYPE_PENDING,
    ADD_TASK_TYPE_FULFILLED,
    ADD_TASK_TYPE_REJECTED,
} from '../actions/action-types';

const initialMetaState = {
    GET_TASK_TYPE_STATUS: 'DEFAULT',
    ADD_TASK_TYPE_STATUS: 'DEFUALT'
}

const initialDataState = {
	taskTypes: []
}

function metaReducer(state = initialMetaState, action) {
	// listen to only the action interested for this reducer
	switch (action.type) {
		case GET_TASK_TYPES_PENDING:
			return { ...state, GET_TASK_TYPE_STATUS: 'PENDING' }
		case GET_TASK_TYPES_FULFILLED:
			return { ...state, GET_TASK_TYPE_STATUS: 'SUCCESS' }
		case GET_TASK_TYPES_REJECTED:
            return { ...state, GET_TASK_TYPE_STATUS: 'FAILED' }
        case ADD_TASK_TYPE_PENDING:
			return { ...state, ADD_TASK_TYPE_STATUS: 'PENDING' }
		case ADD_TASK_TYPE_FULFILLED:
			return { ...state, ADD_TASK_TYPE_STATUS: 'SUCCESS' }
		case ADD_TASK_TYPE_REJECTED:
            return { ...state, ADD_TASK_TYPE_STATUS: 'FAILED' }   
        default:
			return state;
	}
}

function dataReducer(state = initialDataState, action) {
	switch (action.type) {
		case GET_TASK_TYPES_FULFILLED:
            return { ...state, taskTypes: action.payload.data.taskTypes }
        default:
			return state;
	}
}

export default combineReducers({
	meta: metaReducer,
	data: dataReducer
});
