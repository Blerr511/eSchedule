import {createStyleSheet} from 'hooks';
import React, {PropsWithChildren} from 'react';
import {View, ViewProps} from 'react-native';
import Column from './Column';
import Row from './Row';

const useStyles = createStyleSheet({table: {flex: 1, alignItems: 'center', justifyContent: 'center'}});

const Table = ({style, children, ...props}: PropsWithChildren<ViewProps>) => {
	const styles = useStyles();
	return (
		<View style={[styles.table, style]} {...props}>
			{children}
		</View>
	);
};

Table.Row = Row;
Table.Column = Column;

export default Table;
