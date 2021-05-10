import Loading from 'components/Loading';
import {themes} from 'config';
import app from 'helpers/App';
import ThemeProvider from 'hooks/useTheme';
import React, {useEffect, useState} from 'react';
import {useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import store from 'store';
import MainView from 'Views';

const App = () => {
	const colorTheme = useColorScheme();
	const [ready, setReady] = useState(false);

	useEffect(() => {
		app.init().then(() => setReady(true));
	});

	return (
		<SafeAreaProvider>
			<Provider store={store}>
				<ThemeProvider themes={themes} defaultTheme={'dark'}>
					{ready ? <MainView /> : <Loading.FullScreen />}
				</ThemeProvider>
			</Provider>
		</SafeAreaProvider>
	);
};

export default App;
