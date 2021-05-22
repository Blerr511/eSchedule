import React from 'react';
import LecturerCalendarStack from 'containers/LecturerCalendarStack';
import StudentCalendarStack from 'containers/StudentCalendarStack';
import {useRole} from 'hooks';

const CalendarView = () => {
	const role = useRole();

	if (role === 'lecturer') return <LecturerCalendarStack />;
	else if (role === 'student') return <StudentCalendarStack />;

	return null;
};

export default CalendarView;
