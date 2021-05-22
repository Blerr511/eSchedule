import {RouteProp} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import Header from 'components/Header';
import {LCStackRoutes, LecturerCalendarStackParamList} from 'containers/LecturerCalendar/types';
import {RTDatabase} from 'helpers/firebase';
import {getMarkedDates} from 'helpers/util';
import {createStyleSheet, usePipedState} from 'hooks';
import moment from 'moment';
import React, {useCallback, useMemo, useState} from 'react';
import {KeyboardAvoidingView} from 'react-native';
import {Calendar, DateObject} from 'react-native-calendars';
import {useSelector} from 'react-redux';
import {auth} from 'store/selectors';

const useStyles = createStyleSheet({
	container: {
		flex: 1,
		backgroundColor: 'white'
	}
});

const scheduleController = new RTDatabase().schedule;

const CALENDER_FORMAT = 'YYYY-MM-DD';

const getCurrentDate = (): DateObject => {
	const now = moment();

	return {
		dateString: now.format(CALENDER_FORMAT),
		day: now.day(),
		month: now.month() + 1,
		timestamp: now.unix() * 1000,
		year: now.year()
	};
};

export interface LecturerCalendarViewProps {
	route: RouteProp<LecturerCalendarStackParamList, LCStackRoutes.Calendar>;
	navigation: StackNavigationProp<LecturerCalendarStackParamList, LCStackRoutes.Calendar>;
}

const LecturerCalendarView = ({navigation, route}: LecturerCalendarViewProps) => {
	const styles = useStyles();
	const user = useSelector(auth.user);

	const [scheduleList] = usePipedState(
		scheduleController,
		useCallback(schedule => schedule.lecturerId === user?.uid, [user?.uid])
	);
	const [month, setMonth] = useState<DateObject>(getCurrentDate());

	const markedDates = useMemo(() => (scheduleList ? getMarkedDates(scheduleList, month) : {}), [
		month,
		scheduleList
	]);

	const handleDayPress = useCallback(
		(day: DateObject) => {
			navigation.push(LCStackRoutes.Schedule, {dateString: day.dateString});
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

export default LecturerCalendarView;
