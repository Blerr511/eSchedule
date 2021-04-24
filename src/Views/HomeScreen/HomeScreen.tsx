import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStyleSheet, useTheme} from 'hooks';
import {CalendarIcon, SettingsIcon, UndefinedIcon} from './icons';

const useStyles = createStyleSheet(theme => ({
	bar: {
		backgroundColor: theme.pallet.background.primary
	}
}));

const Tab = createMaterialBottomTabNavigator();

const T = () => null;

const HomeScreen = () => {
	const styles = useStyles();
	const theme = useTheme();
	console.log('render')
	return (
		<Tab.Navigator
			barStyle={styles.bar}
			screenOptions={{
				tabBarColor: theme.typography.color.primary
			}}>
			<Tab.Screen name="Calendar" component={T} options={{tabBarIcon: CalendarIcon}} />
			<Tab.Screen name="Undefined" component={T} options={{tabBarIcon: UndefinedIcon}} />
			<Tab.Screen name="Settings" component={T} options={{tabBarIcon: SettingsIcon}} />
		</Tab.Navigator>
	);
};

export default HomeScreen;
