import {ParamListBase} from '@react-navigation/routers';

export enum LCStackRoutes {
	Calendar = 'lecturer/calendar',
	Schedule = 'lecturer/calendar/schedule'
}

export type LecturerCalendarStackParams = {
	[LCStackRoutes.Calendar]: undefined;
	[LCStackRoutes.Schedule]: {dateString: string};
};

export interface LecturerCalendarStackParamList extends ParamListBase, LecturerCalendarStackParams {}
