import { combineReducers } from 'redux';
import {
	GET_PROJECT_TASKS_PENDING,
	GET_PROJECT_TASKS_FULFILLED,
	GET_PROJECT_TASKS_REJECTED,
	ADD_TASK_PENDING,
	ADD_TASK_FULFILLED,
	ADD_TASK_REJECTED,
	COMPLETE_TASK_PENDING,
	COMPLETE_TASK_FULFILLED,
	COMPLETE_TASK_REJECTED,
} from '../actions/action-types';

import countBy from 'lodash/countBy';
import toPairs from 'lodash/toPairs';
import sortBy from 'lodash/sortBy';

import { PURGE } from 'redux-persist';

const initialMetaState = {
	GET_TASKS_STATUS: 'DEFAULT',
	ADD_TASK_STATUS: 'DEFAULT',
	COMPLETE_TASK_STATUS: 'DEFAULT',
}

const initialDataState = {
	tasks: [],
	taskCount: 0,
	taskDueCount: 0,
	tasksByTaskType: [],
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
		case ADD_TASK_PENDING:
			return { ...state, ADD_TASK_STATUS: 'PENDING' }
		case ADD_TASK_FULFILLED:
			return { ...state, ADD_TASK_STATUS: 'SUCCESS' }
		case ADD_TASK_REJECTED:
			return { ...state, ADD_TASK_STATUS: 'FAILED' }
		case COMPLETE_TASK_PENDING:
			return { ...state, COMPLETE_TASK_STATUS: 'PENDING' }
		case COMPLETE_TASK_FULFILLED:
			return { ...state, COMPLETE_TASK_STATUS: 'SUCCESS' }
		case COMPLETE_TASK_REJECTED:
			return { ...state, COMPLETE_TASK_STATUS: 'FAILED' }
		case PURGE:
			return initialMetaState;
		default:
			return state;
	}
}

function dataReducer(state = initialDataState, action) {
	switch (action.type) {
		case GET_PROJECT_TASKS_FULFILLED:
			const tasks = sortBy(action.payload.data.tasks, 'nextRun');
			const taskCount = tasks.length;
			const byTaskTypes = countBy(tasks, 'type');
			return {
				...state,
				taskCount,
				taskDueCount: tasks.filter(item => item.nextRun < Date.now()).length,
				tasks,
				tasksByTaskType: toPairs(byTaskTypes),
			}
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
