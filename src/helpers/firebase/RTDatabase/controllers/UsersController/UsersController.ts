import {IRole, IUser} from 'store/slices/auth';
import {BaseController} from '../../BaseController.abstract';

export class UsersController<R extends IRole = any> extends BaseController<IUser<R>> {
	public _ref = 'users';
}
