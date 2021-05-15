import Header from 'components/Header';
import {createStyleSheet} from 'hooks';
import React from 'react';
import {KeyboardAvoidingView} from 'react-native';
import {Calendar} from 'react-native-calendars';

const useStyles = createStyleSheet(theme => ({
	container: {
		flex: 1
	}
}));

const LecturerCalendar = () => {
	const styles = useStyles();
	return (
		<KeyboardAvoidingView style={styles.container}>
			<Header>Lecturer Calendar</Header>
			<Calendar />
		</KeyboardAvoidingView>
	);
};

export default LecturerCalendar;
