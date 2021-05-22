import {themes} from 'config';
import {ISchedule} from 'helpers/firebase/RTDatabase/controllers/ScheduleController';
import moment from 'moment';
import {DateObject, MultiDotMarking} from 'react-native-calendars';

type MyMarking = {
	[date: string]: MultiDotMarking;
};
export const getMarkedDates = (
	scheduleList: ISchedule[],
	month: DateObject,
	{selectedColor = themes.dark.pallet.primary} = {}
): MyMarking => {
	const markedDates: MyMarking = {};

	scheduleList?.forEach(schedule => {
		if (schedule.singleTime) {
			const keyDate = moment(Number(schedule.date)).format('YYYY-MM-DD');
			markedDates[keyDate] = markedDates[keyDate] || {};
			markedDates[keyDate].dots = markedDates[keyDate].dots || [];
			markedDates[keyDate].dots.push({key: schedule.uid, color: String(schedule.color)});
			if (schedule.isExam) {
				markedDates[keyDate].selected = true;
				markedDates[keyDate].selectedColor = selectedColor;
			}
		} else {
			const monthStart = moment()
				.set({month: month.month - 1})
				.startOf('month');
			const monthEnd = moment()
				.set({month: month.month - 1})
				.endOf('month');

			while (monthStart.isBefore(monthEnd)) {
				if (schedule.weekDays?.includes(monthStart.weekday())) {
					const keyDate = monthStart.format('YYYY-MM-DD');
					markedDates[keyDate] = markedDates[keyDate] || {};
					markedDates[keyDate].dots = markedDates[keyDate].dots || [];
					markedDates[keyDate].dots.push({
						key: schedule.uid,
						color: String(schedule.color) || themes.dark.pallet.primary
					});
				}
				monthStart.add({day: 1});
			}
		}
	});

	return markedDates;
};
