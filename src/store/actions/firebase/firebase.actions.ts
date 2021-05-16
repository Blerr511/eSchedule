import {createAction} from '@reduxjs/toolkit';
import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';

export const notificationReceived = createAction<FirebaseMessagingTypes.RemoteMessage>(
	'@FIREBASE/notification_reserved'
);
