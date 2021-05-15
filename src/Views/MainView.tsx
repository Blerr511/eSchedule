import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {auth} from 'store/selectors';

import HomeScreen from './HomeScreen';
import SignScreen from './SignScreen';

import {RootStackParamList} from './types';
import {RootState} from 'store/store';
import Loading from 'components/Loading';

const Stack = createStackNavigator<RootStackParamList>();

const MainView = () => {
	const isLoggedIn = useSelector(auth.loggedIn);
	const loading = useSelector((state: RootState) => state.auth.signIn.loading);

	if (loading) return <Loading fullScreen />;

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName={isLoggedIn ? 'HomeScreen' : 'SignScreen'} headerMode="none">
				{isLoggedIn ? (
					<Stack.Screen name="HomeScreen" component={HomeScreen} />
				) : (
					<Stack.Screen name="SignScreen" component={SignScreen} />
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default MainView;
