import {themes} from 'config';
import ThemeProvider from 'hooks/useTheme';
import React from 'react';
import {useColorScheme} from 'react-native';
import {Provider} from 'react-redux';
import store from 'store';
import MainView from 'Views';

const App = () => {
	const colorTheme = useColorScheme();
	return (
		<Provider store={store}>
			<ThemeProvider themes={themes} defaultTheme={colorTheme || 'light'}>
				<MainView />
			</ThemeProvider>
		</Provider>
	);
};

export default App;
