import Header from 'components/Header';
import {DEFAULT_DATE_FORMAT, DEFAULT_TIME_FORMAT} from 'constants/dateFormats';
import {RTDatabase} from 'helpers/firebase';
import {getMarkedDates} from 'helpers/util';
import {createStyleSheet, usePipedState, useTheme, useTraceUpdate} from 'hooks';
import moment from 'moment';
import randomColor from 'randomcolor';
import React, {useCallback, useMemo, useState} from 'react';
import {KeyboardAvoidingView} from 'react-native';
import {Calendar, DateObject, Marking, MultiDotMarking} from 'react-native-calendars';
import {useSelector} from 'react-redux';
import {auth} from 'store/selectors';

const useStyles = createStyleSheet(theme => ({
	container: {
		flex: 1
	}
}));

const scheduleController = new RTDatabase().schedule;

const CALENDER_FORMAT = 'YYYY-MM-DD';

const migrate = async () => {
	const schedules = await scheduleController.find(e => !e.color);

	schedules.forEach(sc => {
		let color = randomColor();

		while (schedules.find(v => v.color === color)) {
			color = randomColor();
		}
		console.log(sc.uid);
		scheduleController.updateById(sc.uid, {color});
	});
};

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

const LecturerCalendar = () => {
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

	return (
		<KeyboardAvoidingView style={styles.container}>
			<Header>Lecturer Calendar</Header>
			<Calendar markingType="multi-dot" markedDates={markedDates} onMonthChange={setMonth} />
		</KeyboardAvoidingView>
	);
};

export default LecturerCalendar;
