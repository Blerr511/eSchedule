import * as React from 'react';
import {Text, View} from 'react-native';

export interface HomeScreenProps {}

const HomeScreen: React.FC<HomeScreenProps> = () => {
	return (
		<View style={{padding: 20, backgroundColor: 'blue'}}>
			<Text style={{color: 'black'}}>HomeScreen</Text>
		</View>
	);
};

export default HomeScreen;
