import {IUser} from 'store/slices/auth';
import {FirebaseDatabaseTypes} from '@react-native-firebase/database';
import {Controller} from '../../Controller.abstract';
import uuid from 'react-native-uuid';

export class UsersController extends Controller {
	public _ref = 'users';

	public async getUser(userId: string): Promise<IUser> {
		const $ref = this.getRef(userId);

		const snap: FirebaseDatabaseTypes.DataSnapshot = await new Promise((res, rej) =>
			$ref.once('value', res, rej)
		);
		const value: IUser | null = snap.val();
		if (!value) throw new Error('User not found');
		return value;
	}

	public pipeUser(userId: string, cb: (user: IUser | null) => void) {
		const $ref = this.getRef(userId);

		const handleValue = (snap: FirebaseDatabaseTypes.DataSnapshot) => {
			cb(snap.val() as IUser);
		};

		$ref.on('value', handleValue);

		return $ref.off('value', handleValue);
	}

	public async getUsers(filter?: (user: IUser) => boolean): Promise<IUser[]> {
		const res: IUser[] = [];
		const $ref = this.getRef();

		const snap: FirebaseDatabaseTypes.DataSnapshot = await new Promise((res, rej) =>
			$ref.once('value', res, rej)
		);

		snap.forEach(el => {
			const val = el.val() as IUser;
			if (!filter || filter(val)) res.push(val);
			return undefined;
		});

		return res;
	}
	public pipeUsers(cb: (users: IUser[]) => void, filter?: (user: IUser) => boolean) {
		const $ref = this.getRef();

		const handleValue = (snap: FirebaseDatabaseTypes.DataSnapshot) => {
			const res: IUser[] = [];
			snap.forEach(u => {
				const val = u.val() as IUser;
				if (!filter || filter(val)) res.push(val);
				return undefined;
			});
			cb(res);
		};

		$ref.on('value', handleValue);

		return () => $ref.off('value', handleValue);
	}
	public async createUser(user: Omit<IUser, 'uid'> & Partial<Pick<IUser, 'uid'>>): Promise<IUser> {
		const uid = String(user.uid) || uuid.v4('users').toString();
		const $ref = this.getRef(uid);
		await $ref.set({...user, uid});
		return this.getUser(uid);
	}
}
