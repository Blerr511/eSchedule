import React from 'react';
import {createStyleSheet} from 'hooks';
import {Input, InputProps} from 'react-native-elements';

type InputStyles = Pick<
	InputProps,
	| 'style'
	| 'errorStyle'
	| 'inputStyle'
	| 'labelStyle'
	| 'containerStyle'
	| 'style'
	| 'disabledInputStyle'
	| 'inputContainerStyle'
	| 'leftIconContainerStyle'
	| 'rightIconContainerStyle'
>;

const useStyles = createStyleSheet<InputStyles>(theme => ({
	inputStyle: {
		color: theme.typography.color.primary
	},
	inputContainerStyle: {
		borderColor: theme.pallet.primary
	},
	labelStyle: {
		color: theme.pallet.primary
	}
}));

const TextField = (
	{inputStyle, inputContainerStyle, labelStyle, ...props}: InputProps,
	ref: React.ForwardedRef<Input>
) => {
	const styles = useStyles();
	return (
		<Input
			inputStyle={[styles.inputStyle, inputStyle]}
			inputContainerStyle={[styles.inputContainerStyle, inputContainerStyle]}
			labelStyle={[styles.labelStyle, labelStyle]}
			{...props}
			ref={ref}
		/>
	);
};

export default React.forwardRef(TextField);
