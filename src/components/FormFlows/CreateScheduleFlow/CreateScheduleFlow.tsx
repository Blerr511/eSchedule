import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {FacultyFlow, GroupFlow, LessonFlow, ScheduleFlow, ScheduleFlowParamList} from './flows';

const FlowStack = createStackNavigator<ScheduleFlowParamList>();

const CreateScheduleFlow = () => {
	return (
		<FlowStack.Navigator>
			<FlowStack.Screen
				name={ScheduleFlow.FACULTY}
				component={FacultyFlow}
				options={{headerTitle: 'Faculty'}}
			/>
			<FlowStack.Screen
				name={ScheduleFlow.GROUP}
				component={GroupFlow}
				options={{headerTitle: 'Group'}}
			/>
			<FlowStack.Screen
				name={ScheduleFlow.LESSON}
				component={LessonFlow}
				options={{headerTitle: 'Lesson'}}
			/>
		</FlowStack.Navigator>
	);
};

export default CreateScheduleFlow;
