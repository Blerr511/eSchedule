import {createStyleSheet} from 'hooks';
import React, {ReactNode} from 'react';
import {TextProps, Text} from 'react-native';

const useStyles = createStyleSheet(theme => ({
	text: {color: 'black'},
	h1: {
		fontSize: theme.typography.fontSize.extraLarge
	},
	h2: {
		fontSize: theme.typography.fontSize.extraLarge
	},
	h3: {
		fontSize: theme.typography.fontSize.large,
		marginVertical: theme.spacing(3)
	},
	h4: {
		fontSize: theme.typography.fontSize.large,
		marginVertical: theme.spacing(1)
	},
	bold: {
		fontWeight: 'bold'
	}
}));

export interface TypographyProps extends TextProps {
	children: ReactNode;
	h1?: boolean;
	h2?: boolean;
	h3?: boolean;
	h4?: boolean;
	bold?: boolean;
}

const Typography = ({children, style, h1, h2, h3, h4, bold, ...props}: TypographyProps) => {
	const styles = useStyles();

	return (
		<Text
			{...props}
			style={[
				styles.text,
				bold && styles.bold,
				h1 && styles.h1,
				h2 && styles.h2,
				h3 && styles.h3,
				h4 && styles.h4,
				style
			]}>
			{children}
		</Text>
	);
};

export default Typography;
