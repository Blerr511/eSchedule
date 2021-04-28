import React from 'react';
import LecturerSchedule from 'containers/LecturerSchedule';
import StudentSchedule from 'containers/StudentSchedule';
import {useRole} from 'hooks';

const ScheduleView = () => {
	const role = useRole();

	if (role === 'student') return <StudentSchedule />;
	else if (role === 'lecturer') return <LecturerSchedule />;

	return null;
};

export default ScheduleView;
