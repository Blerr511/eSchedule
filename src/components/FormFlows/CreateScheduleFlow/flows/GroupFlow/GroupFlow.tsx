import {RouteProp} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import Loading from 'components/Loading';
import {RTDatabase} from 'helpers/firebase';
import {IGroup} from 'helpers/firebase/RTDatabase/controllers/GroupController.ts';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {ListItem} from 'react-native-elements';
import {ScheduleFlow, ScheduleFlowParamList} from '../types';

export interface GroupFlowProps {
	navigation: StackNavigationProp<ScheduleFlowParamList, ScheduleFlow.GROUP>;
	route: RouteProp<ScheduleFlowParamList, ScheduleFlow.GROUP>;
}

const GroupFlow = ({navigation, route}: GroupFlowProps) => {
	const [groups, setGroups] = useState<IGroup[] | null>(null);

	const handleSelectFactory = (uid: string) => () => {
		navigation.push(ScheduleFlow.LESSON, {groupId: uid});
	};

	useEffect(() => {
		return new RTDatabase().group.pipe(setGroups, group => group.facultyId === route.params.facultyId);
	}, [route.params.facultyId]);

	return (
		<View style={{flex: 1}}>
			{!groups ? (
				<Loading />
			) : (
				groups.map(group => {
					return (
						<ListItem key={group.uid} bottomDivider onPress={handleSelectFactory(group.uid)}>
							<ListItem.Content>
								<ListItem.Title>{group.title}</ListItem.Title>
							</ListItem.Content>
							<ListItem.Chevron />
						</ListItem>
					);
				})
			)}
		</View>
	);
};

export default GroupFlow;
