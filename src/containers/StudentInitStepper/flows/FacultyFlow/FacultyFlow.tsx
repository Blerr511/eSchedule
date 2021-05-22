import {StackNavigationProp} from '@react-navigation/stack';
import Loading from 'components/Loading';
import {StepperFlow, StepperFlowParams} from 'containers/StudentInitStepper/types';
import {RTDatabase} from 'helpers/firebase';
import {usePipedState} from 'hooks';
import React from 'react';
import {FlatList, View} from 'react-native';
import {ListItem} from 'react-native-elements';

export interface FacultyFlowProps {
	navigation: StackNavigationProp<StepperFlowParams>;
}

const facultyController = new RTDatabase().faculty;

const FacultyFlow = ({navigation}: FacultyFlowProps) => {
	const [faculty] = usePipedState(facultyController);

	const handleSelectFactory = (uid: string) => () => {
		navigation.push(StepperFlow.GROUP, {facultyId: uid});
	};
	return (
		<View style={{flex: 1}}>
			{!faculty ? (
				<Loading />
			) : (
				<FlatList
					data={faculty}
					renderItem={({item: faculty}) => {
						return (
							<ListItem
								key={faculty.uid}
								bottomDivider
								onPress={handleSelectFactory(faculty.uid)}>
								<ListItem.Content>
									<ListItem.Title>{faculty.title}</ListItem.Title>
									<ListItem.Subtitle numberOfLines={1}>
										{faculty.longTitle || '...'}
									</ListItem.Subtitle>
								</ListItem.Content>
								<ListItem.Chevron />
							</ListItem>
						);
					}}
				/>
			)}
		</View>
	);
};

export default FacultyFlow;
