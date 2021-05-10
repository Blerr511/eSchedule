import {NavigationProp, RouteProp} from '@react-navigation/core';
import {RTDatabase} from 'helpers/firebase';
import {ILesson} from 'helpers/firebase/RTDatabase/controllers/LessonController';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {ListItem} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {selectors} from 'store';
import {IUser} from 'store/slices/auth';
import {ScheduleFlow, ScheduleFlowParamList} from '../types';

export interface LessonFlowProps {
	navigation: NavigationProp<ScheduleFlowParamList, ScheduleFlow.LESSON>;
	route: RouteProp<ScheduleFlowParamList, ScheduleFlow.LESSON>;
}

const LessonFlow = ({navigation, route}: LessonFlowProps) => {
	const [lessons, setLessons] = useState<ILesson[]>([]);

	const {groupId} = route.params;

	const user = useSelector(selectors.auth.user) as IUser;

	const handleSelectFactory = (uid: string) => () => {
		console.log(uid);
	};

	useEffect(() => {
		return new RTDatabase().lesson.pipe(
			setLessons,
			lesson => lesson.groupId === groupId && lesson.lecturerId === user?.uid
		);
	}, [groupId, user?.uid]);

	return (
		<View>
			{lessons.map(lesson => {
				return (
					<ListItem key={lesson.uid} bottomDivider onPress={handleSelectFactory(lesson.uid)}>
						<ListItem.Content>
							<ListItem.Title>{lesson.title}</ListItem.Title>
						</ListItem.Content>
						<ListItem.Chevron />
					</ListItem>
				);
			})}
		</View>
	);
};

export default LessonFlow;
