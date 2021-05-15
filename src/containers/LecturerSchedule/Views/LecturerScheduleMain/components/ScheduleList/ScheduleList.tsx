import {firebase} from '@react-native-firebase/auth';
import Typography from 'components/Typography';
import {RTDatabase} from 'helpers/firebase';
import {createStyleSheet, usePipedStateById, useTheme} from 'hooks';
import moment from 'moment';
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Badge, Divider, ListItem} from 'react-native-elements';
import {Card} from 'react-native-paper';
import {ScheduleListItem} from '../../LecturerScheduleMain';
import Icon from 'react-native-vector-icons/FontAwesome5';

export interface ScheduleList {
	schedules: ScheduleListItem[];
}

const useStyles = createStyleSheet(theme => ({
	headerCard: {
		padding: theme.spacing(1)
	},
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

	const group = usePipedStateById(groupController, schedule.groupId);
	const lesson = usePipedStateById(lessonController, schedule.lessonId);
	const faculty = usePipedStateById(facultyController, group?.facultyId);

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
			<View style={styles.listContentWrapper}>
				<Typography style={styles.lessonText} numberOfLines={1}>
					{lesson?.title}
				</Typography>
				<Typography style={styles.lessonText} secondary numberOfLines={1}>{`${group?.title || ''} - ${
					faculty?.title || ''
				}`}</Typography>
			</View>
		</ListItem>
	);
};

const stickyHeader = [0];

const ScheduleList = ({schedules}: ScheduleList) => {
	const styles = useStyles();
	return (
		<FlatList
			stickyHeaderIndices={stickyHeader}
			ListHeaderComponent={
				<View>
					<Card style={styles.headerCard}>
						<Typography h1 alignCenter>
							Schedule list
						</Typography>
					</Card>
					<Divider />
				</View>
			}
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
