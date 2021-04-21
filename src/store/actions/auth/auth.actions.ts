import {createAsyncThunk} from '@reduxjs/toolkit';
import services from 'services';
import {LoginPayload, RemindPasswordPayload, VerifyEmailPayload} from 'services/auth';

export const signIn = createAsyncThunk<
	any,
	LoginPayload,
	{rejectValue: {message: string; code: 'wrong-password' | 'invalid-email' | 'email-already-in-use'}}
>('@AUTH/signIn', ({email, password}, {rejectWithValue}) =>
	services.Auth.Login({email, password}).catch(err => rejectWithValue(err?.userInfo))
);

export interface SignUpInterface extends VerifyEmailPayload {
	passwordConfirm: string;
}

export const signUp = createAsyncThunk<
	{email: string},
	SignUpInterface,
	{
		rejectValue: {
			message: string;
			code:
				| 'wrong-password'
				| 'invalid-email'
				| 'wrong-confirm-password'
				| 'weak-password'
				| 'email-already-in-use';
		};
	}
>('@AUTH/signUp', async ({email, password, passwordConfirm}, {rejectWithValue}) => {
	try {
		if (!email) return rejectWithValue({code: 'invalid-email', message: 'Required !'});
		if (!password) return rejectWithValue({code: 'wrong-password', message: 'Required !'});
		if (password !== passwordConfirm)
			return rejectWithValue({code: 'wrong-confirm-password', message: 'Invalid password confirm'});

		await services.Auth.SignUp({email, password});
		return {email};
	} catch (error) {
		return rejectWithValue(error?.userInfo);
	}
});

export const remindPassword = createAsyncThunk<
	RemindPasswordPayload,
	RemindPasswordPayload,
	{rejectValue: {message: string; code: 'wrong-password' | 'invalid-email'}}
>('@AUTH/remindPassword', ({email}: RemindPasswordPayload, {rejectWithValue}) =>
	services.Auth.remindPassword({email})
		.then(() => ({email}))
		.catch(err => rejectWithValue(err?.userInfo))
);
