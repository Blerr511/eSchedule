import React from 'react';
import {RouteProp} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import FloatingButton from 'components/FloatingButton';
import {LecturerScheduleParamList} from 'containers/LecturerSchedule/types';
import {createStyleSheet} from 'hooks';
import {View} from 'react-native';

const useStyles = createStyleSheet(theme => ({
	container: {
		flex: 1
	}
}));

type LecturerScheduleMainProps = {
	navigation: StackNavigationProp<LecturerScheduleParamList, 'LecturerScheduleMain'>;
	route: RouteProp<LecturerScheduleParamList, 'LecturerScheduleMain'>;
};

const LecturerScheduleMain = ({navigation}: LecturerScheduleMainProps) => {
	const styles = useStyles();

	const handleCreateSchedule = () => {
		navigation.navigate('CreateSchedule');
	};

	return (
		<>
			<View style={styles.container}>
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
