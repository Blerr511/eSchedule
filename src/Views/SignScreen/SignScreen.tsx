import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import SignIn from './SignIn';
import SignUp from './SignUp';

const Tab = createMaterialTopTabNavigator();

const SignScreen = () => {
	return (
		<Tab.Navigator tabBar={() => null}>
			<Tab.Screen name="SignIn" component={SignIn} />
			<Tab.Screen name="SignUp" component={SignUp} />
		</Tab.Navigator>
	);
};

export default SignScreen;
