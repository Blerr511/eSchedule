import {BaseController, DBItem} from '../../BaseController.abstract';

export interface IFaculty extends DBItem {
	title: string;
	longTitle: string;
}

export class FacultyController extends BaseController<IFaculty> {
	public _ref = 'faculty';
}
