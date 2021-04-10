import {createAsyncThunk} from '@reduxjs/toolkit';
import services from 'services';
import {LoginPayload, RemindPasswordPayload, VerifyEmailPayload} from 'services/auth';

export const signIn = createAsyncThunk<
	any,
	LoginPayload,
	{rejectValue: {message: string; code: 'wrong-password' | 'invalid-email'}}
>('@AUTH/signIn', ({email, password}, {rejectWithValue}) =>
	services.Auth.Login({email, password}).catch(err => rejectWithValue(err?.userInfo))
);

export const signUp = createAsyncThunk<
	VerifyEmailPayload,
	VerifyEmailPayload,
	{rejectValue: {message: string; code: 'wrong-password' | 'invalid-email'}}
>('@AUTH/signUp', ({email}, {rejectWithValue}) =>
	services.Auth.SignUp({email})
		.then(() => ({email}))
		.catch(err => rejectWithValue(err?.userInfo))
);

export const remindPassword = createAsyncThunk<
	RemindPasswordPayload,
	RemindPasswordPayload,
	{rejectValue: {message: string; code: 'wrong-password' | 'invalid-email'}}
>('@AUTH/remindPassword', ({email}: RemindPasswordPayload, {rejectWithValue}) =>
	services.Auth.remindPassword({email})
		.then(() => ({email}))
		.catch(err => rejectWithValue(err?.userInfo))
);
