import {ParamListBase} from '@react-navigation/routers';
import {ISchedule} from 'helpers/firebase/RTDatabase/controllers/ScheduleController';

export enum LCStackRoutes {
	Calendar = 'lecturer/calendar',
	Schedule = 'lecturer/calendar/schedule'
}

export type LecturerCalendarStackParams = {
	[LCStackRoutes.Calendar]: undefined;
	[LCStackRoutes.Schedule]: {scheduleId: ISchedule['uid']};
};

export interface LecturerCalendarStackParamList extends ParamListBase, LecturerCalendarStackParams {}
