import {IUser} from 'store/slices/auth';
import {BaseController} from '../../BaseController.abstract';

export class UsersController extends BaseController<IUser> {
	public _ref = 'users';
}
