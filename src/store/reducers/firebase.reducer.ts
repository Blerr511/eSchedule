import {createReducer} from '@reduxjs/toolkit';
import {notificationReceived, hideNotificationPopup, clearNotificationPopup} from 'store/actions/firebase';

export interface FirebaseInitialState {
	showPopup: boolean;
	title: string | null;
	body: string | null;
	okText?: string;
	cancelText?: string;
	linking?: string;
}

const firebaseInitialState: FirebaseInitialState = {showPopup: false, title: null, body: null};

const firebaseReducer = createReducer(firebaseInitialState, builder => {
	builder.addCase(notificationReceived, (state, {payload}) => {
		state.showPopup = true;
		state.title = String(payload.notification?.title);
		state.body = String(payload.notification?.body);
		state.okText = payload.data?.okText;
		state.cancelText = payload.data?.cancelText;
		state.linking = payload.data?.linking;
	});

	builder.addCase(hideNotificationPopup, state => {
		state.showPopup = false;
	});

	builder.addCase(clearNotificationPopup, state => {
		state.title = null;
		state.body = null;
	});
});

export default firebaseReducer;
