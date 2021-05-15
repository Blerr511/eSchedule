import moment from 'moment';

export const getNextByWeekDay = (dayINeed: number) => {
	const today = moment().isoWeekday();

	// if we haven't yet passed the day of the week that I need:
	if (today <= dayINeed) {
		// then just give me this week's instance of that day
		return moment().isoWeekday(dayINeed);
	} else {
		// otherwise, give me *next week's* instance of that same day
		return moment().add(1, 'weeks').isoWeekday(dayINeed);
	}
};
