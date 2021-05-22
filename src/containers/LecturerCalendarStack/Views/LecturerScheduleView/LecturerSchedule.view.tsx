import React, {useCallback, useLayoutEffect} from 'react';
import {RouteProp} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import {LCStackRoutes, LecturerCalendarStackParamList} from 'containers/LecturerCalendarStack/types';
import {FlatList} from 'react-native';
import {usePipedState} from 'hooks';
import {RTDatabase} from 'helpers/firebase';
import {useSelector} from 'react-redux';
import {auth} from 'store/selectors';
import moment from 'moment';
import {ISchedule} from 'helpers/firebase/RTDatabase/controllers/ScheduleController';
import ListItemComponent from './components/ListItemComponent';

export interface LecturerScheduleViewProps {
	navigation: StackNavigationProp<LecturerCalendarStackParamList, LCStackRoutes.Schedule>;
	route: RouteProp<LecturerCalendarStackParamList, LCStackRoutes.Schedule>;
}

const scheduleController = new RTDatabase().schedule;

const keyExtractor = (item: ISchedule) => item.uid;

const LecturerScheduleView = ({navigation, route}: LecturerScheduleViewProps) => {
	const {dateString} = route.params;
	const user = useSelector(auth.user);

	const [scheduleList] = usePipedState(
		scheduleController,
		useCallback(
			schedule => {
				if (schedule.lecturerId === user?.uid) {
					if (schedule.singleTime) return moment(schedule.date).isSame(moment(dateString), 'date');
					else return Boolean(schedule.weekDays?.includes(moment(dateString).weekday()));
				}
				return false;
			},
			[dateString, user?.uid]
		)
	);

	const renderItem = useCallback(({item}) => {
		return <ListItemComponent {...item} />;
	}, []);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerBackTitleVisible: false,
			headerTitle: `Schedules - ${dateString}`
		});
	}, [dateString, navigation]);

	return <FlatList data={scheduleList} renderItem={renderItem} keyExtractor={keyExtractor} />;
};

export default LecturerScheduleView;
