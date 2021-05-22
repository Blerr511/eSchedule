import React, {useEffect, useState} from 'react';
import {RouteProp} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import FloatingButton from 'components/FloatingButton';
import {LecturerScheduleParamList} from 'containers/LecturerSchedule/types';
import {createStyleSheet} from 'hooks';
import {View} from 'react-native';
import {RTDatabase} from 'helpers/firebase';
import {useSelector} from 'react-redux';
import {auth} from 'store/selectors';
import Loading from 'components/Loading';
import ScheduleList from './components/ScheduleList';
import {getSortedScheduleList, ScheduleListItem} from 'helpers/util';

const useStyles = createStyleSheet({
	container: {
		flex: 1
	}
});

type LecturerScheduleMainProps = {
	navigation: StackNavigationProp<LecturerScheduleParamList, 'LecturerScheduleMain'>;
	route: RouteProp<LecturerScheduleParamList, 'LecturerScheduleMain'>;
};

const LecturerScheduleMain = ({navigation}: LecturerScheduleMainProps) => {
	const styles = useStyles();
	const user = useSelector(auth.user);
	const [schedules, setSchedules] = useState<ScheduleListItem[] | null>(null);

	useEffect(() => {
		if (user?.uid) {
			const unsubscribe = new RTDatabase().schedule.pipe(
				schedules => {
					setSchedules(getSortedScheduleList(schedules));
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
