import {BaseController, DBItem} from '../../BaseController.abstract';

export interface ILesson extends DBItem {
	title: string;
	description?: string;
	lecturerId: string;
	groupId: string;
}

export class LessonController extends BaseController<ILesson> {
	public _ref = 'lesson';
}
