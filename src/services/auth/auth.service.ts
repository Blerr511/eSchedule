import auth from '@react-native-firebase/auth';
import axiosClient from 'helpers/axiosClient';
import {DefaultResponse} from 'helpers/axiosClient/axiosClient';

export interface VerifyEmailPayload {
	email: string;
	password: string;
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
		.then(data => {
			if (!data.user.emailVerified)
				return Promise.reject({
					userInfo: {code: 'email-not-verified', message: 'Email address not verified'}
				});
			return data;
		})
		.then(data => {
			return {
				user: {
					email: data.user.email,
					name: data.user.displayName,
					uid: data.user.uid
				}
			};
		});

export const SignUp = async ({email, password}: VerifyEmailPayload) =>
	auth()
		.createUserWithEmailAndPassword(email, password)
		.then(async ({user}) => {
			user.sendEmailVerification();
			return user;
		});

export const remindPassword = ({email}: RemindPasswordPayload) =>
	auth().sendPasswordResetEmail(email, {handleCodeInApp: true, url: 'eschedule://mobile.app'});
