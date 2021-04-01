import {createAsyncThunk} from '@reduxjs/toolkit';
import services from 'services';

export const signIn = createAsyncThunk('signIn', ({email, password}: {email: string; password: string}) =>
	services.Auth.Login({email, password})
);
