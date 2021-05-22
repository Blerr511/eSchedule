import app from '@react-native-firebase/app';

export const FIREBASE_APP = 'CONSOLE' as const;

export const initFirebase = async ({databaseURL}: {databaseURL: string}) => {
	try {
		await app.initializeApp(
			{
				...app.app().options,
				databaseURL
			},
			{name: FIREBASE_APP}
		);
	} catch (error) {
		if (__DEV__) console.warn(error);
	}
};
