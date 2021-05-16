import * as auth from './auth';
import {actions as lecturerSchedule} from 'containers/LecturerSchedule/store';
import * as firebase from './firebase';

const actions = {
	auth,
	lecturerSchedule,
	firebase
};

export default actions;
