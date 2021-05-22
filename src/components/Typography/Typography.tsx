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
	h5: {
		fontSize: theme.typography.fontSize.medium
	},
	bold: {
		fontWeight: 'bold'
	},
	noMargin: {
		marginVertical: 0
	},
	alignCenter: {
		textAlign: 'center'
	},
	secondaryText: {
		color: '#00000090'
	}
}));

export interface TypographyProps extends TextProps {
	children: ReactNode;
	h1?: boolean;
	h2?: boolean;
	h3?: boolean;
	h4?: boolean;
	h5?: boolean;
	bold?: boolean;
	margin?: boolean;
	alignCenter?: boolean;
	secondary?: boolean;
}

const Typography = ({
	children,
	style,
	h1,
	h2,
	h3,
	h4,
	h5,
	bold,
	margin = true,
	alignCenter,
	secondary,
	...props
}: TypographyProps) => {
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
				h5 && styles.h5,
				margin === false && styles.noMargin,
				alignCenter && styles.alignCenter,
				secondary && styles.secondaryText,
				style
			]}>
			{children}
		</Text>
	);
};

export default Typography;
