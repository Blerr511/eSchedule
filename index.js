/**
 * @format
 */

import {AppRegistry, Linking} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(message => {
	if (message.data?.linking) {
		Linking.openURL(message.data?.linking);
	}
});

AppRegistry.registerComponent(appName, () => App);
