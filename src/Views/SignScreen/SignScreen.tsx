//@flow
import * as React from 'react';
import {Text, View} from 'react-native';

export interface SignScreenProps {}

const SignScreen: React.FC<SignScreenProps> = () => {
	return (
		<View>
			<Text style={{color: 'black'}}>SignScreen</Text>
		</View>
	);
};

export default SignScreen;
