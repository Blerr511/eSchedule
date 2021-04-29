import {createSelector} from 'reselect';
import {RootState} from 'store/store';

export const lecturerSchedule = (state: RootState) => state.lecturerSchedule;

export const addSchedule = createSelector(lecturerSchedule, state => state.addSchedule);
