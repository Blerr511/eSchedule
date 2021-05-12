import {BaseController, DBItem} from '../../BaseController.abstract';
import {IGroup} from '../GroupController.ts';
import {ILesson} from '../LessonController';

export interface ITiming extends DBItem {
	lessonId: ILesson['uid'];
	groupId: IGroup['uid'];
	title: string;
}

export class TimingController extends BaseController<ITiming> {
	public _ref = 'timing';
}
