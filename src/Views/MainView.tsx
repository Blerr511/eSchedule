import * as React from 'react';

import SignScreen from './SignScreen';
import HomeScreen from './HomeScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {loggedIn} from 'store/selectors/auth';

const Stack = createStackNavigator();

export interface MainViewProps {}

const MainView: React.FC<MainViewProps> = () => {
	const isLoggedIn = useSelector(loggedIn);

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
