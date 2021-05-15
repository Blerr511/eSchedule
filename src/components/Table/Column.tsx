import {createStyleSheet} from 'hooks';
import React, {PropsWithChildren} from 'react';
import {View, ViewProps} from 'react-native';

const useStyles = createStyleSheet({col: {flex: 1, alignSelf: 'stretch'}});

const Column = ({style, children, ...props}: PropsWithChildren<ViewProps>) => {
	const styles = useStyles();
	return (
		<View style={[styles.col, style]} {...props}>
			{children}
		</View>
	);
};

export default Column;
