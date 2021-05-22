import app from '@react-native-firebase/app';

export const FIREBASE_APP = 'CONSOLE' as const;

export const initFirebase = async ({databaseURL}: {databaseURL: string}) => {
	if (!app.apps.find(v => v.name === FIREBASE_APP))
		await app.initializeApp(
			{
				...app.app().options,
				databaseURL
			},
			{name: FIREBASE_APP}
		);
	else console.warn('initFirebase already called.');
};
