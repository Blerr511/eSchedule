import {getNextByWeekDay} from 'helpers/date/getNextByWeekday';
import {ISchedule} from 'helpers/firebase/RTDatabase/controllers/ScheduleController';

export interface ScheduleListItem extends ISchedule {
	triggerDate: number;
}
export const getSortedScheduleList = (schedules: ISchedule[]): ScheduleListItem[] => {
	let res: ScheduleListItem[] = [];

	schedules.forEach(sc => {
		if (sc.singleTime) res.push({...sc, triggerDate: (sc.date as number) / 1000});
		else {
			sc.weekDays?.map(wkd => {
				res.push({...sc, triggerDate: getNextByWeekDay(wkd).unix()});
			});
		}
	});

	res = res.sort((a, b) => a.triggerDate - b.triggerDate);

	return res;
};
