import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LecturerScheduleMain} from './Views';
import {LecturerScheduleParamList} from './types';

const Stack = createStackNavigator<LecturerScheduleParamList>();

const LecturerSchedule = () => {
	return (
		<Stack.Navigator initialRouteName="LecturerScheduleMain" headerMode="none">
			<Stack.Screen name="LecturerScheduleMain" component={LecturerScheduleMain} />
		</Stack.Navigator>
	);
};

export default LecturerSchedule;
