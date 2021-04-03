import {createAsyncThunk} from '@reduxjs/toolkit';
import services from 'services';
type SignInCredentials = {email: string; password: string};
export const signIn = createAsyncThunk<
	any,
	SignInCredentials,
	{rejectValue: {message: string; code: 'wrong-password' | 'invalid-email'}}
>('signIn', ({email, password}, {rejectWithValue}) =>
	services.Auth.Login({email, password}).catch(err => rejectWithValue(err?.userInfo))
);
