import {RouteProp} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import Loading from 'components/Loading';
import {StepperFlow, StepperFlowParams} from 'containers/StudentInitStepper/types';
import {RTDatabase} from 'helpers/firebase';
import {IGroup} from 'helpers/firebase/RTDatabase/controllers/GroupController.ts';
import React, {useEffect, useState} from 'react';
import {ToastAndroid, View} from 'react-native';
import {ListItem} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {auth} from 'store/selectors';
import {RootState} from 'store/store';
import {IStudentSettings} from 'store/slices/auth/auth.slice';

export interface GroupFlowProps {
	navigation: StackNavigationProp<StepperFlowParams, StepperFlow.GROUP>;
	route: RouteProp<StepperFlowParams, StepperFlow.GROUP>;
}

const GroupFlow = ({route}: GroupFlowProps) => {
	const [groups, setGroups] = useState<IGroup[] | null>(null);

	const userId = useSelector((state: RootState) => auth.user(state)?.uid) as string;

	const handleSelectFactory = (uid: string) => () => {
		const $ref = new RTDatabase().users.ref(userId, 'settings');
		const settings: Partial<IStudentSettings> = {
			facultyId: route.params.facultyId,
			groupId: uid,
			initialized: true
		};
		$ref.update(settings).then(() => {
			ToastAndroid.show('Settings saved !', 3000);
		});
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
