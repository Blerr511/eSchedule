import {StackNavigationProp} from '@react-navigation/stack';
import * as React from 'react';
import {Text, View} from 'react-native';
import {RootStackParamList} from 'Views';

export interface SignInProps {
	navigation: StackNavigationProp<RootStackParamList, 'SignIn'>;
}

const SignIn: React.FC<SignInProps> = () => {
	return (
		<View>
			<Text style={{color: 'black'}}>SignIn screen</Text>
		</View>
	);
};

export default SignIn;
