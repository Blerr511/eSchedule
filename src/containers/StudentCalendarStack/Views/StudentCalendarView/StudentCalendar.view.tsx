import React, {useCallback, useMemo, useState} from 'react';
import {RouteProp} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import {SCStackRoutes, StudentCalendarStackParamsList} from 'containers/StudentCalendarStack/types';
import {RTDatabase} from 'helpers/firebase';
import {getCurrentDate, getMarkedDates} from 'helpers/util';
import {createStyleSheet, usePipedState} from 'hooks';
import {KeyboardAvoidingView} from 'react-native';
import {Calendar, DateObject} from 'react-native-calendars';
import {useSelector} from 'react-redux';
import {auth} from 'store/selectors';
import Header from 'components/Header';

export interface StudentCalendarViewProps {
	route: RouteProp<StudentCalendarStackParamsList, SCStackRoutes.Calendar>;
	navigation: StackNavigationProp<StudentCalendarStackParamsList, SCStackRoutes.Calendar>;
}

const useStyles = createStyleSheet({
	container: {
		flex: 1,
		backgroundColor: 'white'
	}
});

const scheduleController = new RTDatabase().schedule;

const StudentCalendarView = ({navigation}: StudentCalendarViewProps) => {
	const styles = useStyles();
	const user = useSelector(auth.user);

	const [scheduleList] = usePipedState(
		scheduleController,
		useCallback(schedule => schedule.groupId === user?.settings?.groupId, [user?.settings?.groupId])
	);

	const [month, setMonth] = useState<DateObject>(getCurrentDate());

	const markedDates = useMemo(() => (scheduleList ? getMarkedDates(scheduleList, month) : {}), [
		month,
		scheduleList
	]);

	const handleDayPress = useCallback(
		(day: DateObject) => {
			navigation.push(SCStackRoutes.Schedule, {dateString: day.dateString});
		},
		[navigation]
	);

	return (
		<KeyboardAvoidingView style={styles.container}>
			<Header>Calendar</Header>
			<Calendar
				markingType="multi-dot"
				markedDates={markedDates}
				onMonthChange={setMonth}
				onDayPress={handleDayPress}
				onDayLongPress={handleDayPress}
			/>
		</KeyboardAvoidingView>
	);
};

export default StudentCalendarView;
