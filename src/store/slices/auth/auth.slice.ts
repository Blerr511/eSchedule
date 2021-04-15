import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {BaseRequestReducer} from 'types';
import {remindPassword, signIn, signUp} from '../../actions/auth';

export interface IUser {
	email: string | null;
	name: string | null;
	uid: string | null;
}

export interface RemindPasswordInitialStat
	extends BaseRequestReducer<Partial<Record<'email' | 'password' | 'confirmPassword', string | null>>> {
	showModal: boolean;
}

export interface SignUpInitialState
	extends BaseRequestReducer<Partial<Record<'email' | 'password' | 'confirmPassword', string | null>>> {
	showModal: boolean;
	modalText: string | null;
	modalTitle: string | null;
}

export interface SignInInitialState
	extends BaseRequestReducer<Partial<Record<'email' | 'password', string | null>>> {
	loggedIn: boolean;
	user: IUser | null;
	showModal: boolean;
}

export interface AuthInitialState {
	signIn: SignInInitialState;
	signUp: SignUpInitialState;
	remindPassword: RemindPasswordInitialStat;
}

const initialState: AuthInitialState = {
	signIn: {
		user: null,
		loggedIn: false,
		loading: false,
		error: null,
		meta: {},
		message: null,
		showModal: false
	},
	signUp: {
		loading: false,
		message: null,
		error: null,
		meta: {},
		showModal: false,
		modalText: null,
		modalTitle: null
	},
	remindPassword: {
		loading: false,
		error: null,
		message: null,
		showModal: false,
		meta: {}
	}
};

const authSlice = createSlice({
	initialState,
	name: 'auth',
	reducers: {
		clearSignInErrors: state => {
			state.signIn.error = null;
			state.signIn.message = null;
			state.signIn.meta = {};
		},
		clearSignUpErrors: state => {
			state.signUp.error = null;
			state.signUp.message = null;
			state.signUp.meta = {};
		},
		hideSignInModal: state => {
			state.signIn.showModal = false;
		},
		toggleSignUpModal: (state, action: PayloadAction<boolean | undefined>) => {
			if (action.payload === undefined) state.signUp.showModal = !state.signUp.showModal;
			else state.signUp.showModal = action.payload;
		},
		clearSignUpModal: state => {
			state.signUp.modalText = null;
			state.signUp.modalTitle = null;
		},
		hideRemindModal: state => {
			state.remindPassword.showModal = false;
		},
		clearRemindModalData: state => {
			state.remindPassword.error = null;
			state.remindPassword.message = null;
		}
	},
	extraReducers: builder => {
		builder.addCase(signIn.pending, state => {
			state.signIn.loading = true;
			state.signIn.error = null;
			state.signIn.meta = {};
		});

		builder.addCase(signIn.fulfilled, (state, action) => {
			state.signIn.loading = false;
			state.signIn.user = action.payload.user;
			state.signIn.loggedIn = true;
		});

		builder.addCase(signIn.rejected, (state, action) => {
			state.signIn.loading = false;
			if (action.payload) {
				switch (action.payload.code) {
					case 'invalid-email':
						state.signIn.meta.email = action.payload.message;
						break;
					case 'wrong-password':
						state.signIn.meta.password = action.payload.message;
						break;
					default: {
						state.signIn.error = action.payload.message;
						state.signIn.showModal = true;
					}
				}
			}
		});

		builder.addCase(signUp.pending, state => {
			state.signUp.loading = true;
			state.signUp.error = null;
			state.signUp.meta = {};
		});

		builder.addCase(signUp.fulfilled, (state, action) => {
			console.log(action);
			state.signUp.showModal = true;
			state.signUp.modalTitle = `Your activation link has been sent to \n${action.payload.email}`;
			state.signUp.modalText = 'Please check your email address';
			state.signUp.loading = false;
		});

		builder.addCase(signUp.rejected, (state, action) => {
			console.log(action);

			state.signUp.loading = false;
			if (action.payload) {
				switch (action.payload.code) {
					case 'invalid-email':
						state.signUp.meta.email = action.payload.message;
						break;
					case 'weak-password':
					case 'wrong-password':
						state.signUp.meta.password = action.payload.message;
						break;
					case 'wrong-confirm-password':
						state.signUp.meta.confirmPassword = action.payload.message;
						break;
					default:
						state.signUp.error = action.payload.message;
				}
			}
		});

		builder.addCase(remindPassword.pending, state => {
			state.remindPassword.loading = true;
			state.remindPassword.error = null;
			state.remindPassword.message = null;
		});

		builder.addCase(remindPassword.fulfilled, (state, action) => {
			state.remindPassword.loading = false;
			state.remindPassword.message = action.payload.email;
			state.remindPassword.showModal = true;
		});

		builder.addCase(remindPassword.rejected, (state, action) => {
			state.remindPassword.loading = false;
			if (action.payload?.message) {
				state.remindPassword.error = action.payload.message;
				state.remindPassword.showModal = true;
			}
		});
	}
});

export const {caseReducers, name, reducer, actions} = authSlice;

export default authSlice;
