import {ParamListBase} from '@react-navigation/routers';

export enum SCStackRoutes {
	Calendar = 'student/calendar',
	Schedule = 'student/calendar/schedule'
}

export type StudentCalendarStackParams = {
	[SCStackRoutes.Calendar]: undefined;
	[SCStackRoutes.Schedule]: {dateString: string};
};

export interface StudentCalendarStackParamsList extends StudentCalendarStackParams, ParamListBase {}
