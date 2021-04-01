import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const initialState = {user: null, loggedIn: false, loading: false, error: null};

const authSlice = createSlice({initialState, name: 'auth', reducers: {}});

const loggIn = createAsyncThunk("login")