import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StudentCalendarStackParamsList, SCStackRoutes} from './types';
import {StudentCalendarView, StudentScheduleView} from './Views';

const stack = createStackNavigator<StudentCalendarStackParamsList>();

const StudentCalendarStack = () => {
	return (
		<stack.Navigator initialRouteName={SCStackRoutes.Calendar}>
			<stack.Screen
				name={SCStackRoutes.Calendar}
				component={StudentCalendarView}
				options={{headerShown: false}}
			/>
			<stack.Screen
				name={SCStackRoutes.Schedule}
				component={StudentScheduleView}
				options={{headerTitle: 'Schedule'}}
			/>
		</stack.Navigator>
	);
};

export default StudentCalendarStack;
