import firebaseApp from '@react-native-firebase/app';
import {FIREBASE_APP} from './initFirebase';

const app = () => firebaseApp.app(FIREBASE_APP);

export default app;
