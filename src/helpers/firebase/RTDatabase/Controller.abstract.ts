import {FirebaseDatabaseTypes} from '@react-native-firebase/database';

export abstract class Controller {
	public abstract _ref: string;
	protected db: FirebaseDatabaseTypes.Module;
	constructor(db: FirebaseDatabaseTypes.Module) {
		this.db = db;
	}
	protected getRef(...nested: string[]): FirebaseDatabaseTypes.Reference {
		const refStr = nested.filter(Boolean).reduce((acc, v) => `${acc}/${v}`, this._ref);
		const ref = this.db.ref(refStr);
		return ref;
	}
}
