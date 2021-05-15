import {RouteProp} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import Empty from 'components/Empty';
import Loading from 'components/Loading';
import {RTDatabase} from 'helpers/firebase';
import {ILesson} from 'helpers/firebase/RTDatabase/controllers/LessonController';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {ListItem} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {selectors} from 'store';
import {ScheduleFlow, ScheduleFlowParamList} from '../types';

export interface LessonFlowProps {
	navigation: StackNavigationProp<ScheduleFlowParamList, ScheduleFlow.LESSON>;
	route: RouteProp<ScheduleFlowParamList, ScheduleFlow.LESSON>;
}

const LessonFlow = ({navigation, route}: LessonFlowProps) => {
	const [lessons, setLessons] = useState<ILesson[] | null>(null);

	const {groupId} = route.params;

	const user = useSelector(selectors.auth.user);

	const handleSelectFactory = (uid: string) => () => {
		navigation.push(ScheduleFlow.TIMING, {groupId, lessonId: uid});
	};

	useEffect(() => {
		return new RTDatabase().lesson.pipe(setLessons, lesson => {
			console.log(lesson.groupId, groupId, lesson.lecturerId, user?.uid);
			return lesson.groupId === groupId && lesson.lecturerId === user?.uid;
		});
	}, [groupId, user?.uid]);

	if (!user) return null;

	return (
		<View style={{flex: 1}}>
			{!lessons ? (
				<Loading />
			) : lessons.length === 0 ? (
				<Empty>{'You have not lessons for this group'}</Empty>
			) : (
				lessons.map(lesson => {
					return (
						<ListItem key={lesson.uid} bottomDivider onPress={handleSelectFactory(lesson.uid)}>
							<ListItem.Content>
								<ListItem.Title>{lesson.title}</ListItem.Title>
							</ListItem.Content>
							<ListItem.Chevron />
						</ListItem>
					);
				})
			)}
		</View>
	);
};

export default LessonFlow;
