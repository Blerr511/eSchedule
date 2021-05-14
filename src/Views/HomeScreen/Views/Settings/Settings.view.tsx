import StudentSettings from 'containers/StudentSettings';
import {useRole} from 'hooks';
import React from 'react';
import {View} from 'react-native';

const SettingsView = () => {
	const role = useRole();

	if (role === 'student') return <StudentSettings />;

	return <View />;
};

export default SettingsView;
