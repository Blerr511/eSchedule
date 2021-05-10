import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {FacultyFlow, GroupFlow, LessonFlow, ScheduleFlow, ScheduleFlowParamList} from './flows';

const FlowStack = createStackNavigator<ScheduleFlowParamList>();

const CreateScheduleFlow = () => {
	return (
		<FlowStack.Navigator>
			<FlowStack.Screen name={ScheduleFlow.FACULTY} component={FacultyFlow} />
			<FlowStack.Screen name={ScheduleFlow.GROUP} component={GroupFlow} />
			<FlowStack.Screen name={ScheduleFlow.LESSON} component={LessonFlow} />
		</FlowStack.Navigator>
	);
};

export default CreateScheduleFlow;
