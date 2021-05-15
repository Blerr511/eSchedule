import React, {useEffect, useState} from 'react';
import {RouteProp} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import FloatingButton from 'components/FloatingButton';
import {LecturerScheduleParamList} from 'containers/LecturerSchedule/types';
import {createStyleSheet} from 'hooks';
import {View} from 'react-native';
import {ISchedule} from 'helpers/firebase/RTDatabase/controllers/ScheduleController';
import {RTDatabase} from 'helpers/firebase';
import {useSelector} from 'react-redux';
import {auth} from 'store/selectors';
import {IUser} from 'store/slices/auth';
import {getNextByWeekDay} from 'helpers/date/getNextByWeekday';
import Loading from 'components/Loading';
import ScheduleList from './components/ScheduleList';

const useStyles = createStyleSheet(theme => ({
	container: {
		flex: 1
	}
}));

type LecturerScheduleMainProps = {
	navigation: StackNavigationProp<LecturerScheduleParamList, 'LecturerScheduleMain'>;
	route: RouteProp<LecturerScheduleParamList, 'LecturerScheduleMain'>;
};

export interface ScheduleListItem extends ISchedule {
	triggerDate: number;
}

const LecturerScheduleMain = ({navigation}: LecturerScheduleMainProps) => {
	const styles = useStyles();
	const user = useSelector(auth.user);
	const [schedules, setSchedules] = useState<ScheduleListItem[] | null>(null);

	useEffect(() => {
		if (user?.uid) {
			const unsubscribe = new RTDatabase().schedule.pipe(
				schedules => {
					let res: ScheduleListItem[] = [];

					schedules.forEach(sc => {
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
					return schedule.lecturerId === user.uid;
				}
			);

			return () => {
				unsubscribe();
			};
		}
	}, [user?.uid]);

	const handleCreateSchedule = () => {
		navigation.navigate('CreateSchedule');
	};

	return (
		<>
			<View style={styles.container}>
				{!schedules ? <Loading /> : <ScheduleList schedules={schedules} />}
				<FloatingButton
					actions={[
						{
							onPress: handleCreateSchedule,
							icon: 'bell',
							label: 'Schedule'
						}
					]}
					icon="plus"
					visible
				/>
			</View>
		</>
	);
};

export default LecturerScheduleMain;
