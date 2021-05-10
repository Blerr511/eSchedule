import store from 'store';
import actions from 'store/actions';
import auth from '@react-native-firebase/auth';
import app, {RTDatabase} from 'helpers/firebase';

export const initDevHelper = () => {
	global.__DEV = {
		actions: {
			signInLecturer: () => {
				store.dispatch(actions.auth.signIn({email: 'lecturer1@test.do', password: 'lecturer1'}));
			},
			signOut: () => {
				auth().signOut();
			}
		},
		firebase: app,
		dbController: new RTDatabase()
	};
};
