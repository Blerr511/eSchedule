import auth from '@react-native-firebase/auth';

export interface LoginPayload {
	email: string;
	password: string;
}

export const Login = ({email, password}: LoginPayload) =>
	auth()
		.signInWithEmailAndPassword(email, password)
		.then(data => ({user: {email: data.user.email, name: data.user.displayName, uid: data.user.uid}}));
