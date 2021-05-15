import {createStyleSheet} from 'hooks';
import React, {PropsWithChildren} from 'react';
import {View, ViewProps} from 'react-native';

const useStyles = createStyleSheet({row: {flex: 1, alignSelf: 'stretch', flexDirection: 'row'}});

const Row = ({style, children, ...props}: PropsWithChildren<ViewProps>) => {
	const styles = useStyles();
	return (
		<View style={[styles.row, style]} {...props}>
			{children}
		</View>
	);
};

export default Row;
