import LecturerSettings from 'containers/LecturerSettings';
import StudentSettings from 'containers/StudentSettings';
import {useRole} from 'hooks';
import React from 'react';
import {View} from 'react-native';

const SettingsView = () => {
	const role = useRole();

	if (role === 'student') return <StudentSettings />;
	else if (role === 'lecturer') return <LecturerSettings />;

	return <View />;
};

export default SettingsView;
