import React from 'react';
import {Input, InputProps} from 'react-native-elements';

export interface TextFieldProps extends InputProps {}

const TextField = ({...props}: TextFieldProps, ref: React.ForwardedRef<Input>) => {
	return <Input {...props} ref={ref} />;
};

export default React.forwardRef(TextField);
