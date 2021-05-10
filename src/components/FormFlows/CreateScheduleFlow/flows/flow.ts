import FacultyFlow from './FacultyFlow';
import GroupFlow from './GroupFlow';
import LessonFlow from './LessonFlow';
import {ScheduleFlow} from './types';

export const scheduleFlow = [
	{
		name: ScheduleFlow.FACULTY,
		component: FacultyFlow
	},
	{
		name: ScheduleFlow.GROUP,
		clearTimeout: GroupFlow
	},
	{
		name: ScheduleFlow.LESSON,
		component: LessonFlow
	}
];
