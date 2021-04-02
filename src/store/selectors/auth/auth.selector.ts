import type {RootState} from 'store/store';

export const loggedIn = (state: RootState) => state.auth.loggedIn;

export const user = (state: RootState) => state.auth.user;
