import {themes} from 'config';
import ThemeProvider from 'hooks/useTheme';
import React from 'react';
import {useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import store from 'store';
import MainView from 'Views';

const App = () => {
	const colorTheme = useColorScheme();
	return (
		<SafeAreaProvider>
			<Provider store={store}>
				<ThemeProvider themes={themes} defaultTheme={'dark'}>
					<MainView />
				</ThemeProvider>
			</Provider>
		</SafeAreaProvider>
	);
};

export default App;
