import {createStyleSheet} from 'hooks/useTheme';
import React, {ReactNode} from 'react';
import {StyleProp, Text, TextStyle, TouchableOpacity, TouchableOpacityProps} from 'react-native';

const useStyles = createStyleSheet(theme => ({
	container: {
		paddingHorizontal: theme.spacing(2),
		paddingVertical: theme.spacing(1),
		borderRadius: theme.shape.borderRadius,
		backgroundColor: theme.pallet.primary
	},
	text: {
		color: theme.typography.color.secondary,
		fontSize: theme.typography.fontSize.medium,
		textAlign: 'center'
	}
}));

export interface ButtonProps extends TouchableOpacityProps {
	text?: string;
	textStyles?: StyleProp<TextStyle>;
	children?: ReactNode;
}

const Button = ({text, style, textStyles, children, ...props}: ButtonProps) => {
	const styles = useStyles();

	return (
		<TouchableOpacity style={style ? [styles.container, styles.container] : styles.container} {...props}>
			<Text style={textStyles ? [styles.text, textStyles] : styles.text}>{text}</Text>
			{children}
		</TouchableOpacity>
	);
};

export default Button;
