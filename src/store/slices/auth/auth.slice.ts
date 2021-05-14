import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {DBItem} from 'helpers/firebase/RTDatabase/BaseController.abstract';
import {IFaculty} from 'helpers/firebase/RTDatabase/controllers/Faculty';
import {IGroup} from 'helpers/firebase/RTDatabase/controllers/GroupController.ts';
import {BaseRequestReducer} from 'types';
import {remindPassword, signIn, signUp} from '../../actions/auth';

export type IRole = 'student' | 'lecturer' | 'admin';

export interface IStudentSettings {
	facultyId: IFaculty['uid'];
	groupId: IGroup['uid'];
	pushNotifications: boolean;
}

export interface IUser<R extends IRole = IRole> extends DBItem {
	email: string;
	name?: string | null;
	role: R;
	displayName?: string;
	settings?: R extends 'student' ? IStudentSettings : null;
}

export interface RemindPasswordInitialStat
	extends BaseRequestReducer<Partial<Record<'email' | 'password' | 'confirmPassword', string | null>>> {
	showModal: boolean;
}

export interface SignUpInitialState
	extends BaseRequestReducer<Partial<Record<'email' | 'password' | 'confirmPassword', string | null>>> {
	showModal: false | 'message' | 'error';
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
		toggleSignUpModal: (state, action: PayloadAction<false | 'error' | 'message'>) => {
			if (action.payload === undefined) state.signUp.showModal = false;
			else state.signUp.showModal = action.payload;
		},
		clearSignUpModal: state => {
			state.signUp.modalText = null;
			state.signUp.modalTitle = null;
			state.signUp.message = null;
			state.signUp.error = null;
		},
		hideRemindModal: state => {
			state.remindPassword.showModal = false;
		},
		clearRemindModalData: state => {
			state.remindPassword.error = null;
			state.remindPassword.message = null;
		},
		autStateChange: (state, {payload: {user}}: PayloadAction<{user: IUser | null}>) => {
			state.signIn.loading = false;

			if (user) {
				state.signIn.loggedIn = true;
				state.signIn.user = {email: user.email, name: user.name, uid: user.uid, role: user.role};
			} else {
				state.signIn.loggedIn = false;
				state.signIn.user = null;
			}
		}
	},
	extraReducers: builder => {
		builder.addCase(signIn.pending, state => {
			state.signIn.loading = true;
			state.signIn.error = null;
			state.signIn.meta = {};
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
			state.signUp.showModal = 'message';
			state.signUp.modalTitle = `Your activation link has been sent to \n${action.payload.email}`;
			state.signUp.modalText = 'Please check your email address';
			state.signUp.loading = false;
		});

		builder.addCase(signUp.rejected, (state, action) => {
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
					case 'email-already-in-use':
						state.signUp.modalTitle = 'Failed to sign up';
						state.signUp.modalText = action.payload.message;
						state.signUp.error = action.payload.message;
						state.signUp.showModal = 'error';
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
