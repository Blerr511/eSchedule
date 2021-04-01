import {combineReducers, configureStore} from '@reduxjs/toolkit';
import slices from './slices';

const store = configureStore({reducer: combineReducers({auth: slices.auth.reducer})});

export default store;
