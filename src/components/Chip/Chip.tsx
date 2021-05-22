import Typography from 'components/Typography';
import {createStyleSheet} from 'hooks';
import React, {PropsWithChildren} from 'react';
import {GestureResponderEvent, Pressable, View, ViewStyle} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export interface ChipProps {
	size?: 'small' | 'medium' | 'big';
	rounded?: boolean;
	variant?: 'filled' | 'bordered' | 'text';
	style?: ViewStyle;
	onPress?: (event: GestureResponderEvent) => void;
}

const useVariantStyles = createStyleSheet(theme => ({
	bordered: {
		borderWidth: 2,
		borderColor: theme.pallet.primary
	},
	filled: {
		backgroundColor: theme.pallet.primary
	},
	text: {}
}));

const useSizeStyles = createStyleSheet(theme => ({
	small: {
		paddingHorizontal: theme.spacing(0.5),
		paddingVertical: theme.spacing(0.25)
	},
	medium: {
		paddingHorizontal: theme.spacing(1),
		paddingVertical: theme.spacing(0.5)
	},
	big: {
		paddingHorizontal: theme.spacing(2),
		paddingVertical: theme.spacing(1)
	}
}));

const useStyles = createStyleSheet(theme => ({
	container: {
		backgroundColor: 'transparent',
		borderRadius: theme.shape.borderRadius
	},
	rounded: {
		borderRadius: 50
	},
	filledText: {
		color: theme.typography.color.secondary
	},
	disabled: {opacity: 0.6},
	roundedBtn: {
		borderRadius: 100,
		paddingVertical: theme.spacing(1),
		paddingHorizontal: theme.spacing(1)
	},
	text: {
		color: 'white'
	}
}));

const Chip = ({
	variant = 'filled',
	children,
	rounded,
	size = 'medium',
	style,
	onPress
}: PropsWithChildren<ChipProps>) => {
	const styles = useStyles();
	const sizes = useSizeStyles();
	const variants = useVariantStyles();

	return (
		<TouchableOpacity
			activeOpacity={onPress ? undefined : 1}
			style={[styles.container, sizes[size], variants[variant], rounded && styles.rounded, style]}>
			{typeof children === 'string' ? (
				<Typography style={styles.text}>{children}</Typography>
			) : (
				children
			)}
		</TouchableOpacity>
	);
};

export default Chip;
