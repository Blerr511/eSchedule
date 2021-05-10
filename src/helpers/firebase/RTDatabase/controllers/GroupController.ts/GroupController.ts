import {BaseController, DBItem} from '../../BaseController.abstract';
import {IFaculty} from '../Faculty';

export interface IGroup extends DBItem {
	facultyId: IFaculty['uid'];
	title: string;
}

export class GroupController extends BaseController<IGroup> {
	public _ref = 'group';
}
