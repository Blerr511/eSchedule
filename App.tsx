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

	if (!ready) return <Loading.FullScreen />;

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
