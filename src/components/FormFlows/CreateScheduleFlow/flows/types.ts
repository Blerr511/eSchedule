import {ParamListBase} from '@react-navigation/routers';

export enum ScheduleFlow {
	FACULTY = 'SCHEDULE_FLOW_FACULTY',
	GROUP = 'SCHEDULE_FLOW_GROUP',
	LESSON = 'SCHEDULE_FLOW_LESSON',
	TIMING = 'SCHEDULE_FLOW_TIMING'
}

export interface ScheduleFlowParamList extends ParamListBase {
	[ScheduleFlow.FACULTY]: undefined;
	[ScheduleFlow.GROUP]: {facultyId: string};
	[ScheduleFlow.LESSON]: {groupId: string};
	[ScheduleFlow.TIMING]: {groupId: string; lessonId: string};
}
