import Loading from 'components/Loading';
import {RTDatabase} from 'helpers/firebase';
import {getSortedScheduleList, ScheduleListItem} from 'helpers/util';
import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView} from 'react-native';
import {useSelector} from 'react-redux';
import {auth} from 'store/selectors';
import ScheduleList from './components/ScheduleList';

const StudentSchedule = () => {
	const [schedules, setSchedules] = useState<ScheduleListItem[] | null>(null);

	const user = useSelector(auth.user);

	useEffect(() => {
		return new RTDatabase().schedule.pipe(
			schedules => {
				setSchedules(getSortedScheduleList(schedules));
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
