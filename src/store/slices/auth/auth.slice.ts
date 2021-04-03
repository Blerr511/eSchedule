import {createSlice} from '@reduxjs/toolkit';
import {signIn} from '../../actions/auth';

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
	meta: Partial<Record<'email' | 'password', string>>;
} = {
	user: null,
	loggedIn: false,
	loading: false,
	error: null,
	meta: {}
};

const authSlice = createSlice({
	initialState,
	name: 'auth',
	reducers: {},
	extraReducers: builder => {
		builder.addCase(signIn.pending, state => {
			state.loading = true;
			state.error = null;
			state.meta = {};
		});
		builder.addCase(signIn.fulfilled, (state, action) => {
			state.loading = false;
			state.user = action.payload.user;
			state.loggedIn = true;
		});
		builder.addCase(signIn.rejected, (state, action) => {
			state.loading = false;
			if (action.payload) {
				if (action.payload.code === 'invalid-email') {
					state.meta = {
						email: action.payload.message
					};
				} else if (action.payload.code === 'wrong-password') {
					state.meta = {
						password: action.payload.message
					};
				} else state.error = action.payload.message;
			}
		});
	}
});

export const {caseReducers, name, reducer, actions} = authSlice;

export default authSlice;
