import type {RootState} from 'store/store';

export const auth = (state: RootState) => state.auth;

auth.loggedIn = (state: RootState) => state.auth.loggedIn;

auth.user = (state: RootState) => state.auth.user;
