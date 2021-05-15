import {firebase} from '@react-native-firebase/database';
import {Store} from 'redux';
import authSlice from 'store/slices/auth';
import {RTDatabase} from '../RTDatabase';

export const connectFirebase = (store: Store) => {
	firebase.auth().onAuthStateChanged(async user => {
		const db = new RTDatabase();
		if (user?.emailVerified) {
			const userData = await db.users.findById(user?.uid);

			store.dispatch(
				authSlice.actions.autStateChange({
					user: {
						email: String(user.email),
						name: user.displayName,
						uid: user.uid,
						role: userData.role
					}
				})
			);
		} else
			store.dispatch(
				authSlice.actions.autStateChange({
					user: null
				})
			);
	});
};
