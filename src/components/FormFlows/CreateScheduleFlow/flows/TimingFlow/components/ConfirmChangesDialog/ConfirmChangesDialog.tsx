import Button from 'components/Button';
import ConfirmDialog from 'components/ConfirmDialog';
import Typography from 'components/Typography';
import WeekDaySelect, {WeekDay} from 'components/WeekDaySelect/WeekDaySelect';
import {DEFAULT_DATE_FORMAT, DEFAULT_TIME_FORMAT} from 'constants/dateFormats';
import {IGroup} from 'helpers/firebase/RTDatabase/controllers/GroupController.ts';
import {ILesson} from 'helpers/firebase/RTDatabase/controllers/LessonController';
import {createStyleSheet, useTheme} from 'hooks';
import moment from 'moment';
import React from 'react';
import {Linking, ToastAndroid, View} from 'react-native';

export interface ConfirmChangesDialogProps<T extends boolean = boolean> {
	isVisible: boolean;
	onCancel: () => void;
	onOk: () => void;
	group?: IGroup | null;
	lesson?: ILesson | null;
	singleTime: T;
	time: Date;
	date?: Date;
	weekDays?: WeekDay[];
	link?: string;
	description?: string;
	isExam?: boolean;
}

const useStyles = createStyleSheet(theme => ({
	container: {
		backgroundColor: 'white',
		flex: 1
	},
	title: {
		color: 'black',
		marginBottom: theme.spacing(4)
	},
	row: {
		display: 'flex',
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderBottomColor: theme.pallet.border.secondary
	},
	firstRow: {
		borderTopWidth: 1,
		borderTopColor: theme.pallet.border.secondary
	},
	col: {
		flex: 1,
		paddingVertical: theme.spacing(1),
		paddingHorizontal: theme.spacing(2),
		borderLeftWidth: 1,
		borderLeftColor: theme.pallet.border.secondary,
		display: 'flex',
		justifyContent: 'center'
	},
	col2: {
		flex: 2,
		borderRightWidth: 1,
		borderRightColor: theme.pallet.border.secondary
	},
	text: {
		color: 'black',
		fontSize: theme.typography.fontSize.medium
	},
	tableContainer: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column'
	}
}));

const ConfirmChangesDialog = ({
	isVisible,
	onCancel,
	onOk,
	group,
	lesson,
	singleTime,
	date,
	time,
	weekDays,
	link,
	description,
	isExam
}: ConfirmChangesDialogProps) => {
	const styles = useStyles();

	return (
		<ConfirmDialog
			isVisible={isVisible}
			onCancel={onCancel}
			onOk={onOk}
			title={'Accept schedule'}
			containerStyle={styles.container}
			titleStyle={styles.title}>
			<View style={styles.tableContainer}>
				<View style={[styles.row, styles.firstRow]}>
					<View style={styles.col}>
						<Typography style={styles.text}>Group</Typography>
					</View>
					<View style={[styles.col, styles.col2]}>
						<Typography style={styles.text}>{group?.title}</Typography>
					</View>
				</View>
				<View style={styles.row}>
					<View style={styles.col}>
						<Typography style={styles.text}>Lesson</Typography>
					</View>
					<View style={[styles.col, styles.col2]}>
						<Typography style={styles.text}>{lesson?.title}</Typography>
					</View>
				</View>
				<View style={styles.row}>
					<View style={styles.col}>
						<Typography style={styles.text}>{singleTime ? 'At' : 'Every'} </Typography>
					</View>
					<View style={[styles.col, styles.col2]}>
						{singleTime ? (
							<Button text={moment(date).format(DEFAULT_DATE_FORMAT)} type="bordered" />
						) : (
							<WeekDaySelect
								value={weekDays}
								size="small"
								containerStyle={{
									flexWrap: 'wrap'
								}}
							/>
						)}
					</View>
				</View>
				<View style={styles.row}>
					<View style={styles.col}>
						<Typography style={styles.text}>Time</Typography>
					</View>
					<View style={[styles.col, styles.col2]}>
						<Button
							text={`${moment(time).format(DEFAULT_TIME_FORMAT)} PM`}
							style={{marginTop: 2}}
							type="bordered"
						/>
					</View>
				</View>
				{singleTime && isExam && (
					<View style={styles.row}>
						<View style={[styles.col, {display: 'flex', justifyContent: 'center'}]}>
							<Typography style={styles.text}>Exam</Typography>
						</View>
						<View style={[styles.col, styles.col2]}>
							<Typography style={[styles.text, {overflow: 'hidden'}]} numberOfLines={4}>
								{'Yes'}
							</Typography>
						</View>
					</View>
				)}
				{!!link && (
					<View style={styles.row}>
						<View style={styles.col}>
							<Typography style={styles.text}>Link </Typography>
						</View>
						<View style={[styles.col, styles.col2]}>
							<Button
								text={link}
								type="text"
								onPress={() =>
									Linking.openURL(link).catch(err => {
										if (err?.message)
											ToastAndroid.show(err?.message?.split(':')[0], 3000);
									})
								}
								style={{paddingHorizontal: 0, paddingVertical: 0}}
								textStyles={{textDecorationLine: 'underline', textAlign: 'left'}}
							/>
						</View>
					</View>
				)}
				{!!description && (
					<View style={styles.row}>
						<View style={[styles.col, {display: 'flex', justifyContent: 'center'}]}>
							<Typography style={styles.text}>About lesson</Typography>
						</View>
						<View style={[styles.col, styles.col2]}>
							<Typography style={[styles.text, {overflow: 'hidden'}]} numberOfLines={4}>
								{description}
							</Typography>
						</View>
					</View>
				)}
			</View>
		</ConfirmDialog>
	);
};

export default ConfirmChangesDialog;
