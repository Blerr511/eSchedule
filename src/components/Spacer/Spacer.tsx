import {useTheme} from 'hooks';
import React, {useMemo} from 'react';
import {View, ViewStyle} from 'react-native';

export interface SpacerProps {
	x?: number | boolean;
	y?: number | boolean;
}

const Spacer = ({x = 1, y = 0}: SpacerProps) => {
	const theme = useTheme();

	const style: ViewStyle = useMemo(
		() => ({width: theme.spacing(Number(x)), height: theme.spacing(Number(y))}),
		[theme, x, y]
	);
	return <View style={style} />;
};

export default Spacer;
