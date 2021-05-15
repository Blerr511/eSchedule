import Typography from 'components/Typography';
import * as React from 'react';
import {StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
	container: {flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'}
});

const Empty = ({children}: {children: React.ReactNode | string}) => {
	return (
		<View style={styles.container}>
			<Typography h5 secondary>
				{children}
			</Typography>
		</View>
	);
};

export default Empty;
