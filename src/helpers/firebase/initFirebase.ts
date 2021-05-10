import app from '@react-native-firebase/app';

export const FIREBASE_APP = 'CONSOLE' as const;

let init = 0;

export const initFirebase = async ({databaseURL}: {databaseURL: string}) => {
	if (init > 0) console.warn('initFirebase already called.');

	init++;

	if (!app.apps.find(v => v.name === FIREBASE_APP))
		await app.initializeApp(
			{
				...app.app().options,
				databaseURL
			},
			{name: FIREBASE_APP}
		);
};
