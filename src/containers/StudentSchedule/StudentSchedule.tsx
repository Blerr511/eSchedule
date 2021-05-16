import Loading from 'components/Loading';
import Table from 'components/Table';
import Typography from 'components/Typography';
import {getNextByWeekDay} from 'helpers/date/getNextByWeekday';
import {RTDatabase} from 'helpers/firebase';
import {ISchedule} from 'helpers/firebase/RTDatabase/controllers/ScheduleController';
import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView, View} from 'react-native';
import {useSelector} from 'react-redux';
import {auth} from 'store/selectors';
import ScheduleList from './components/ScheduleList';

const WEEK_DAYS = [
	{
		value: 0,
		label: 'Monday'
	},
	{value: 1, label: 'Tuesday'},
	{value: 2, label: 'Wednesday'},
	{value: 3, label: 'Thursday'},
	{value: 4, label: 'Friday'},
	{
		value: 5,
		label: 'Saturday'
	}
];
export interface ScheduleListItem extends ISchedule {
	triggerDate: number;
}

const StudentSchedule = () => {
	const [schedules, setSchedules] = useState<ScheduleListItem[] | null>(null);

	const user = useSelector(auth.user);

	useEffect(() => {
		return new RTDatabase().schedule.pipe(
			schedules => {
				let res: ScheduleListItem[] = [];

				schedules.forEach(sc => {
					if (sc.singleTime && sc.date && sc.date < Date.now()) {
						new RTDatabase().schedule.deleteById(sc.uid);
						return false;
					}

					if (sc.singleTime) res.push({...sc, triggerDate: sc.date as number});
					else {
						sc.weekDays?.map(wkd => {
							res.push({...sc, triggerDate: getNextByWeekDay(wkd).unix()});
						});
					}
				});

				res = res.sort((a, b) => a.triggerDate - b.triggerDate);

				setSchedules(res);
			},
			schedule => {
				return schedule.groupId === user?.settings?.groupId;
			}
		);
	}, [user?.settings?.groupId]);

	return (
		<KeyboardAvoidingView style={{flex: 1}}>
			{!schedules ? <Loading /> : <ScheduleList schedules={schedules} />}
		</KeyboardAvoidingView>
	);
};

export default StudentSchedule;
