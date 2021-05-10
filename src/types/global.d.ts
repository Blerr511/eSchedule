import {ReactNativeFirebase} from '@react-native-firebase/app';
import {RTDatabase} from 'helpers/firebase';

declare global {
	namespace NodeJS {
		interface Global {
			__DEV?: {
				actions: {signInLecturer: () => void; signOut: () => void};
				firebase: () => ReactNativeFirebase.FirebaseApp;
				dbController: RTDatabase;
			};
		}
	}
}
