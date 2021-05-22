import {NavigationProp, RouteProp} from '@react-navigation/core';
import Typography from 'components/Typography';
import WeekDaySelect from 'components/WeekDaySelect';
import {createStyleSheet, useControlledInput, usePipedStateById, useTheme} from 'hooks';
import React, {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {GestureResponderEvent, ScrollView, ToastAndroid, View} from 'react-native';
import DatePicker from '@react-native-community/datetimepicker';
import {CheckBox} from 'react-native-elements';
import moment from 'moment';
import {ScheduleFlow, ScheduleFlowParamList} from '../types';
import Button from 'components/Button';
import TextField from 'components/TextField';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {WeekDay} from 'components/WeekDaySelect/WeekDaySelect';
import {RTDatabase} from 'helpers/firebase';
import ConfirmChangesDialog from './components/ConfirmChangesDialog';
import {ISchedule} from 'helpers/firebase/RTDatabase/controllers/ScheduleController';
import {DBItemPayload} from 'helpers/firebase/RTDatabase/BaseController.abstract';
import {useSelector} from 'react-redux';
import {auth} from 'store/selectors';
import {DEFAULT_TIME_FORMAT} from 'constants/dateFormats';
import randomColor from 'randomcolor';

const useStyles = createStyleSheet(theme => ({
	container: {
		paddingHorizontal: theme.spacing(3),
		flex: 1
	},
	wrapper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	sectorContainer: {
		marginVertical: theme.spacing(1),
		width: '100%'
	},
	dayPickerWrapper: {
		height: 80,
		display: 'flex',
		justifyContent: 'center'
	},
	checkboxContainer: {
		margin: 0,
		marginLeft: 0,
		marginRight: 0
	},
	checkboxWrapper: {
		width: '100%',
		paddingHorizontal: 0
	},
	dateYear: {
		color: 'white',
		textAlign: 'left',
		fontSize: 20,
		opacity: 0.8
	},
	date: {
		fontSize: 28,
		color: 'white',
		textAlign: 'left',
		fontWeight: '800'
	},
	button: {
		width: '100%',
		padding: 0
	},
	time: {
		fontSize: 22,
		color: 'white',
		textAlign: 'left'
	},
	black: {
		color: 'black'
	},
	acceptIcon: {
		backgroundColor: 'transparent',
		marginRight: theme.spacing(2)
	}
}));

export interface TimingFlowProps {
	navigation: NavigationProp<ScheduleFlowParamList, ScheduleFlow.TIMING>;
	route: RouteProp<ScheduleFlowParamList, ScheduleFlow.TIMING>;
}

interface AcceptBtnProps {
	onPress: (event: GestureResponderEvent) => void;
}

const AcceptBtn = ({onPress}: AcceptBtnProps) => {
	const styles = useStyles();
	const theme = useTheme();
	return (
		<Button onPress={onPress} style={styles.acceptIcon} rounded>
			<Icon name="check" size={28} color={theme.pallet.primary} />
		</Button>
	);
};

const db = new RTDatabase();

const groupController = db.group;
const lessonController = db.lesson;

const TimingFlow = ({route, navigation}: TimingFlowProps) => {
	const {groupId, lessonId} = route.params;

	const user = useSelector(auth.user);

	const [group] = usePipedStateById(groupController, groupId);
	const [lesson] = usePipedStateById(lessonController, lessonId);

	const styles = useStyles();
	const theme = useTheme();

	const [singleTime, setSingleTime] = useState(false);
	const [weekDays, setWeekDays] = useState<WeekDay[]>([]);
	const [date, setDate] = useState(new Date());
	const [time, setTime] = useState(new Date());
	const [link, onLinkChange] = useControlledInput('');
	const [description, onDescriptionChange] = useControlledInput('');
	const [isExam, setIsExam] = useState(false);

	const [showPicker, setShowPicker] = useState(false);

	const [showTimePicker, setShowTimePicker] = useState(false);

	const [showAcceptDialog, setShowAcceptDialog] = useState(false);

	const getData = useRef(() => {
		return {groupId, lessonId, singleTime, date, weekDays, time, link, description};
	});

	useEffect(() => {
		getData.current = () => {
			return {groupId, lessonId, singleTime, date, weekDays, time, link, description};
		};
	}, [date, description, groupId, lessonId, link, singleTime, time, weekDays]);

	const handleShowAcceptDialog = useCallback(() => {
		setShowAcceptDialog(true);
	}, []);

	const handleCloseAcceptDialog = useCallback(() => {
		setShowAcceptDialog(false);
	}, []);

	const handleWeekChange = (days: WeekDay[]) => {
		setWeekDays(days);
	};

	const handleShowPicker = () => {
		setShowPicker(true);
	};

	const handleClosePicker = () => {
		setShowPicker(false);
	};

	const handleShowTimePicker = () => {
		setShowTimePicker(true);
	};

	const handleCloseTimePicker = () => {
		setShowTimePicker(false);
	};

	const handleTimePicked = (e: Event, date?: Date) => {
		if (date) {
			handleCloseTimePicker();
			setTime(date);
		}
	};

	const handleDatePicked = (e: Event, date?: Date) => {
		if (date) {
			handleClosePicker();
			setDate(date);
		}
	};

	const handleToggleSingleTime = useCallback(() => {
		setSingleTime(v => !v);
	}, []);

	const handleToggleIsExam = useCallback(() => {
		setIsExam(isExam => !isExam);
	}, []);

	const handleSaveSchedule = async () => {
		if (group && lesson && user) {
			const controller = new RTDatabase().schedule;

			let color = randomColor();

			const schedules = await controller.find();

			while (schedules.find(v => v.color === color)) {
				color = randomColor();
			}

			const schedule: DBItemPayload<ISchedule> = {
				lecturerId: user.uid,
				groupId: group.uid,
				lessonId: lesson.uid,
				date: moment(date).unix() * 1000,
				time: moment(time).format(DEFAULT_TIME_FORMAT),
				singleTime,
				weekDays: weekDays?.map(day => day.value),
				link,
				description,
				isExam,
				color
			};

			controller
				.create(schedule)
				.then(() => {
					ToastAndroid.show('Schedule success saved', 3000);
					navigation.navigate('LecturerScheduleMain');
				})
				.finally(() => {
					setShowAcceptDialog(false);
				});
		}
	};

	useLayoutEffect(() => {
		const HeaderAcceptButton = () => {
			return <AcceptBtn onPress={handleShowAcceptDialog} />;
		};
		navigation.setOptions({headerRight: HeaderAcceptButton});
	}, [handleShowAcceptDialog, navigation]);

	return (
		<>
			<ConfirmChangesDialog
				isVisible={showAcceptDialog}
				group={group}
				lesson={lesson}
				onCancel={handleCloseAcceptDialog}
				onOk={handleSaveSchedule}
				singleTime={singleTime}
				isExam={isExam}
				date={date}
				time={time}
				weekDays={weekDays}
				link={link}
				description={description}
			/>
			{showPicker && (
				<DatePicker minimumDate={new Date()} value={date} onChange={handleDatePicked} mode="date" />
			)}
			{showTimePicker && <DatePicker value={time} onChange={handleTimePicked} mode="time" />}
			<ScrollView style={styles.container}>
				<View style={styles.wrapper}>
					<Typography h3>Choose scheduling days and hour</Typography>
					<View style={styles.checkboxWrapper}>
						<CheckBox
							checkedColor={theme.pallet.primary}
							center
							title="Once"
							iconRight
							containerStyle={styles.checkboxContainer}
							checked={singleTime}
							onPress={handleToggleSingleTime}
						/>
					</View>
					<View style={[styles.sectorContainer, styles.dayPickerWrapper]}>
						{!singleTime ? (
							<WeekDaySelect onChange={handleWeekChange} value={weekDays} />
						) : (
							<Button
								style={styles.button}
								text={moment(date).format('YYYY')}
								textStyles={styles.dateYear}
								onPress={handleShowPicker}>
								<Typography style={styles.date}>
									{moment(date).format('ddd DD MMM')}
								</Typography>
							</Button>
						)}
					</View>
					<View style={[styles.sectorContainer, styles.dayPickerWrapper]}>
						<Button
							style={styles.button}
							text={
								<Typography style={styles.time}>
									At{' '}
									<Typography style={styles.time} bold>
										{moment(time).format('HH : mm')}
									</Typography>{' '}
									PM
								</Typography>
							}
							textStyles={styles.time}
							onPress={handleShowTimePicker}></Button>
					</View>
					<View style={styles.checkboxWrapper}>
						{singleTime && (
							<CheckBox
								checkedColor={theme.pallet.primary}
								center
								title="Exam"
								iconRight
								containerStyle={styles.checkboxContainer}
								checked={isExam}
								onPress={handleToggleIsExam}
							/>
						)}
					</View>
					<View style={styles.sectorContainer}>
						<TextField
							value={link}
							label="Link (optional)"
							style={styles.black}
							placeholder="Enter lesson link if exists"
							onChangeText={onLinkChange}
						/>
					</View>
					<View style={styles.sectorContainer}>
						<TextField
							value={description}
							style={styles.black}
							label="Description (optional)"
							placeholder="Lesson short description"
							onChangeText={onDescriptionChange}
						/>
					</View>
				</View>
			</ScrollView>
		</>
	);
};

export default TimingFlow;
