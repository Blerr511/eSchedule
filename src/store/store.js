import {combineReducers, configureStore} from '@reduxjs/toolkit';
import reducers from './reducers';

const store = configureStore({reducer: combineReducers(reducers)});

export default store;
