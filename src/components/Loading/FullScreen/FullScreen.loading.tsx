import {createStyleSheet, useTheme} from 'hooks';
import React from 'react';
import {View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

const useStyles = createStyleSheet(theme => ({
	container: {
		flex: 1,
		width: '100%',
		height: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: theme.pallet.background.primary
	}
}));

const FullScreenLoading = () => (
	<View style={useStyles().container}>
		<ActivityIndicator color={useTheme().pallet.primary} />
	</View>
);

export default FullScreenLoading;
