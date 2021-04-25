import auth from '@react-native-firebase/auth';
import axiosClient from 'helpers/axiosClient';
import {DefaultResponse} from 'helpers/axiosClient/axiosClient';
import {IUserInfo} from 'store/slices/auth';

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

export const getMyUserInfo = async () =>
	axiosClient.get<DefaultResponse<IUserInfo>>('/users/me').then(res => res.data.data);

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
		.then(async data => {
			const userInfo = await getMyUserInfo();
			return {
				user: {
					email: data.user.email,
					name: data.user.displayName,
					uid: data.user.uid
				},
				userInfo
			};
		});

export const SignUp = async ({email, password}: VerifyEmailPayload) =>
	auth()
		.createUserWithEmailAndPassword(email, password)
		.then(async ({user}) => {
			user.sendEmailVerification();
			await axiosClient.put('/users/student', {uid: user.uid});
			return user;
		});

export const remindPassword = ({email}: RemindPasswordPayload) =>
	auth().sendPasswordResetEmail(email, {handleCodeInApp: true, url: 'eschedule://mobile.app'});
