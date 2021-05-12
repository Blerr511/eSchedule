import {NavigationProp, RouteProp} from '@react-navigation/core';
import Typography from 'components/Typography';
import WeekDaySelect from 'components/WeekDaySelect';
import {
	createStyleSheet,
	useControlledInput,
	usePipedState,
	usePipedStateById,
	useRealTimeData,
	useTheme
} from 'hooks';
import React, {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
	GestureResponderEvent,
	KeyboardAvoidingView,
	ScrollView,
	Text,
	TouchableOpacity,
	View
} from 'react-native';
import DatePicker from '@react-native-community/datetimepicker';
import {CheckBox, ListItem} from 'react-native-elements';
import moment from 'moment';
import {ScheduleFlow, ScheduleFlowParamList} from '../types';
import Button from 'components/Button';
import {DEFAULT_DATE_FORMAT} from 'constants/dateFormats';
import TextField from 'components/TextField';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {WeekDay} from 'components/WeekDaySelect/WeekDaySelect';
import ConfirmDialog from 'components/ConfirmDialog';
import app, {RTDatabase} from 'helpers/firebase';
import {IGroup} from 'helpers/firebase/RTDatabase/controllers/GroupController.ts';
import {ILesson} from 'helpers/firebase/RTDatabase/controllers/LessonController';
import ConfirmChangesDialog from './components/ConfirmChangesDialog';

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

	const group = usePipedStateById(groupController, groupId);
	const lesson = usePipedStateById(lessonController, lessonId);

	const styles = useStyles();
	const theme = useTheme();

	const [singleTime, setSingleTime] = useState(false);
	const [weekDays, setWeekDays] = useState<WeekDay[]>([]);
	const [date, setDate] = useState(new Date());
	const [time, setTime] = useState(new Date());
	const [link, onLinkChange] = useControlledInput('');
	const [description, onDescriptionChange] = useControlledInput('');

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

	const handleWeekChange = (day: WeekDay) => {
		setWeekDays(v => [...v, day]);
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
				onOk={console.log}
				singleTime={singleTime}
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
										{moment(time).format('HH : MM')}
									</Typography>{' '}
									PM
								</Typography>
							}
							textStyles={styles.time}
							onPress={handleShowTimePicker}></Button>
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
