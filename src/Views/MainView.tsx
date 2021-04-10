import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {auth} from 'store/selectors';

import HomeScreen from './HomeScreen';
import SignScreen from './SignScreen';

import {RootStackParamList} from './types';

const Stack = createStackNavigator<RootStackParamList>();

export interface MainViewProps {}

const MainView: React.FC<MainViewProps> = () => {
	const isLoggedIn = useSelector(auth.loggedIn);

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
