import Typography from 'components/Typography';
import {RTDatabase} from 'helpers/firebase';
import {createStyleSheet, usePipedStateById} from 'hooks';
import moment from 'moment';
import React from 'react';
import {FlatList, Linking, Pressable, ToastAndroid, View} from 'react-native';
import {ListItem} from 'react-native-elements';
import {ScheduleListItem} from '../../LecturerScheduleMain';
import Header from 'components/Header';

export interface ScheduleList {
	schedules: ScheduleListItem[];
}

const useStyles = createStyleSheet(theme => ({
	listContentWrapper: {
		display: 'flex',
		flex: 1,
		flexDirection: 'column',
		backgroundColor: theme.pallet.primary,
		padding: theme.spacing(1),
		borderRadius: 5
	},
	lessonText: {
		color: 'white'
	},
	dateContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 50,
		width: 50,
		height: 50,
		padding: theme.spacing(1)
	},
	dateContainerExam: {},
	dateExam: {
		color: 'white',
		backgroundColor: theme.pallet.secondary,
		fontSize: 20
	},
	dateText: {
		width: 40,
		height: 40,
		borderRadius: 50,
		textAlign: 'center',
		textAlignVertical: 'center'
	},
	dateWeekDay: {color: 'black'},
	dateWeekDayExam: {
		color: theme.pallet.secondary
	},
	link: {
		textDecorationLine: 'underline'
	}
}));

const groupController = new RTDatabase().group;
const lessonController = new RTDatabase().lesson;
const facultyController = new RTDatabase().faculty;

const RenderItem = ({schedule}: {schedule: ScheduleListItem}) => {
	const styles = useStyles();

	const triggerDate = moment.unix(schedule.triggerDate);
	const weekDay = triggerDate.format('ddd');
	const date = triggerDate.date();

	const [group] = usePipedStateById(groupController, schedule.groupId);
	const [lesson] = usePipedStateById(lessonController, schedule.lessonId);
	const [faculty] = usePipedStateById(facultyController, group?.facultyId);

	return (
		<ListItem>
			<View style={[styles.dateContainer, schedule.isExam && styles.dateContainerExam]}>
				<Typography
					alignCenter
					secondary
					style={[styles.dateWeekDay, schedule.isExam && styles.dateWeekDayExam]}>
					{weekDay}
				</Typography>
				<Typography
					h2
					margin={false}
					alignCenter
					style={[styles.dateText, schedule.isExam && styles.dateExam]}>
					{date}
				</Typography>
			</View>
			<Pressable
				style={styles.listContentWrapper}
				onPress={
					schedule?.link
						? () =>
								Linking.openURL(String(schedule?.link)).catch(err => {
									ToastAndroid.show(err?.message || 'Failed to open link', 3000);
								})
						: undefined
				}>
				<View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
					<Typography
						style={[styles.lessonText, !!schedule?.link && styles.link]}
						numberOfLines={1}>
						{lesson?.title}
					</Typography>
					<Typography style={styles.lessonText} numberOfLines={1}>
						{schedule.time}
					</Typography>
				</View>
				<Typography style={styles.lessonText} secondary numberOfLines={1}>{`${group?.title || ''} - ${
					faculty?.title || ''
				}`}</Typography>
			</Pressable>
		</ListItem>
	);
};

const stickyHeader = [0];

const ScheduleList = ({schedules}: ScheduleList) => {
	return (
		<FlatList
			stickyHeaderIndices={stickyHeader}
			ListHeaderComponent={<Header>Schedule list</Header>}
			style={{flex: 1}}
			data={schedules}
			keyExtractor={sc => String(sc.uid) + String(sc.triggerDate)}
			renderItem={({item}) => {
				return <RenderItem schedule={item} />;
			}}
		/>
	);
};

export default ScheduleList;
