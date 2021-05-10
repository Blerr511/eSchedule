import React, {useEffect, useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RTDatabase} from 'helpers/firebase';
import {IFaculty} from 'helpers/firebase/RTDatabase/controllers/Faculty';
import {View} from 'react-native';
import {ListItem} from 'react-native-elements';
import {ScheduleFlow, ScheduleFlowParamList} from '../types';

export interface FacultyFlowProps {
	navigation: StackNavigationProp<ScheduleFlowParamList, ScheduleFlow.FACULTY>;
}

const FacultyFlow = ({navigation}: FacultyFlowProps) => {
	const [faculties, setFaculties] = useState<IFaculty[]>([]);

	const handleSelectFactory = (uid: string) => () => {
		navigation.navigate(ScheduleFlow.GROUP, {facultyId: uid});
	};

	useEffect(() => {
		return new RTDatabase().faculty.pipe(setFaculties);
	}, []);

	return (
		<View>
			{faculties.map(faculty => {
				return (
					<ListItem key={faculty.uid} bottomDivider onPress={handleSelectFactory(faculty.uid)}>
						<ListItem.Content>
							<ListItem.Title>{faculty.title}</ListItem.Title>
							<ListItem.Subtitle numberOfLines={1}>
								{faculty.longTitle || '...'}
							</ListItem.Subtitle>
						</ListItem.Content>
						<ListItem.Chevron />
					</ListItem>
				);
			})}
		</View>
	);
};

export default FacultyFlow;
