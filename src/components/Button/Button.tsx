import {createStyleSheet} from 'hooks/useTheme';
import React, {ReactNode} from 'react';
import {
	StyleProp,
	Text,
	TextStyle,
	TouchableOpacity,
	TouchableOpacityProps,
	View,
	ViewStyle
} from 'react-native';

const useStyles = createStyleSheet(theme => ({
	container: {
		backgroundColor: 'transparent',
		paddingHorizontal: theme.spacing(2),
		paddingVertical: theme.spacing(1),
		borderRadius: theme.shape.borderRadius
	},
	bordered: {
		borderWidth: 2,
		borderColor: theme.pallet.primary
	},
	filled: {
		backgroundColor: theme.pallet.primary
	},
	filledText: {
		color: theme.typography.color.secondary
	},
	text: {
		color: theme.pallet.primary,
		fontSize: theme.typography.fontSize.medium,
		textAlign: 'center'
	},
	disabled: {opacity: 0.6},
	roundedBtn: {
		borderRadius: 100,
		paddingVertical: theme.spacing(1),
		paddingHorizontal: theme.spacing(1)
	}
}));

export interface ButtonProps extends TouchableOpacityProps {
	text?: string | Element;
	textStyles?: StyleProp<TextStyle>;
	children?: ReactNode;
	containerStyles?: StyleProp<ViewStyle>;
	type?: 'filled' | 'text' | 'bordered';
	rounded?: boolean;
}

const Button = ({
	text,
	style,
	textStyles,
	containerStyles,
	type = 'filled',
	children,
	disabled,
	rounded,
	...props
}: ButtonProps) => {
	const styles = useStyles();
	const filled = type === 'filled';
	const bordered = type === 'bordered';
	return (
		<View style={[disabled && styles.disabled, containerStyles]}>
			<TouchableOpacity
				style={[
					styles.container,
					filled && styles.filled,
					bordered && styles.bordered,
					rounded && styles.roundedBtn,
					style
				]}
				disabled={disabled}
				{...props}>
				{!!text && <Text style={[styles.text, filled && styles.filledText, textStyles]}>{text}</Text>}
				{children}
			</TouchableOpacity>
		</View>
	);
};

export default Button;
