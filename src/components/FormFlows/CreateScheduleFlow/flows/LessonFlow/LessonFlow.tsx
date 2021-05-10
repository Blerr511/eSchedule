import {NavigationProp, RouteProp} from '@react-navigation/core';
import React from 'react';
import {Text, View} from 'react-native';
import {ScheduleFlow, ScheduleFlowParamList} from '../types';

export interface LessonFlowProps {
	navigation: NavigationProp<ScheduleFlowParamList, ScheduleFlow.LESSON>;
	route: RouteProp<ScheduleFlowParamList, ScheduleFlow.LESSON>;
}

const LessonFlow = (props: LessonFlowProps) => {

	return (
		<View>
			<Text>Lesson</Text>
		</View>
	);
};

export default LessonFlow;
