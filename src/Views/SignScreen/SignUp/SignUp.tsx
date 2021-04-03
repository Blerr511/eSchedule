import * as React from 'react';
import {Text, View} from 'react-native';

export interface SignUpProps {}

const SignUp: React.FC<SignUpProps> = () => {
	return (
		<View>
			<Text style={{color: 'black'}}>SignUp screen</Text>
		</View>
	);
};

export default SignUp;
