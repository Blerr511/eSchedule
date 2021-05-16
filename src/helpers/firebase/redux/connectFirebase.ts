import {firebase} from '@react-native-firebase/database';
import messaging from '@react-native-firebase/messaging';
import {Store} from 'redux';
import {notificationReceived} from 'store/actions/firebase';
import authSlice from 'store/slices/auth';
import {RTDatabase} from '../RTDatabase';

export const connectFirebase = (store: Store) => {
	firebase.auth().onAuthStateChanged(async user => {
		const db = new RTDatabase();
		if (user?.emailVerified) {
			const userData = await db.users.findById(user?.uid);

			store.dispatch(
				authSlice.actions.autStateChange({
					user: userData
				})
			);
		} else
			store.dispatch(
				authSlice.actions.autStateChange({
					user: null
				})
			);
	});

	messaging().onMessage(message => {
		store.dispatch(notificationReceived(message));
	});
};
