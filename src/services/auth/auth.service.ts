import auth from '@react-native-firebase/auth';

export interface VerifyEmailPayload {
	email: string;
}

export interface RemindPasswordPayload {
	email: string;
}

export interface LoginPayload {
	email: string;
	password: string;
}

export interface SignUpPayload extends LoginPayload {
	passwordRe: string;
}

export const Login = ({email, password}: LoginPayload) =>
	auth()
		.signInWithEmailAndPassword(email, password)
		.then(data => ({user: {email: data.user.email, name: data.user.displayName, uid: data.user.uid}}));

export const SignUp = async ({email}: VerifyEmailPayload) =>
	auth().sendSignInLinkToEmail(email, {url: 'http://localhost', handleCodeInApp: true});

export const remindPassword = ({email}: RemindPasswordPayload) =>
	auth().sendPasswordResetEmail(email, {handleCodeInApp: true, url: 'http://localhost:8080'});
