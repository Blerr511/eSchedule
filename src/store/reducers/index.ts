import slices from '../slices';
import {reducer as lecturerSchedule} from 'containers/LecturerSchedule/store';
import {combineReducers} from 'redux';

const reducers = combineReducers({
	auth: slices.auth.reducer,
	lecturerSchedule
});

export default reducers;
