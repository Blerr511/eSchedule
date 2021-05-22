import {useTheme} from 'hooks';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ProgressBar} from 'react-native-paper';

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'red',
		flex: 1,
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-end'
	},
	progress: {
		backgroundColor: 'white'
	}
});

const Progress = () => {
	const theme = useTheme();
	return (
		<View style={styles.container}>
			<ProgressBar indeterminate color={theme.pallet.primary} style={styles.progress} />
		</View>
	);
};

export default Progress;
