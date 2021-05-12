import {FirebaseDatabaseTypes} from '@react-native-firebase/database';
import {Controller} from './Controller.abstract';
import uuid from 'react-native-uuid';

export interface DBItem {
	uid: string;
}

export abstract class BaseController<T extends DBItem = DBItem> extends Controller {
	public async findById(userId: string): Promise<T> {
		const $ref = this.getRef(userId);

		const snap: FirebaseDatabaseTypes.DataSnapshot = await new Promise((res, rej) =>
			$ref.once('value', res, rej)
		);
		const value: T | null = snap.val();
		if (!value) throw new Error('User not found');
		return value;
	}

	public pipeById(userId: string, cb: (user: T | null) => void) {
		const $ref = this.getRef(userId);

		const handleValue = (snap: FirebaseDatabaseTypes.DataSnapshot) => {
			cb(snap.val() as T);
		};

		$ref.on('value', handleValue);

		return () => $ref.off('value', handleValue);
	}

	public async find(filter?: (user: T) => boolean): Promise<T[]> {
		const res: T[] = [];
		const $ref = this.getRef();

		const snap: FirebaseDatabaseTypes.DataSnapshot = await new Promise((res, rej) =>
			$ref.once('value', res, rej)
		);

		snap.forEach(el => {
			const val = el.val() as T;
			if (!filter || filter(val)) res.push(val);
			return undefined;
		});

		return res;
	}
	public pipe(cb: (users: T[]) => void, filter?: (user: T) => boolean) {
		const $ref = this.getRef();

		const handleValue = (snap: FirebaseDatabaseTypes.DataSnapshot) => {
			const res: T[] = [];
			snap.forEach(u => {
				const val = u.val() as T;
				if (!filter || filter(val)) res.push(val);
				return undefined;
			});
			cb(res);
		};

		$ref.on('value', handleValue);

		return () => $ref.off('value', handleValue);
	}
	public async create(user: Omit<T, 'uid'> & Partial<Pick<T, 'uid'>>): Promise<T> {
		const uid = user.uid || uuid.v4('users').toString();
		const $ref = this.getRef(uid);
		await $ref.set({...user, uid});
		return this.findById(uid);
	}
}
