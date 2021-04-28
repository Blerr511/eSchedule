import {createStyleSheet} from 'hooks';
import React from 'react';
import {Text, View} from 'react-native';
import {Calendar} from 'react-native-calendars';

const useStyles = createStyleSheet(theme => ({
	container: {
		flex: 1
	}
}));

const LecturerCalendar = () => {
	const styles = useStyles();
	return (
		<View style={styles.container}>
			<Text>Lecturer Calendar</Text>
			<Calendar />
		</View>
	);
};

export default LecturerCalendar;
