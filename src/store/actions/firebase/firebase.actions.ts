import {createAction} from '@reduxjs/toolkit';
import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';

export const notificationReceived = createAction<FirebaseMessagingTypes.RemoteMessage>(
	'@FIREBASE/notification_reserved'
);

export const hideNotificationPopup = createAction('@FIREBASE/hide_popup');
export const clearNotificationPopup = createAction('@FIREBASE/clear_popup');
