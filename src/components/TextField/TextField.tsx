import React from 'react';
import {createStyleSheet} from 'hooks';
import {Input, InputProps} from 'react-native-elements';

export interface TextFieldProps extends InputProps {}

type InputStyles = Pick<
	TextFieldProps,
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

const TextField = ({...props}: TextFieldProps, ref: React.ForwardedRef<Input>) => {
	const styles = useStyles();
	return <Input {...styles} {...props} ref={ref} />;
};

export default React.forwardRef(TextField);
