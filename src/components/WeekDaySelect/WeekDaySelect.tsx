import {createStyleSheet} from 'hooks';
import React, {useCallback, useState} from 'react';
import {Text, TextStyle, TouchableOpacity, View, ViewStyle} from 'react-native';

export interface WeekDay {
	value: number;
	label: string;
	style?: ViewStyle;
	textStyle?: TextStyle;
	disabled?: boolean;
}

const DAYS: WeekDay[] = [
	{
		value: 1,
		label: 'MO'
	},
	{value: 2, label: 'TU'},
	{value: 3, label: 'WE'},
	{value: 4, label: 'TH'},
	{value: 5, label: 'FR'},
	{
		value: 6,
		label: 'SA',
		textStyle: {
			fontWeight: 'bold'
		}
	},
	{
		value: 7,
		label: 'SU',
		textStyle: {
			fontWeight: 'bold'
		},
		disabled: true
	}
];

const useStyles = createStyleSheet(theme => ({
	container: {
		display: 'flex',
		flexDirection: 'row'
	},
	dayBtn: {
		padding: 7.5,
		backgroundColor: theme.pallet.background.secondary,
		height: 35,
		width: 35,
		borderRadius: 30,
		marginHorizontal: theme.spacing(0.5),
		marginVertical: theme.spacing(0.25),
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	smallBtn: {
		borderRadius: 30,
		marginHorizontal: theme.spacing(0.25),
		height: 25,
		width: 25,
		padding: 4.5
	},
	dayBtnText: {
		color: theme.pallet.primary,
		fontWeight: '600'
	},
	dayBtnTextActive: {color: theme.pallet.tertiary},
	dayBtnActive: {
		backgroundColor: theme.pallet.primary
	},
	dayBtnDisabled: {
		backgroundColor: theme.pallet.background.tertiary
	},
	dayTextDisabled: {},
	smallText: {
		fontSize: 10
	}
}));

interface DayProps extends WeekDay {
	onSelect: (day: WeekDay) => void;
	selected: boolean;
	style?: ViewStyle;
	textStyle?: ViewStyle;
	size?: 'small' | 'default';
}

const Day = ({label, value, disabled, onSelect, selected, style, textStyle, size}: DayProps) => {
	const handlePress = useCallback(() => {
		onSelect({label, value});
	}, [label, onSelect, value]);

	const styles = useStyles();

	return (
		<TouchableOpacity
			key={value}
			onPress={handlePress}
			style={[
				styles.dayBtn,
				selected && styles.dayBtnActive,
				disabled && styles.dayBtnDisabled,
				size === 'small' && styles.smallBtn,
				style
			]}
			disabled={disabled}>
			<Text
				style={[
					styles.dayBtnText,
					selected && styles.dayBtnTextActive,
					disabled && styles.dayTextDisabled,
					size === 'small' && styles.smallText,
					textStyle
				]}>
				{label}
			</Text>
		</TouchableOpacity>
	);
};

export interface WeekDaySelectProps {
	containerStyle?: ViewStyle;
	onChange?: (day: WeekDay[]) => void;
	value?: WeekDay[];
	size?: 'small' | 'default';
}

const WeekDaySelect = ({containerStyle, onChange, value, size = 'default'}: WeekDaySelectProps) => {
	const styles = useStyles();

	const [days, setDays] = useState<WeekDay[]>([]);

	const handleSelect = useCallback(
		(day: WeekDay) => {
			const i = days.findIndex(d => d.value === day.value);
			const newDays = [...days];
			if (i > -1) newDays.splice(i, 1);
			else newDays.push(day);

			onChange && onChange(newDays);

			setDays(newDays);
		},
		[days, onChange]
	);

	return (
		<View style={[styles.container, containerStyle]}>
			{DAYS.map(day => {
				return (
					<Day
						key={day.value}
						label={day.label}
						value={day.value}
						disabled={day.disabled}
						style={day.style}
						textStyle={day.textStyle}
						onSelect={handleSelect}
						selected={(value || days).findIndex(v => v.value === day.value) > -1}
						size={size}
					/>
				);
			})}
		</View>
	);
};

export default WeekDaySelect;
