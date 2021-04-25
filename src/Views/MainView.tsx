import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {auth} from 'store/selectors';

import HomeScreen from './HomeScreen';
import SignScreen from './SignScreen';

import {RootStackParamList} from './types';
import {firebase} from '@react-native-firebase/auth';
import {RootState} from 'store/store';
import authSlice from 'store/slices/auth';
import Loading from 'components/Loading';
import services from 'services';

const Stack = createStackNavigator<RootStackParamList>();

export interface MainViewProps {}

const MainView: React.FC<MainViewProps> = () => {
	const dispatch = useDispatch();

	const isLoggedIn = useSelector(auth.loggedIn);
	const loading = useSelector((state: RootState) => state.auth.signIn.loading);

	useEffect(() => {
		return firebase.auth().onAuthStateChanged(async user => {
			if (user?.emailVerified) {
				const userInfo = await services.Auth.getMyUserInfo();
				dispatch(
					authSlice.actions.autStateChange({
						user: {email: user.email, name: user.displayName, uid: user.uid},
						userInfo
					})
				);
			} else
				dispatch(
					authSlice.actions.autStateChange({
						user: null,
						userInfo: null
					})
				);
		});
	}, [dispatch]);

	if (loading) return <Loading.FullScreen />;

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
