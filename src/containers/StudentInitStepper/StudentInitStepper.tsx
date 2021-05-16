import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import FacultyFlow from './flows/FacultyFlow';
import GroupFlow from './flows/GroupFlow';
import {StepperFlow, StepperFlowParams} from './types';

const StepperStack = createStackNavigator<StepperFlowParams>();

const StudentInitStepper = () => {
	return (
		<StepperStack.Navigator>
			<StepperStack.Screen
				name={StepperFlow.FACULTY}
				component={FacultyFlow}
				options={{headerTitle: 'Choose your faculty', headerTitleAlign: 'center'}}
			/>
			<StepperStack.Screen
				name={StepperFlow.GROUP}
				component={GroupFlow}
				options={{headerTitle: 'Choose your group', headerTitleAlign: 'center'}}
			/>
		</StepperStack.Navigator>
	);
};

export default StudentInitStepper;
