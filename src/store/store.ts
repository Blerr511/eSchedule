import {combineReducers, configureStore} from '@reduxjs/toolkit';
import slices from './slices';

const reducer = combineReducers({auth: slices.auth.reducer});

const store = configureStore({reducer});

export type RootState = ReturnType<typeof reducer>;

export default store;
