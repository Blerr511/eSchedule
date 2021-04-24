import {ParamListBase} from '@react-navigation/routers';

export interface RootStackParamList extends ParamListBase {
	HomeScreen: undefined;
	SignScreen: undefined;
}

export interface SignScreenParamList extends ParamListBase {
	SignUp: undefined;
	SignIn: undefined;
}
