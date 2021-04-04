import {createStyleSheet} from 'hooks/useTheme';
import React, {ReactNode, useMemo} from 'react';
import {StyleProp, Text, TextStyle, TouchableOpacity, TouchableOpacityProps} from 'react-native';

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
	}
}));

export interface ButtonProps extends TouchableOpacityProps {
	text?: string;
	textStyles?: StyleProp<TextStyle>;
	children?: ReactNode;
	type?: 'filled' | 'text' | 'bordered';
}

const Button = ({text, style, textStyles, type = 'filled', children, ...props}: ButtonProps) => {
	const styles = useStyles();
	const filled = type === 'filled';
	const bordered = type === 'bordered';

	return (
		<TouchableOpacity
			style={[styles.container, filled && styles.filled, bordered && styles.bordered, style]}
			{...props}>
			<Text style={[styles.text, filled && styles.filledText, textStyles]}>{text}</Text>
			{children}
		</TouchableOpacity>
	);
};

export default Button;
