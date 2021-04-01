import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {Provider, useDispatch} from 'react-redux';
import actions from 'store/actions';
import store from 'store';

const App = () => {
	const dispatch = useDispatch();
	const handlePress = () => {
		console.log('press');
		dispatch(actions.auth.signIn({email: 'test@test.test', password: 'testtest'}));
	};

	return (
		<TouchableOpacity
			activeOpacity={0.5}
			onPress={handlePress}
			style={{backgroundColor: 'red', padding: 50, zIndex: 22}}
			hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}>
			<Text>Click Me!</Text>
		</TouchableOpacity>
	);
};

const AppProvider = () => (
	<Provider store={store}>
		<App />
	</Provider>
);

export default AppProvider;
