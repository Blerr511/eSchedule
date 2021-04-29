import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface LecturerScheduleState {
	scheduleList: {
		error: null | string;
		message: null | string;
		loading: boolean;
		data: null | [];
	};
	addSchedule: {
		showDialog: boolean;
	};
}

const initialState: LecturerScheduleState = {
	addSchedule: {showDialog: false},
	scheduleList: {data: null, error: null, loading: false, message: null}
};

const lecturerScheduleSlice = createSlice({
	name: '@@LECTURERS_SCHEDULE',
	initialState,
	reducers: {
		toggleAddDialog: (state, action: PayloadAction<boolean>) => {
			state.addSchedule.showDialog = action.payload;
		}
	}
});

export default lecturerScheduleSlice;

export const {reducer, actions} = lecturerScheduleSlice;
