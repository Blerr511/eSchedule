import slices from '../slices';
import {reducer as lecturerSchedule} from 'containers/LecturerSchedule/store';
import {combineReducers} from 'redux';
import firebase from './firebase.reducer';

const reducers = combineReducers({
	auth: slices.auth.reducer,
	lecturerSchedule,
	firebase
});

export default reducers;
