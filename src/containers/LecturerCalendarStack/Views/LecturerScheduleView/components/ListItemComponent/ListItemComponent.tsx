import Button from 'components/Button';
import Chip from 'components/Chip';
import Spacer from 'components/Spacer';
import Typography from 'components/Typography';
import {RTDatabase} from 'helpers/firebase';
import {ISchedule} from 'helpers/firebase/RTDatabase/controllers/ScheduleController';
import {createStyleSheet, usePipedStateById} from 'hooks';
import React from 'react';
import {ListItem} from 'react-native-elements';
import Progress from 'components/Progress';

const useStyles = createStyleSheet(theme => ({
	timeButton: {
		paddingVertical: theme.spacing(0.75)
	},
	title: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%'
	}
}));

export type ListItemComponentProps = ISchedule;

const lessonController = new RTDatabase().lesson;

const groupController = new RTDatabase().group;

const facultyController = new RTDatabase().faculty;

const ListItemComponent = ({lessonId, groupId, time, isExam}: ListItemComponentProps) => {
	const styles = useStyles();

	const [lesson] = usePipedStateById(lessonController, lessonId);
	const [group] = usePipedStateById(groupController, groupId);
	const [faculty] = usePipedStateById(facultyController, group?.facultyId);

	if (!(lesson && group && faculty))
		return (
			<ListItem>
				<ListItem.Title />
				<Progress />
			</ListItem>
		);

	return (
		<ListItem>
			<Button text={time} style={styles.timeButton} type="bordered" />
			<ListItem.Content>
				<ListItem.Title style={styles.title}>
					<Typography>{lesson.title}</Typography>
					<Spacer x={3} />
					{isExam && <Chip>Exam</Chip>}
				</ListItem.Title>
				<ListItem.Subtitle>
					<Typography secondary>{group.title}</Typography>
					<Spacer x={2} />
					<Typography secondary>{faculty.title}</Typography>
				</ListItem.Subtitle>
			</ListItem.Content>
		</ListItem>
	);
};
export default ListItemComponent;
