import type {RootState} from 'store/store';

export const auth = (state: RootState) => state.auth;

auth.signIn = (state: RootState) => state.auth.signIn;

auth.loggedIn = (state: RootState) => state.auth.signIn.loggedIn;

auth.user = (state: RootState) => state.auth.signIn.user;

auth.signUp = (state: RootState) => state.auth.signUp;

auth.remindPassword = (state: RootState) => state.auth.remindPassword;
