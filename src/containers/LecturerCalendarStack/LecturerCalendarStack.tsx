import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LCStackRoutes, LecturerCalendarStackParams} from './types';
import {LecturerCalendarView, LecturerScheduleView} from './Views';

const stack = createStackNavigator<LecturerCalendarStackParams>();

const LecturerCalendarStack = () => {
	return (
		<stack.Navigator initialRouteName={LCStackRoutes.Calendar}>
			<stack.Screen
				name={LCStackRoutes.Calendar}
				component={LecturerCalendarView}
				options={{headerShown: false}}
			/>
			<stack.Screen
				name={LCStackRoutes.Schedule}
				component={LecturerScheduleView}
				options={{headerTitle: 'Schedule'}}
			/>
		</stack.Navigator>
	);
};

export default LecturerCalendarStack;
