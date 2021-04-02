import {createSlice} from '@reduxjs/toolkit';
import {signIn} from './auth.actions';

export interface IUser {
	email: string | null;
	name: string | null;
	uid: string | null;
}

const initialState: {
	user: IUser | null;
	loggedIn: boolean;
	loading: boolean;
	error: string | null | undefined;
} = {
	user: null,
	loggedIn: false,
	loading: false,
	error: null
};

const authSlice = createSlice({
	initialState,
	name: 'auth',
	reducers: {},
	extraReducers: builder => {
		builder.addCase(signIn.pending, state => {
			state.loading = true;
		});
		builder.addCase(signIn.fulfilled, (state, action) => {
			state.loading = false;
			state.user = action.payload.user;
			state.loggedIn = true;
		});
		builder.addCase(signIn.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		});
	}
});

export const {caseReducers, name, reducer, actions} = authSlice;

export default authSlice;
