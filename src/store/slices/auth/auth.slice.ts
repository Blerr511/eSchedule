import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {remindPassword, signIn, signUp} from '../../actions/auth';

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
	message: string | null;
	signedUp: {
		showModal: boolean;
		modalText: string | null;
		modalTitle: string | null;
	};
	remindPassword: {
		loading: boolean;
		error: string | null;
		message: string | null;
		showModal: boolean;
	};
} = {
	user: null,
	loggedIn: false,
	loading: false,
	error: null,
	meta: {},
	message: null,
	signedUp: {
		showModal: false,
		modalText: null,
		modalTitle: null
	},
	remindPassword: {
		loading: false,
		error: null,
		message: null,
		showModal: false
	}
};

const authSlice = createSlice({
	initialState,
	name: 'auth',
	reducers: {
		clearErrors: state => {
			state.error = null;
			state.meta = {};
			state.message = null;
		},
		toggleSignUpModal: (state, action: PayloadAction<boolean | undefined>) => {
			if (action.payload === undefined) state.signedUp.showModal = !state.signedUp.showModal;
			else state.signedUp.showModal = action.payload;
		},
		clearSignUpModal: state => {
			state.signedUp.modalText = null;
			state.signedUp.modalTitle = null;
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

		builder.addCase(signUp.pending, state => {
			state.loading = true;
			state.error = null;
			state.meta = {};
		});

		builder.addCase(signUp.fulfilled, (state, action) => {
			state.signedUp.showModal = true;
			state.signedUp.modalTitle = `Your activation link has been sent to ${action.payload.email}`;
			state.signedUp.modalText = 'Please check your email address';
		});

		builder.addCase(signUp.rejected, (state, action) => {
			state.loading = false;
			if (action.payload) {
				if (action.payload.code === 'invalid-email') {
					state.meta = {
						email: action.payload.message
					};
				} else state.error = action.payload.message;
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
