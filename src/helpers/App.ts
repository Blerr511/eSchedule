import {initDevHelper} from './dev/initDevHelper';
import firebaseApp, {initFirebase} from './firebase';
import {DB_URL} from '@env';

export class App {
	public firebase = firebaseApp;
	public async init() {
		await this.initFirebase();
		this.initDevHelper();
	}

	private initFirebase() {
		const databaseURL = DB_URL || 'https://eshedule-default-rtdb.europe-west1.firebasedatabase.app';

		return initFirebase({databaseURL});
	}
	//NOTE - dev helper includes components need to initialize , so init dev helper at end of all
	private initDevHelper() {
		if (__DEV__) initDevHelper();
	}
}

const app = new App();

export default app;
