import { combineReducers } from 'redux';
import {
	GET_PROJECT_TASKS_PENDING,
	GET_PROJECT_TASKS_FULFILLED,
	GET_PROJECT_TASKS_REJECTED
} from '../actions/action-types';

import countBy from 'lodash/countBy';
import toPairs from 'lodash/toPairs';

import { PURGE } from 'redux-persist';

const initialMetaState = {
	GET_TASKS_STATUS: 'DEFAULT',
}

const initialDataState = {
	overDueTasks: [],
	upcomingTasks: [],
	totalTasksCount: 0,
	overDueTasksCount: 0,
	upcomingTasksCount: 0,
	tasksByTaskType: {},
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
			const tasks = action.payload.data.tasks;
			const totalTasksCount = tasks.length;
			const overDueTasks = tasks.filter(item => item.nextRun < Date.now());
			const upcomingTasks = tasks.filter(item => item.nextRun > Date.now());
			const overDueTasksCount = overDueTasks.length;
			const upcomingTasksCount = upcomingTasks.length;
			const byTaskTypes = countBy(tasks, 'type');
			return { ...state, 
					overDueTasks,
					upcomingTasks,
					totalTasksCount,
					overDueTasksCount,
					upcomingTasksCount,
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
