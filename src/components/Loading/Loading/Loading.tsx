import {createStyleSheet, useTheme} from 'hooks';
import React from 'react';
import {View, ViewStyle} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

const useStyles = createStyleSheet(theme => ({
	container: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1
	},
	fullScreen: {width: '100%', height: '100%', backgroundColor: theme.pallet.background.primary}
}));

export interface LoadingProps {
	containerStyles?: ViewStyle;
	fullScreen?: boolean;
}

const Loading = ({containerStyles, fullScreen}: LoadingProps) => {
	const styles = useStyles();
	return (
		<View style={[styles.container, fullScreen && styles.fullScreen, containerStyles]}>
			<ActivityIndicator color={useTheme().pallet.primary} />
		</View>
	);
};

export default Loading;
