import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Tab = createMaterialBottomTabNavigator();

const T = () => null;

const CalendarIcon = () => <Icon name="calendar" />;

const MainMenu = () => {
	return (
		<Tab.Navigator>
			<Tab.Screen
				name="Calendar"
				component={T}
				options={{
					tabBarIcon: CalendarIcon
				}}
			/>
			<Tab.Screen name="Undefined" component={T} />
			<Tab.Screen name="Settings" component={T} />
		</Tab.Navigator>
	);
};

export default MainMenu;
