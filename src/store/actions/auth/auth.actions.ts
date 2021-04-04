import {createAsyncThunk} from '@reduxjs/toolkit';
import services from 'services';
import {LoginPayload, VerifyEmailPayload} from 'services/auth';

export const signIn = createAsyncThunk<
	any,
	LoginPayload,
	{rejectValue: {message: string; code: 'wrong-password' | 'invalid-email'}}
>('signIn', ({email, password}, {rejectWithValue}) =>
	services.Auth.Login({email, password}).catch(err => rejectWithValue(err?.userInfo))
);

export const signUp = createAsyncThunk<
	VerifyEmailPayload,
	VerifyEmailPayload,
	{rejectValue: {message: string; code: 'wrong-password' | 'invalid-email'}}
>('signUp', ({email}, {rejectWithValue}) =>
	services.Auth.SignUp({email})
		.then(() => ({email}))
		.catch(err => rejectWithValue(err?.userInfo))
);
