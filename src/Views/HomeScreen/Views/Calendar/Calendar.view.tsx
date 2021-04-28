import React from 'react';
import LecturerCalendar from 'containers/LecturerCalendar';
import StudentCalendar from 'containers/StudentCalendar';
import {useRole} from 'hooks';

const CalendarView = () => {
	const role = useRole();

	if (role === 'lecturer') return <LecturerCalendar />;
	else if (role === 'student') return <StudentCalendar />;

	return null;
};

export default CalendarView;
