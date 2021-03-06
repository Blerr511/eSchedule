import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStyleSheet, useRole, useTheme} from 'hooks';
import {CalendarIcon, SettingsIcon, ListIcon} from './icons';
import {CalendarView, ScheduleView, SettingsView} from './Views';
import Loading from 'components/Loading';
import FirebasePopup from 'containers/FirebasePopup';

const useStyles = createStyleSheet(theme => ({
	bar: {
		backgroundColor: theme.pallet.background.primary
	}
}));

const Tab = createMaterialBottomTabNavigator();

const HomeScreen = () => {
	const styles = useStyles();
	const theme = useTheme();

	const role = useRole();

	if (!role) return <Loading fullScreen />;

	return (
		<>
			<FirebasePopup />
			<Tab.Navigator
				barStyle={styles.bar}
				screenOptions={{
					tabBarColor: theme.typography.color.primary
				}}>
				<Tab.Screen name="Calendar" component={CalendarView} options={{tabBarIcon: CalendarIcon}} />
				<Tab.Screen name="Schedule" component={ScheduleView} options={{tabBarIcon: ListIcon}} />
				<Tab.Screen name="Settings" component={SettingsView} options={{tabBarIcon: SettingsIcon}} />
			</Tab.Navigator>
		</>
	);
};

export default HomeScreen;
