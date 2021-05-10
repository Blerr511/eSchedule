import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LecturerScheduleMain} from './Views';
import {LecturerScheduleParamList} from './types';
import CreateScheduleFlow from 'components/FormFlows/CreateScheduleFlow';

const Stack = createStackNavigator<LecturerScheduleParamList>();

const LecturerSchedule = () => {
	return (
		<Stack.Navigator initialRouteName="LecturerScheduleMain" headerMode="none">
			<Stack.Screen name="LecturerScheduleMain" component={LecturerScheduleMain} />
			<Stack.Screen name="CreateSchedule" component={CreateScheduleFlow} />
		</Stack.Navigator>
	);
};

export default LecturerSchedule;
