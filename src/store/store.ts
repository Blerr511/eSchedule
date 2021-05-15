import {configureStore} from '@reduxjs/toolkit';
import {connectFirebase} from 'helpers/firebase/redux/connectFirebase';
import reducer from './reducers';

const store = configureStore({reducer});

connectFirebase(store);

export type RootState = ReturnType<typeof reducer>;

export default store;
