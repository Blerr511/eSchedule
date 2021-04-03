import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {loggedIn} from 'store/selectors/auth';

import HomeScreen from './HomeScreen';
import {SignIn, SignUp} from './SignScreen';
import {RootStackParamList} from './types';

const Stack = createStackNavigator<RootStackParamList>();

export interface MainViewProps {}

const MainView: React.FC<MainViewProps> = () => {
	const isLoggedIn = useSelector(loggedIn);

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName={isLoggedIn ? 'HomeScreen' : 'SignIn'} headerMode="none">
				{isLoggedIn ? (
					<Stack.Screen name="HomeScreen" component={HomeScreen} />
				) : (
					<>
						<Stack.Screen name="SignIn" component={SignIn} />
						<Stack.Screen name="SignUp" component={SignUp} />
					</>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default MainView;
