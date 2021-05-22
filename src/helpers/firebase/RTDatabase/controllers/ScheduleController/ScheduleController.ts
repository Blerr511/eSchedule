import {ColorValue} from 'react-native';
import {IUser} from 'store/slices/auth';
import {BaseController, DBItem} from '../../BaseController.abstract';
import {IGroup} from '../GroupController.ts';
import {ILesson} from '../LessonController';

export interface ISchedule<S extends boolean = boolean> extends DBItem {
	lecturerId: IUser<'lecturer'>['uid'];
	lessonId: ILesson['uid'];
	groupId: IGroup['uid'];
	singleTime: S;
	date: S extends true ? number : undefined;
	time: string;
	weekDays: S extends false ? number[] : undefined;
	link?: string;
	description?: string;
	isExam?: boolean;
	color: ColorValue;
}

export class ScheduleController extends BaseController<ISchedule> {
	public _ref = 'schedule';
}
