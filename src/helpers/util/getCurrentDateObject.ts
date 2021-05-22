import moment from 'moment';
import {DateObject} from 'react-native-calendars';

const CALENDER_FORMAT = 'YYYY-MM-DD';

export const getCurrentDate = (): DateObject => {
	const now = moment();

	return {
		dateString: now.format(CALENDER_FORMAT),
		day: now.day(),
		month: now.month() + 1,
		timestamp: now.unix() * 1000,
		year: now.year()
	};
};
